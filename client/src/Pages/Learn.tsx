import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  Brain,
  Target,
  ArrowLeft,
  CheckCircle,
  PlayCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Learn: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]);

  const toggleLesson = (moduleId: string) => {
    if (expandedLessons.includes(moduleId)) {
      setExpandedLessons(expandedLessons.filter(id => id !== moduleId));
    } else {
      setExpandedLessons([...expandedLessons, moduleId]);
    }
  };

  const modules = [
    {
      id: 'fundamentals',
      title: 'RCA Fundamentals',
      description: 'Master the core concepts and principles of Root Cause Analysis',
      icon: <Brain className="w-6 h-6" />,
      lessons: [
        {
          id: 'intro',
          title: 'Introduction to RCA',
          duration: '15 mins',
          content: 'Understanding what RCA is and why it matters'
        },
        {
          id: '5-whys',
          title: 'The 5 Whys Technique',
          duration: '20 mins',
          content: 'Learn the fundamental questioning method'
        },
        {
          id: 'fishbone',
          title: 'Fishbone Diagram',
          duration: '25 mins',
          content: 'Master cause and effect analysis'
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Techniques',
      description: 'Deep dive into sophisticated RCA methodologies',
      icon: <Target className="w-6 h-6" />,
      lessons: [
        {
          id: 'fta',
          title: 'Fault Tree Analysis',
          duration: '30 mins',
          content: 'Systematic approach to failure analysis'
        },
        {
          id: 'barriers',
          title: 'Barrier Analysis',
          duration: '25 mins',
          content: 'Understanding preventive and protective measures'
        },
        {
          id: 'pareto',
          title: 'Pareto Analysis in RCA',
          duration: '20 mins',
          content: 'Prioritizing root causes effectively'
        }
      ]
    }
  ];

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
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Learning Hub</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Modules List */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Learning Modules</h2>
              <div className="space-y-4">
                {modules.map(module => (
                  <motion.div
                    key={module.id}
                    className="border rounded-lg overflow-hidden"
                    initial={false}
                  >
                    <button
                      onClick={() => toggleLesson(module.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <div className="text-blue-600">{module.icon}</div>
                        <div className="ml-3 text-left">
                          <h3 className="font-semibold">{module.title}</h3>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transform transition-transform ${
                          expandedLessons.includes(module.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedLessons.includes(module.id) && (
                      <div className="border-t">
                        {module.lessons.map(lesson => (
                          <button
                            key={lesson.id}
                            onClick={() => setSelectedModule(`${module.id}-${lesson.id}`)}
                            className={`w-full flex items-center p-3 hover:bg-blue-50 ${
                              selectedModule === `${module.id}-${lesson.id}`
                                ? 'bg-blue-50'
                                : ''
                            }`}
                          >
                            <PlayCircle className="w-4 h-4 text-blue-600" />
                            <div className="ml-3 text-left">
                              <h4 className="text-sm font-medium">{lesson.title}</h4>
                              <p className="text-xs text-gray-500">{lesson.duration}</p>
                            </div>
                            {selectedModule === `${module.id}-${lesson.id}` && (
                              <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {selectedModule ? (
                <LessonContent moduleId={selectedModule} />
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600">
                    Select a lesson to start learning
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Choose from our comprehensive modules to begin your RCA journey
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LessonContent: React.FC<{ moduleId: string }> = ({ moduleId }) => {
  // In a real application, this would fetch content from a backend
  const lessonContents: { [key: string]: React.ReactNode } = {
    'fundamentals-intro': (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Introduction to Root Cause Analysis</h1>
        <div className="prose max-w-none">
          <p>
            Root Cause Analysis (RCA) is a systematic process for identifying the root causes of problems
            or events and developing approaches to respond to them. The primary aim of RCA is to identify
            the factors that resulted in the nature, magnitude, location, and timing of harmful outcomes.
          </p>
          <h2 className="text-xl font-semibold mt-6">Key Concepts</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Understanding the difference between symptoms and root causes</li>
            <li>Identifying contributing factors vs. root causes</li>
            <li>The importance of evidence-based analysis</li>
            <li>Systems thinking in RCA</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">When to Use RCA</h2>
          <p>RCA is particularly valuable in the following situations:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Investigating industrial accidents</li>
            <li>Analyzing quality defects</li>
            <li>Resolving customer complaints</li>
            <li>Improving business processes</li>
          </ul>
        </div>
      </div>
    ),
    'fundamentals-5-whys': (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">The 5 Whys Technique</h1>
        <div className="prose max-w-none">
          <p>
            The 5 Whys is a fundamental tool in Root Cause Analysis. It's a simple but powerful
            technique for cutting quickly through the outward symptoms of a problem to reveal its
            underlying causes.
          </p>
          <h2 className="text-xl font-semibold mt-6">How It Works</h2>
          <p>
            Start with a problem statement and ask "why" five times to drill down to the root cause.
            Each answer forms the basis for the next question.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <h3 className="font-semibold">Example:</h3>
            <ul className="list-none space-y-2 mt-2">
              <li><strong>Problem:</strong> The product delivery was late.</li>
              <li><strong>Why?</strong> The truck broke down.</li>
              <li><strong>Why?</strong> The maintenance schedule was missed.</li>
              <li><strong>Why?</strong> The maintenance reminder system failed.</li>
              <li><strong>Why?</strong> The software wasn't updated.</li>
              <li><strong>Why?</strong> No update protocol was in place.</li>
            </ul>
          </div>
        </div>
      </div>
    )
    // Add more lesson content as needed
  };

  return (
    <div className="space-y-6">
      {lessonContents[moduleId] || (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600">
            This lesson is coming soon!
          </h3>
          <p className="text-gray-500 mt-2">
            We're working hard to bring you more great content.
          </p>
        </div>
      )}
    </div>
  );
};

export default Learn; 