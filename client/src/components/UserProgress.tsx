import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Star,
  Target,
  Brain,
  Clock,
  Award,
  TrendingUp,
  CheckCircle,
  Medal,
  Zap
} from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  unlocked: boolean;
  unlockedAt?: string;
  points: number;
}

export interface UserStats {
  totalPoints: number;
  level: number;
  scenariosCompleted: number;
  averageScore: number;
  timeSpent: string;
  currentStreak: number;
  achievements: Achievement[];
}

interface UserProgressProps {
  stats: UserStats;
}

const UserProgress: React.FC<UserProgressProps> = ({ stats }) => {
  const levelProgress = (stats.totalPoints % 100) / 100;
  const nextLevelPoints = Math.ceil(stats.totalPoints / 100) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Level and Points */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award className="h-6 w-6 text-blue-600" />
              Level {stats.level}
            </h2>
            <p className="text-gray-600">Product Manager in Training</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{stats.totalPoints}</div>
            <div className="text-sm text-gray-600">Total XP</div>
          </div>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Level {stats.level}</span>
            <span>{nextLevelPoints - stats.totalPoints} XP to Level {stats.level + 1}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Target className="h-5 w-5 text-blue-600" />}
          label="Scenarios"
          value={stats.scenariosCompleted.toString()}
        />
        <StatCard
          icon={<Star className="h-5 w-5 text-yellow-600" />}
          label="Avg. Score"
          value={`${stats.averageScore}%`}
        />
        <StatCard
          icon={<Clock className="h-5 w-5 text-purple-600" />}
          label="Time Spent"
          value={stats.timeSpent}
        />
        <StatCard
          icon={<Zap className="h-5 w-5 text-green-600" />}
          label="Streak"
          value={`${stats.currentStreak} days`}
        />
      </div>

      {/* Recent Achievements */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        <div className="grid gap-4">
          {stats.achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`p-4 rounded-lg border ${
                achievement.unlocked
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${
                  achievement.unlocked
                    ? 'bg-green-100'
                    : 'bg-gray-200'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <div className="flex items-center gap-1 text-sm">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span>{achievement.points} XP</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                  {!achievement.unlocked && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {achievement.progress}% Complete
                      </div>
                    </div>
                  )}
                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Unlocked {achievement.unlockedAt}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <div className="text-xl font-semibold">{value}</div>
  </div>
);

export default UserProgress; 