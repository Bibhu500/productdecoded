import React from 'react';
import { motion } from 'framer-motion';
import {

  TrendingUp,
  Clock,
 
  Target,

  Award,
  Star,
  CheckCircle,
  AlertTriangle,
  Zap,
  BookOpen
} from 'lucide-react';

export interface AnalyticsData {
  userId: string;
  timeSpent: {
    total: number;
    byModule: { [key: string]: number };
    byWeek: { week: string; minutes: number }[];
  };
  progress: {
    completedModules: number;
    totalModules: number;
    completedScenarios: number;
    totalScenarios: number;
  };
  performance: {
    averageScore: number;
    scoresByModule: { [key: string]: number };
    recentScores: { date: string; score: number; moduleId: string }[];
  };
  streak: {
    current: number;
    longest: number;
    lastActive: string;
  };
  insights: {
    strengths: string[];
    areasToImprove: string[];
    recommendations: string[];
  };
  level: {
    current: number;
    totalXP: number;
    nextLevelXP: number;
  };
}

interface LearningAnalyticsProps {
  data: AnalyticsData;
}

const LearningAnalytics: React.FC<LearningAnalyticsProps> = ({ data }) => {
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const calculateProgress = (completed: number, total: number): number => {
    return Math.round((completed / total) * 100);
  };

  const levelProgress = (data.level.totalXP % 100) / 100;

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Level Progress</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Level {data.level.current}</h3>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${levelProgress * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {data.level.nextLevelXP - data.level.totalXP} XP to next level
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">Completion</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {calculateProgress(data.progress.completedModules, data.progress.totalModules)}%
          </h3>
          <p className="text-gray-600">Course Progress</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-500">Performance</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{data.performance.averageScore}%</h3>
          <p className="text-gray-600">Average Score</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Current Streak</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{data.streak.current} days</h3>
          <p className="text-gray-600">Best: {data.streak.longest} days</p>
        </motion.div>
      </div>

      {/* Time Spent Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Learning Time
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Total Time Spent</span>
                <span>{formatTime(data.timeSpent.total)}</span>
              </div>
              <div className="h-32">
                {/* Weekly time chart would go here */}
                <div className="flex items-end h-full gap-2">
                  {data.timeSpent.byWeek.map(week => (
                    <div
                      key={week.week}
                      className="flex-1 bg-blue-100 rounded-t"
                      style={{
                        height: `${(week.minutes / Math.max(...data.timeSpent.byWeek.map(w => w.minutes))) * 100}%`
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                {data.timeSpent.byWeek.map(week => (
                  <span key={week.week}>{week.week}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Performance Trends
          </h3>
          <div className="space-y-4">
            {Object.entries(data.performance.scoresByModule).map(([module, score]) => (
              <div key={module}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{module}</span>
                  <span className="font-medium">{score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Strengths & Areas to Improve</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-green-600 flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4" />
                Your Strengths
              </h4>
              <ul className="space-y-2">
                {data.insights.strengths.map(strength => (
                  <li key={strength} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-yellow-600 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" />
                Areas to Focus On
              </h4>
              <ul className="space-y-2">
                {data.insights.areasToImprove.map(area => (
                  <li key={area} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recommended Next Steps</h3>
          <div className="space-y-4">
            {data.insights.recommendations.map(recommendation => (
              <div
                key={recommendation}
                className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
              >
                <div className="bg-blue-100 p-1.5 rounded-full">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-sm text-blue-900">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningAnalytics; 