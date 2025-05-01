import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Target,
  Clock,
  BarChart,
  Award,
  Star,
  Brain,
  Users,
  Lock,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { progressService } from '../services/ProgressService';
import RcaScenario from '../components/RcaScenario';

interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  timeLimit: number;
  points: number;
  requiredLevel?: number;
  icon: any;
}

const scenarios: Scenario[] = [
  {
    id: 'user-retention',
    title: 'User Retention Drop',
    description: 'Investigate why user retention has dropped by 25% in the last quarter',
    difficulty: 'Beginner',
    timeLimit: 15,
    points: 100,
    icon: Users
  },
  {
    id: 'feature-adoption',
    title: 'Feature Adoption Challenge',
    description: 'Analyze why the new feature has low adoption rates despite positive beta feedback',
    difficulty: 'Intermediate',
    timeLimit: 20,
    points: 150,
    icon: Target
  },
  {
    id: 'performance-issue',
    title: 'Performance Degradation',
    description: 'Identify the root cause of sudden performance degradation in the payment system',
    difficulty: 'Advanced',
    timeLimit: 25,
    points: 200,
    requiredLevel: 3,
    icon: TrendingUp
  },
  {
    id: 'system-outage',
    title: 'Critical System Outage',
    description: 'Investigate a production system outage affecting multiple services',
    difficulty: 'Expert',
    timeLimit: 30,
    points: 300,
    requiredLevel: 5,
    icon: AlertTriangle
  }
];

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [stats, setStats] = useState(progressService.getStats());

  useEffect(() => {
    setStats(progressService.getStats());
  }, []);

  const handleScenarioComplete = (scenarioId: string, score: number, timeSpent: number) => {
    progressService.updateScenarioProgress(scenarioId, score, timeSpent);
    setStats(progressService.getStats());
    setSelectedScenario(null);
  };

  const getScenarioProgress = (scenarioId: string) => {
    return progressService.getScenarioProgress(scenarioId);
  };

  const isScenarioLocked = (scenario: Scenario): boolean => {
    return (scenario.requiredLevel || 0) > stats.level;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
                <Star className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-600">{stats.totalPoints} XP</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-600">Level {stats.level}</span>
              </div>
              <div className="flex items-center">
                <Target className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-xl font-semibold">Practice Arena</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {selectedScenario ? (
          <RcaScenario
            scenario={scenarios.find(s => s.id === selectedScenario)!}
            onComplete={handleScenarioComplete}
            onBack={() => setSelectedScenario(null)}
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {scenarios.map(scenario => {
              const isLocked = isScenarioLocked(scenario);
              const progress = getScenarioProgress(scenario.id);
              const Icon = scenario.icon;

              return (
                <motion.div
                  key={scenario.id}
                  whileHover={{ y: -5 }}
                  className={`bg-white rounded-xl shadow-lg p-6 ${
                    isLocked ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${
                        scenario.difficulty === 'Beginner' ? 'bg-green-100' :
                        scenario.difficulty === 'Intermediate' ? 'bg-yellow-100' :
                        scenario.difficulty === 'Advanced' ? 'bg-orange-100' :
                        'bg-red-100'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          scenario.difficulty === 'Beginner' ? 'text-green-600' :
                          scenario.difficulty === 'Intermediate' ? 'text-yellow-600' :
                          scenario.difficulty === 'Advanced' ? 'text-orange-600' :
                          'text-red-600'
                        }`} />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{scenario.title}</h3>
                          {isLocked && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Lock className="h-4 w-4 mr-1" />
                              Level {scenario.requiredLevel}
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600">{scenario.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{scenario.timeLimit} mins</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{scenario.points} XP</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{scenario.difficulty}</span>
                    </div>
                  </div>

                  {progress && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Best Score</span>
                        <span className="font-medium text-green-600">{progress.bestScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${progress.bestScore}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>Attempts: {progress.attempts}</span>
                        <span>Time Spent: {Math.round(progress.timeSpent)} mins</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => !isLocked && setSelectedScenario(scenario.id)}
                    disabled={isLocked}
                    className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                      isLocked
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : progress?.completed
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {progress?.completed ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        Practice Again
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5" />
                        Start Analysis
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice; 