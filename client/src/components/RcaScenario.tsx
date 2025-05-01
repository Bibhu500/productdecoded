import React from 'react';
import { TrendingUp, HelpCircle, Clock, Star, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export interface RcaScenarioData {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  scenario: string;
  industry: string;
  skills: string[];
  estimatedTime?: string;
  points?: number;
}

export interface ScenarioProgress {
  id: string;
  bestScore: number;
  attempts: number;
  lastAttempt: string;
  timeSpent: number;
}

export const rcaScenarios: RcaScenarioData[] = [
  {
    id: 'product-adoption-decline',
    title: 'Product Adoption Decline',
    description: 'Investigate why a previously successful product is seeing declining user adoption',
    difficulty: 'Beginner',
    industry: 'SaaS',
    skills: ['Data Analysis', 'User Research', 'Market Understanding'],
    scenario: `Your company's flagship SaaS product has seen a 30% decline in new user signups over the past quarter despite no significant changes to the product's functionality or marketing spend. The decline appears to be accelerating, with last month showing the steepest drop yet. Customer satisfaction scores among existing users remain stable, but trial-to-paid conversion rates have fallen from 25% to 18%. Your task is to determine the root cause of this adoption decline and recommend corrective actions.`,
    estimatedTime: '2 hours',
    points: 100
  },
  {
    id: 'feature-launch-failure',
    title: 'Feature Launch Failure',
    description: 'Analyze why a heavily requested feature is seeing low usage after launch',
    difficulty: 'Intermediate',
    industry: 'FinTech',
    skills: ['Product Analytics', 'UX Design', 'User Interviews'],
    scenario: `Your FinTech company recently launched a new budgeting feature that was highly requested by users in multiple surveys and user interviews. The development team spent three months building it, and the feature was prominently announced in the app, through email, and in social media. However, after six weeks, only 5% of users have tried the feature, and less than 1% are using it regularly. This is far below the expected 20% adoption rate. Your team needs to understand why this heavily requested feature is failing to gain traction.`,
    estimatedTime: '3 hours',
    points: 150
  },
  {
    id: 'cross-platform-inconsistency',
    title: 'Cross-Platform User Experience Issue',
    description: 'Resolve inconsistent performance across different platforms',
    difficulty: 'Advanced',
    industry: 'E-commerce',
    skills: ['Technical Analysis', 'Cross-functional Collaboration', 'Performance Optimization'],
    scenario: `Your e-commerce platform operates across web, iOS, and Android. Data shows that conversion rates on iOS are 25% higher than on Android, and 15% higher than on web. Support tickets from Android users have increased by 40% in the last two months, with complaints about slow performance, crashes during checkout, and payment failures. Your analytics show that 60% of users who experience these issues abandon their carts and don't return within 30 days. As the product manager, you need to identify the root causes of these platform-specific issues and develop a plan to resolve them.`,
    estimatedTime: '4 hours',
    points: 200
  }
];

interface RcaScenarioProps {
  scenario: RcaScenarioData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  progress?: ScenarioProgress;
}

const RcaScenario: React.FC<RcaScenarioProps> = ({ scenario, isSelected, onSelect, progress }) => {
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  };

  const formatTimeSpent = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`cursor-pointer rounded-xl shadow-md overflow-hidden transition-all ${
        isSelected
          ? 'border-2 border-blue-500 bg-blue-50'
          : 'border border-gray-200 bg-white hover:border-blue-300'
      }`}
      onClick={() => onSelect(scenario.id)}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg">{scenario.title}</h3>
            <p className="text-gray-600 text-sm">{scenario.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor[scenario.difficulty]}`}>
              {scenario.difficulty}
            </span>
            {scenario.points && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" />
                {scenario.points} XP
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>{scenario.industry}</span>
          {scenario.estimatedTime && (
            <>
              <span className="mx-2">•</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{scenario.estimatedTime}</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {scenario.skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {progress && (
          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <div>
                  <div className="text-sm font-medium">{progress.bestScore}%</div>
                  <div className="text-xs text-gray-500">Best Score</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-purple-600" />
                <div>
                  <div className="text-sm font-medium">{progress.attempts}</div>
                  <div className="text-xs text-gray-500">Attempts</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Time spent: {formatTimeSpent(progress.timeSpent)}</span>
            </div>
          </div>
        )}

        {isSelected && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-start mb-2">
              <HelpCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Select this scenario to start a guided RCA practice session with a product management expert.
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RcaScenario; 