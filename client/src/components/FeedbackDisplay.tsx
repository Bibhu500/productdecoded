import React from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  MessageCircle,
  ThumbsUp,
  User,
  Calendar,
  
  TrendingUp,
  Award
} from 'lucide-react';

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  scenarioId: string;
  scenarioTitle: string;
  userLevel: number;
}

interface FeedbackDisplayProps {
  feedbacks: Feedback[];
  onHelpfulClick?: (feedbackId: string) => void;
  showScenarioTitle?: boolean;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  feedbacks,
  onHelpfulClick,
  showScenarioTitle = false
}) => {
  const averageRating = feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length;
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const count = feedbacks.filter(f => f.rating === i + 1).length;
    return {
      stars: i + 1,
      count,
      percentage: (count / feedbacks.length) * 100
    };
  }).reverse();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Summary Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Rating Overview */}
        <div>
          <h2 className="text-xl font-semibold mb-4">User Feedback</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {feedbacks.length} reviews
              </div>
            </div>
            <div className="flex-1">
              {ratingDistribution.map((dist) => (
                <div key={dist.stars} className="flex items-center gap-2 mb-1">
                  <div className="text-sm text-gray-600 w-12">{dist.stars} stars</div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-yellow-400 rounded-full"
                      style={{ width: `${dist.percentage}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 w-12">{dist.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={<MessageCircle className="w-5 h-5 text-blue-600" />}
            label="Total Reviews"
            value={feedbacks.length.toString()}
          />
          <StatCard
            icon={<Star className="w-5 h-5 text-yellow-600" />}
            label="5-Star Reviews"
            value={`${((ratingDistribution[0].count / feedbacks.length) * 100).toFixed(0)}%`}
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5 text-green-600" />}
            label="Completion Rate"
            value="92%"
          />
          <StatCard
            icon={<Award className="w-5 h-5 text-purple-600" />}
            label="Avg. User Level"
            value={Math.round(
              feedbacks.reduce((acc, curr) => acc + curr.userLevel, 0) / feedbacks.length
            ).toString()}
          />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Recent Reviews</h3>
        {feedbacks.map((feedback) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {feedback.userAvatar ? (
                  <img
                    src={feedback.userAvatar}
                    alt={feedback.userName}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{feedback.userName}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{feedback.userRole}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Level {feedback.userLevel}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < feedback.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {feedback.date}
                    </div>
                  </div>
                </div>
                
                {showScenarioTitle && (
                  <div className="mt-2 text-sm text-gray-600">
                    <strong>Scenario:</strong> {feedback.scenarioTitle}
                  </div>
                )}

                <p className="mt-2 text-gray-700">{feedback.comment}</p>

                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={() => onHelpfulClick?.(feedback.id)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({feedback.helpful})</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
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

export default FeedbackDisplay; 