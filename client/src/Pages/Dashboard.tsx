import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Brain, 
  ClipboardList, 
  LogOut, 
  Target, 
  User, 
  FileText,
  PenTool,
  Lightbulb,
  Users,
  ChevronRight
} from 'lucide-react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
  };

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
                <User className="h-5 w-5 text-gray-600" />
                <span className="ml-2 text-gray-700">{user?.fullName || 'User'}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-2">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome to RCA Learning Hub</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Learn Section */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-semibold ml-3">Learn About RCA</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Master the fundamentals and advanced concepts of Root Cause Analysis through our comprehensive learning modules.
            </p>
            <div className="space-y-4">
              <LearningModule
                icon={<FileText />}
                title="RCA Fundamentals"
                description="Core concepts and methodologies"
              />
              <LearningModule
                icon={<PenTool />}
                title="Analysis Techniques"
                description="Tools and frameworks for effective analysis"
              />
              <LearningModule
                icon={<Lightbulb />}
                title="Problem-Solving Strategies"
                description="Strategic approaches to root cause identification"
              />
            </div>
            <button 
              onClick={() => navigate('/learn')}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Start Learning <ChevronRight className="ml-2 h-5 w-5" />
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
            <p className="text-gray-600 mb-6">
              Apply your knowledge through real-world scenarios and interactive case studies.
            </p>
            <div className="space-y-4">
              <PracticeModule
                icon={<Target />}
                title="Case Studies"
                description="Real-world problem-solving scenarios"
                difficulty="Beginner to Advanced"
              />
              <PracticeModule
                icon={<Users />}
                title="Collaborative Analysis"
                description="Work with peers on complex cases"
                difficulty="Intermediate"
              />
              <PracticeModule
                icon={<Brain />}
                title="Assessment Challenges"
                description="Test your RCA skills"
                difficulty="Advanced"
              />
            </div>
            <button 
              onClick={() => navigate('/practice')}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              Start Practicing <ChevronRight className="ml-2 h-5 w-5" />
            </button>
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
}> = ({ icon, title, description }) => (
  <div className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
    <div className="text-blue-600">{icon}</div>
    <div className="ml-4">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const PracticeModule: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  difficulty: string;
}> = ({ icon, title, description, difficulty }) => (
  <div className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
    <div className="text-green-600">{icon}</div>
    <div className="ml-4">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <span className="text-xs text-gray-500">Difficulty: {difficulty}</span>
    </div>
  </div>
);

export default Dashboard; 