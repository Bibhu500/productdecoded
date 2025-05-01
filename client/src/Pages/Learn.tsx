import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronDown,
  Brain,
  Target,
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  Star,
  Clock,
  Award,
  BarChart,
  Lock,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LessonProgress {
  id: string;
  completed: boolean;
  timeSpent: number;
  lastAccessed: string;
  score?: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requiredLevel?: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  type: 'video' | 'text' | 'quiz';
  points: number;
}

const Learn: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [userLevel, setUserLevel] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('lessonProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Calculate user level and points
  useEffect(() => {
    const points = progress.reduce((total, lesson) => {
      const lessonData = findLessonById(lesson.id);
      return total + (lesson.completed ? (lessonData?.points || 0) : 0);
    }, 0);
    setTotalPoints(points);
    setUserLevel(Math.floor(points / 100) + 1);
  }, [progress]);

  const toggleLesson = (moduleId: string) => {
    setExpandedLessons(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const findLessonById = (lessonId: string): Lesson | undefined => {
    for (const module of modules) {
      const lesson = module.lessons.find(l => `${module.id}-${l.id}` === lessonId);
      if (lesson) return lesson;
    }
    return undefined;
  };

  const handleLessonComplete = (moduleId: string, lessonId: string) => {
    const fullId = `${moduleId}-${lessonId}`;
    const lesson = findLessonById(fullId);
    
    setProgress(prev => {
      const now = new Date().toISOString();
      const existing = prev.find(p => p.id === fullId);
      const updated = existing
        ? { ...existing, lastAccessed: now }
        : {
            id: fullId,
            completed: true,
            timeSpent: 0,
            lastAccessed: now,
            score: Math.floor(Math.random() * 30) + 70 // Simulated score
          };

      const newProgress = existing
        ? prev.map(p => p.id === fullId ? updated : p)
        : [...prev, updated];
      
      localStorage.setItem('lessonProgress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const getLessonProgress = (moduleId: string, lessonId: string): LessonProgress | undefined => {
    return progress.find(p => p.id === `${moduleId}-${lessonId}`);
  };

  const isModuleLocked = (module: Module): boolean => {
    return (module.requiredLevel || 0) > userLevel;
  };

  const modules: Module[] = [
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
          content: 'Understanding what RCA is and why it matters',
          type: 'video',
          points: 50
        },
        {
          id: '5-whys',
          title: 'The 5 Whys Technique',
          duration: '20 mins',
          content: 'Learn the fundamental questioning method',
          type: 'text',
          points: 75
        },
        {
          id: 'fishbone',
          title: 'Fishbone Diagram',
          duration: '25 mins',
          content: 'Master cause and effect analysis',
          type: 'quiz',
          points: 100
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Techniques',
      description: 'Deep dive into sophisticated RCA methodologies',
      icon: <Target className="w-6 h-6" />,
      requiredLevel: 2,
      lessons: [
        {
          id: 'fta',
          title: 'Fault Tree Analysis',
          duration: '30 mins',
          content: 'Systematic approach to failure analysis',
          type: 'video',
          points: 150
        },
        {
          id: 'barriers',
          title: 'Barrier Analysis',
          duration: '25 mins',
          content: 'Understanding preventive and protective measures',
          type: 'quiz',
          points: 125
        },
        {
          id: 'pareto',
          title: 'Pareto Analysis in RCA',
          duration: '20 mins',
          content: 'Prioritizing root causes effectively',
          type: 'text',
          points: 100
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
                <Star className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-600">{totalPoints} XP</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-600">Level {userLevel}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-xl font-semibold">Learning Hub</span>
              </div>
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
                {modules.map(module => {
                  const isLocked = isModuleLocked(module);
                  const completedLessons = module.lessons.filter(
                    lesson => getLessonProgress(module.id, lesson.id)?.completed
                  ).length;
                  const progress = (completedLessons / module.lessons.length) * 100;

                  return (
                    <motion.div
                      key={module.id}
                      className="border rounded-lg overflow-hidden"
                      initial={false}
                    >
                      <button
                        onClick={() => toggleLesson(module.id)}
                        className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 ${
                          isLocked ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isLocked}
                      >
                        <div className="flex items-center">
                          <div className="text-blue-600">{module.icon}</div>
                          <div className="ml-3 text-left">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{module.title}</h3>
                              {isLocked && (
                                <div className="flex items-center text-xs text-gray-500">
                                  <Lock className="h-3 w-3 mr-1" />
                                  Level {module.requiredLevel}
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{module.description}</p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transform transition-transform ${
                            expandedLessons.includes(module.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {expandedLessons.includes(module.id) && !isLocked && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t"
                          >
                            {/* Progress bar */}
                            <div className="px-4 py-2 bg-gray-50">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>

                            {module.lessons.map(lesson => {
                              const lessonProgress = getLessonProgress(module.id, lesson.id);
                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => setSelectedModule(`${module.id}-${lesson.id}`)}
                                  className={`w-full flex items-center p-3 hover:bg-blue-50 ${
                                    selectedModule === `${module.id}-${lesson.id}`
                                      ? 'bg-blue-50'
                                      : ''
                                  }`}
                                >
                                  {lesson.type === 'video' && (
                                    <PlayCircle className="w-4 h-4 text-blue-600" />
                                  )}
                                  {lesson.type === 'quiz' && (
                                    <Brain className="w-4 h-4 text-purple-600" />
                                  )}
                                  {lesson.type === 'text' && (
                                    <BookOpen className="w-4 h-4 text-green-600" />
                                  )}
                                  <div className="ml-3 text-left flex-1">
                                    <h4 className="text-sm font-medium">{lesson.title}</h4>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                      <div className="flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {lesson.duration}
                                      </div>
                                      <div className="flex items-center">
                                        <Zap className="w-3 h-3 mr-1" />
                                        {lesson.points} XP
                                      </div>
                                    </div>
                                  </div>
                                  {lessonProgress?.completed && (
                                    <div className="ml-auto flex items-center gap-2">
                                      {lessonProgress.score && (
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                          {lessonProgress.score}%
                                        </span>
                                      )}
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {selectedModule ? (
                <LessonContent 
                  moduleId={selectedModule} 
                  modules={modules}
                  onComplete={handleLessonComplete}
                />
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

interface LessonContentProps {
  moduleId: string;
  modules: Module[];
  onComplete: (moduleId: string, lessonId: string) => void;
}

const LessonContent: React.FC<LessonContentProps> = ({ moduleId, modules, onComplete }) => {
  const [moduleId_, lessonId] = moduleId.split('-');
  const module = modules.find(m => m.id === moduleId_);
  const lesson = module?.lessons.find(l => l.id === lessonId);

  if (!module || !lesson) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600">
          Lesson not found
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <button
          onClick={() => onComplete(module.id, lesson.id)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Mark as Complete
        </button>
      </div>

      <div className="prose max-w-none">
        {lesson.type === 'video' && (
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        <p className="text-gray-700 mt-4">
          {lesson.content}
        </p>

        {/* Example content - In a real app, this would be dynamic */}
        <h2 className="text-xl font-semibold mt-6">Key Concepts</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Understanding the difference between symptoms and root causes</li>
          <li>Identifying contributing factors vs. root causes</li>
          <li>The importance of evidence-based analysis</li>
          <li>Systems thinking in RCA</li>
        </ul>

        {lesson.type === 'quiz' && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Knowledge Check</h3>
            <p className="text-blue-700">
              Complete the quiz to test your understanding of the concepts covered in this lesson.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn; 