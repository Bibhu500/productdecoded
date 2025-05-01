import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ChevronRight,
  ClipboardList,
  Target,
  Users,
  Brain,
  Trophy,
  Star,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  BarChart,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  unlocked: boolean;
}

interface ProgressStats {
  scenariosCompleted: number;
  totalScenarios: number;
  averageScore: number;
  streak: number;
  timeSpent: string;
  skillLevel: string;
}

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'achievements' | 'progress'>('overview');

  // Mock data - In a real app, this would come from your backend
  const progressStats: ProgressStats = {
    scenariosCompleted: 12,
    totalScenarios: 50,
    averageScore: 85,
    streak: 5,
    timeSpent: "15h 30m",
    skillLevel: "Intermediate"
  };

  const achievements: Achievement[] = [
    {
      id: "first-analysis",
      title: "First Analysis",
      description: "Complete your first RCA scenario",
      icon: <Target className="w-6 h-6 text-blue-500" />,
      progress: 100,
      unlocked: true
    },
    {
      id: "quick-learner",
      title: "Quick Learner",
      description: "Complete 5 scenarios in one day",
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      progress: 60,
      unlocked: false
    },
    {
      id: "expert-analyst",
      title: "Expert Analyst",
      description: "Achieve 90%+ score in 10 scenarios",
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      progress: 30,
      unlocked: false
    }
  ];

  const recentActivity = [
    {
      type: "completion",
      title: "Completed: Product Adoption Decline",
      score: 92,
      date: "2 hours ago"
    },
    {
      type: "achievement",
      title: "Unlocked: First Analysis",
      date: "1 day ago"
    },
    {
      type: "streak",
      title: "5 Day Streak!",
      date: "Today"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="ml-3 text-xl font-semibold text-gray-800">RCA Matters</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="ml-2 text-gray-700">{user?.fullName || 'User'}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {progressStats.skillLevel}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-lg font-bold text-blue-600">{progressStats.streak} days</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Scenarios</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{progressStats.scenariosCompleted}/{progressStats.totalScenarios}</h3>
            <p className="text-gray-600">Completed</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <BarChart className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Average Score</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{progressStats.averageScore}%</h3>
            <p className="text-gray-600">Performance</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Time Spent</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{progressStats.timeSpent}</h3>
            <p className="text-gray-600">Learning</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-2 rounded-full">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-500">Achievements</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{achievements.filter(a => a.unlocked).length}/{achievements.length}</h3>
            <p className="text-gray-600">Unlocked</p>
          </motion.div>
        </div>

        {/* Main Sections */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Learn Section */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-semibold ml-3">Continue Learning</h2>
            </div>
            <div className="space-y-4">
              <LearningModule
                icon={<Target />}
                title="RCA Fundamentals"
                description="Core concepts and methodologies"
                progress={75}
              />
              <LearningModule
                icon={<Brain />}
                title="Advanced Techniques"
                description="Tools and frameworks for analysis"
                progress={30}
              />
              <LearningModule
                icon={<Users />}
                title="Collaborative Analysis"
                description="Team-based problem solving"
                progress={0}
              />
            </div>
            <button 
              onClick={() => navigate('/learn')}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Continue Learning <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>

          {/* Practice Section */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <ClipboardList className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl font-semibold ml-3">Practice RCA</h2>
            </div>
            <div className="space-y-4">
              <PracticeModule
                icon={<Target />}
                title="Product Metrics Analysis"
                description="New scenario available"
                difficulty="Intermediate"
                isNew={true}
              />
              <PracticeModule
                icon={<Users />}
                title="Feature Adoption Case"
                description="Complete analysis required"
                difficulty="Advanced"
                isNew={false}
              />
              <PracticeModule
                icon={<Brain />}
                title="User Retention Challenge"
                description="Unlock at level 5"
                difficulty="Expert"
                isLocked={true}
              />
            </div>
            <button 
              onClick={() => navigate('/practice')}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              Start Practicing <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <h2 className="text-2xl font-semibold ml-3">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start p-3 border border-gray-100 rounded-lg">
                  {activity.type === 'completion' && (
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                  {activity.type === 'achievement' && (
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                    </div>
                  )}
                  {activity.type === 'streak' && (
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Star className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <div className="flex items-center mt-1">
                      {activity.score && (
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full mr-2">
                          Score: {activity.score}%
                        </span>
                      )}
                      <span className="text-sm text-gray-500">{activity.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const LearningModule: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  progress: number;
}> = ({ icon, title, description, progress }) => (
  <div className="p-4 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
    <div className="flex items-start">
      <div className="text-blue-600">{icon}</div>
      <div className="ml-4 flex-1">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  </div>
);

const PracticeModule: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  difficulty: string;
  isNew?: boolean;
  isLocked?: boolean;
}> = ({ icon, title, description, difficulty, isNew, isLocked }) => (
  <div className={`p-4 border border-gray-100 rounded-lg transition-colors cursor-pointer ${
    isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-50'
  }`}>
    <div className="flex items-start">
      <div className="text-green-600">{icon}</div>
      <div className="ml-4 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          {isNew && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex items-center mt-2">
          <span className="text-xs text-gray-500">Difficulty: {difficulty}</span>
          {isLocked && (
            <span className="ml-2 text-xs text-gray-500 flex items-center">
              <Lock className="w-3 h-3 mr-1" /> Locked
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard; 