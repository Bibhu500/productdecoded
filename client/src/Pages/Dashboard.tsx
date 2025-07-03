import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Target,
  BarChart3,
  Package,
  Award,
  Clock,
  Flame,
  PlayCircle,
  BookMarked,
  Activity,
  Trophy,
  ArrowUpRight,
  Brain,
  Lightbulb,
  Calculator
} from 'lucide-react';

import LogoutButton from '../components/LogoutButton';


interface DashboardStats {
  currentStreak: number;
  totalLessonsCompleted: number;
  totalScenariosCompleted: number;
  averageScore: number;
  level: number;
  timeSpent: string;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    unlocked: boolean;
    dateUnlocked?: Date;
  }>;
}

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    currentStreak: 0,
    totalLessonsCompleted: 0,
    totalScenariosCompleted: 0,
    averageScore: 0,
    level: 1,
    timeSpent: '0h',
    achievements: []
  });

  useEffect(() => {
    // Simulate loading user stats
    const mockStats: DashboardStats = {
      currentStreak: 7,
      totalLessonsCompleted: 12,
      totalScenariosCompleted: 8,
      averageScore: 87,
      level: 3,
      timeSpent: '24h',
      achievements: [
        { id: '1', title: 'First Steps', description: 'Complete your first lesson', unlocked: true },
        { id: '2', title: 'Problem Solver', description: 'Complete 5 RCA scenarios', unlocked: true },
        { id: '3', title: 'Streak Master', description: 'Maintain 7-day streak', unlocked: true },
        { id: '4', title: 'Analytics Pro', description: 'Master product metrics', unlocked: false }
      ]
    };
    setStats(mockStats);
  }, []);

  const skillModules = [
    {
      id: 'rca',
      title: 'Root Cause Analysis',
      description: 'Master systematic problem-solving',
      icon: <Brain className="w-6 h-6" />,
      progress: 75,
      color: 'from-blue-500 to-blue-600',
      lessons: 8,
      completedLessons: 6
    },
    {
      id: 'product-sense',
      title: 'Product Sense',
      description: 'Develop product intuition',
      icon: <Lightbulb className="w-6 h-6" />,
      progress: 45,
      color: 'from-purple-500 to-purple-600',
      lessons: 6,
      completedLessons: 3
    },
    {
      id: 'metrics',
      title: 'Product Metrics',
      description: 'Data-driven decision making',
      icon: <BarChart3 className="w-6 h-6" />,
      progress: 30,
      color: 'from-green-500 to-green-600',
      lessons: 10,
      completedLessons: 3
    },
    {
      id: 'guesstimation',
      title: 'Guesstimations',
      description: 'Market sizing & estimation',
      icon: <Calculator className="w-6 h-6" />,
      progress: 20,
      color: 'from-orange-500 to-orange-600',
      lessons: 5,
      completedLessons: 1
    }
  ];

  const practiceScenarios = [
    {
      id: 'user-retention',
      title: 'User Retention Drop',
      description: 'Netflix sees 15% decline in monthly active users',
      difficulty: 'Intermediate',
      estimatedTime: '45 min',
      type: 'RCA',
      isNew: true
    },
    {
      id: 'feature-adoption',
      title: 'Low Feature Adoption',
      description: 'Instagram Stories adoption below expectations',
      difficulty: 'Advanced',
      estimatedTime: '60 min',
      type: 'Product Sense',
      isNew: false
    },
    {
      id: 'metrics-analysis',
      title: 'Conversion Rate Analysis',
      description: 'E-commerce checkout conversion dropped 8%',
      difficulty: 'Expert',
      estimatedTime: '75 min',
      type: 'Metrics',
      isNew: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <Package className="h-8 w-8 text-blue-600" />
              <span className="ml-3 text-xl font-semibold text-gray-800">ProductDecoded</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-medium">{stats.currentStreak} day streak</span>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.firstName || 'Product Manager'}!
            </h1>
            <p className="text-gray-600">
              Continue your journey to becoming a world-class product manager
            </p>
          </motion.div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <Flame className="w-8 h-8" />
                <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                  Current
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.currentStreak}</h3>
              <p className="text-orange-100">Day Streak</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Completed</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalLessonsCompleted}</h3>
            <p className="text-gray-600">Lessons</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Practiced</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalScenariosCompleted}</h3>
            <p className="text-gray-600">Scenarios</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Average</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.averageScore}%</h3>
            <p className="text-gray-600">Score</p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <BookMarked className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Learning</h2>
                </div>
                <button
                  onClick={() => navigate('/learn')}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {skillModules.map((module) => (
                  <div key={module.id} className="group cursor-pointer">
                    <div className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${module.color} text-white`}>
                          {module.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 mb-1">{module.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <span>{module.completedLessons}/{module.lessons} completed</span>
                            <span>{module.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${module.color} transition-all duration-500`}
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/learn')}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Continue Learning</span>
              </button>
            </div>
          </motion.div>

          {/* Practice Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <PlayCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Practice</h2>
                </div>
                <button
                  onClick={() => navigate('/practice')}
                  className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {practiceScenarios.map((scenario) => (
                  <div key={scenario.id} className="group cursor-pointer">
                    <div className="border border-gray-100 rounded-xl p-4 hover:border-green-200 hover:bg-green-50/50 transition-all duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-gray-900">{scenario.title}</h3>
                            {scenario.isNew && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{scenario.estimatedTime}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Target className="w-3 h-3" />
                              <span>{scenario.type}</span>
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            scenario.difficulty === 'Expert' ? 'bg-red-100 text-red-800' :
                            scenario.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {scenario.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/practice')}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Start Practicing</span>
              </button>
            </div>
          </motion.div>

          {/* Analytics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
                </div>
              </div>

              {/* Progress Chart */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Weekly Progress</h3>
                <div className="flex items-end space-x-2 h-24">
                  {[40, 65, 45, 80, 60, 90, 75].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-gray-500 mt-1">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Achievements</h3>
                <div className="space-y-2">
                  {stats.achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">Level {stats.level}</div>
                  <div className="text-xs text-gray-600">Current Level</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{stats.timeSpent}</div>
                  <div className="text-xs text-gray-600">Time Spent</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Continue Where You Left Off */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Continue Where You Left Off</h2>
                <p className="text-blue-100 mb-4">
                  Product Sense Fundamentals - Lesson 4: User Empathy
                </p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <PlayCircle className="w-4 h-4" />
                  <span>Resume Learning</span>
                </button>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/10 p-4 rounded-xl">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;