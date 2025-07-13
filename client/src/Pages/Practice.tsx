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
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Calculator,
  ArrowRight,
  Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { progressService } from '../services/ProgressService';
import { rcaQuestions } from '../data/rcaQuestions';
import RcaChatInterface from '../components/RcaChatInterface';

interface CaseStudyType {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionsCount: number;
  comingSoon?: boolean;
}

const caseStudyTypes: CaseStudyType[] = [
  {
    id: 'rca',
    title: 'Root Cause Analysis',
    description: 'Identify and analyze the root causes of product issues using systematic approaches',
    icon: AlertTriangle,
    color: 'blue',
    difficulty: 'Intermediate',
    questionsCount: 8
  },
  {
    id: 'product-sense',
    title: 'Product Sense',
    description: 'Develop intuition for product decisions and user behavior analysis',
    icon: Brain,
    color: 'purple',
    difficulty: 'Intermediate',
    questionsCount: 12,
    comingSoon: true
  },
  {
    id: 'product-metrics',
    title: 'Product Metrics',
    description: 'Learn to define, measure, and interpret key product metrics',
    icon: BarChart,
    color: 'green',
    difficulty: 'Beginner',
    questionsCount: 10,
    comingSoon: true
  },
  {
    id: 'market-sizing',
    title: 'Market Sizing',
    description: 'Estimate market opportunities and validate product potential',
    icon: Calculator,
    color: 'orange',
    difficulty: 'Advanced',
    questionsCount: 6,
    comingSoon: true
  },
  {
    id: 'growth-strategy',
    title: 'Growth Strategy',
    description: 'Design and execute strategies to drive product growth',
    icon: TrendingUp,
    color: 'pink',
    difficulty: 'Advanced',
    questionsCount: 8,
    comingSoon: true
  },
  {
    id: 'competitive-analysis',
    title: 'Competitive Analysis',
    description: 'Analyze competitors and position your product effectively',
    icon: Target,
    color: 'indigo',
    difficulty: 'Intermediate',
    questionsCount: 7,
    comingSoon: true
  }
];

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRCAQuestion, setSelectedRCAQuestion] = useState<string | null>(null);
  const [stats, setStats] = useState(progressService.getStats());

  useEffect(() => {
    setStats(progressService.getStats());
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'purple': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'green': return 'bg-green-100 text-green-600 border-green-200';
      case 'orange': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'pink': return 'bg-pink-100 text-pink-600 border-pink-200';
      case 'indigo': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const handleRCAQuestionStart = (questionId: string) => {
    setSelectedRCAQuestion(questionId);
  };

  const getQuestionProgress = (questionId: string) => {
    return progressService.getScenarioProgress(questionId);
  };

  const getRCATypeProgress = () => {
    const completedCount = rcaQuestions.filter(q => {
      const progress = getQuestionProgress(q.id);
      return progress?.completed;
    }).length;
    
    return {
      completed: completedCount,
      total: rcaQuestions.length,
      percentage: Math.round((completedCount / rcaQuestions.length) * 100)
    };
  };

  const renderRCAQuestions = () => {
    const progress = getRCATypeProgress();
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Root Cause Analysis Questions</h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="text-sm text-gray-600">
                Progress: {progress.completed}/{progress.total} completed ({progress.percentage}%)
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedType(null)}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Case Studies
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {rcaQuestions.map((question) => {
            const questionProgress = getQuestionProgress(question.id);
            const isCompleted = questionProgress?.completed || false;
            
            return (
              <motion.div
                key={question.id}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-200 ${
                  isCompleted 
                    ? 'border-green-200 bg-gradient-to-br from-green-50 to-blue-50' 
                    : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    isCompleted ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {isCompleted ? (
                      <Trophy className="h-6 w-6 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{question.title}</h3>
                      {isCompleted && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {question.problem_statement}
                    </p>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        Intermediate
                      </span>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>15-20 min</span>
                      </div>
                      {isCompleted && questionProgress && (
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <Star className="h-4 w-4" />
                          <span>{questionProgress.bestScore}% score</span>
                        </div>
                      )}
                    </div>
                    
                    {isCompleted && questionProgress ? (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Best Score: {questionProgress.bestScore}%</span>
                          <span>Attempts: {questionProgress.attempts}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${questionProgress.bestScore}%` }}
                          />
                        </div>
                      </div>
                    ) : null}
                    
                    <button
                      onClick={() => handleRCAQuestionStart(question.id)}
                      className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        isCompleted
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <Trophy className="h-4 w-4" />
                          Practice Again
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4" />
                          Start Analysis
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCaseStudyTypes = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Practice Case Studies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from different types of product management case studies to sharpen your skills.
            Each category focuses on specific PM competencies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudyTypes.map((type) => {
            const IconComponent = type.icon;
            const colorClasses = getColorClasses(type.color);
            
            // Calculate progress for RCA type
            let completedCount = 0;
            let progressPercentage = 0;
            
            if (type.id === 'rca') {
              const rcaProgress = getRCATypeProgress();
              completedCount = rcaProgress.completed;
              progressPercentage = rcaProgress.percentage;
            }
            
            return (
              <motion.div
                key={type.id}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-xl shadow-lg p-6 border-2 ${type.comingSoon ? 'opacity-70' : ''}`}
              >
                <div className={`w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center mb-4`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(type.difficulty)}`}>
                    {type.difficulty}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {type.questionsCount} questions
                  </span>
                </div>
                
                {/* Progress for RCA */}
                {type.id === 'rca' && completedCount > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{completedCount}/{type.questionsCount} completed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {type.comingSoon ? (
                  <div className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-lg text-center font-medium">
                    Coming Soon
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedType(type.id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Start Practice</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
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
        {selectedRCAQuestion ? (
          <RcaChatInterface
            rcaTest={rcaQuestions.find(q => q.id === selectedRCAQuestion)!}
            onComplete={(score, timeSpent) => {
              progressService.updateScenarioProgress(selectedRCAQuestion, score, timeSpent);
              setStats(progressService.getStats());
              setSelectedRCAQuestion(null);
            }}
            onBack={() => setSelectedRCAQuestion(null)}
          />
        ) : selectedType === 'rca' ? (
          renderRCAQuestions()
        ) : (
          renderCaseStudyTypes()
        )}
      </div>
    </div>
  );
};

export default Practice; 