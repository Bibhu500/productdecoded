import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Star,
  Clock,
  Award,
  Target,
  Brain,
  Zap,
  Activity,
  Trophy,
  User,
  BarChart,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { progressService } from '../services/ProgressService';
import { rcaLearningModules, getRcaModule, type RcaLearningModule } from '../data/rcaLearningModules';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const RcaLearn: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [stats, setStats] = useState(progressService.getStats());
  const [completedPages, setCompletedPages] = useState<Set<string>>(new Set());

  // Load completed pages from ProgressService
  useEffect(() => {
    const completedSet = new Set<string>();
    rcaLearningModules.forEach(module => {
      module.pages.forEach(page => {
        const pageKey = `${module.id}-${page.id}`;
        const progress = progressService.getLessonProgress(pageKey);
        if (progress?.completed) {
          completedSet.add(pageKey);
        }
      });
    });
    setCompletedPages(completedSet);
  }, []);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handlePageComplete = (moduleId: string, pageId: string, _points: number) => {
    const pageKey = `${moduleId}-${pageId}`;
    const newCompleted = new Set(completedPages);
    
    if (!newCompleted.has(pageKey)) {
      newCompleted.add(pageKey);
      setCompletedPages(newCompleted);
      
      // Get page details for time estimation
      const module = rcaLearningModules.find(m => m.id === moduleId);
      const page = module?.pages.find(p => p.id === pageId);
      const timeSpent = page ? parseInt(page.duration.split(' ')[0]) || 15 : 15;
      
      // Update progress service
      progressService.updateLessonProgress(
        pageKey,
        true,
        timeSpent,
        Math.floor(Math.random() * 30) + 70 // Random score between 70-100
      );
      
      // Update stats
      setStats(progressService.getStats());
    }
  };

  const isPageCompleted = (moduleId: string, pageId: string) => {
    return completedPages.has(`${moduleId}-${pageId}`);
  };

  const getModuleProgress = (module: RcaLearningModule) => {
    const completedPagesInModule = module.pages.filter(page => 
      isPageCompleted(module.id, page.id)
    ).length;
    return (completedPagesInModule / module.pages.length) * 100;
  };

  const getTotalProgress = () => {
    const totalPages = rcaLearningModules.reduce((sum, module) => sum + module.pages.length, 0);
    return (completedPages.size / totalPages) * 100;
  };

  const getPageIcon = (type: string) => {
    switch (type) {
      case 'theory': return <BookOpen className="w-4 h-4" />;
      case 'example': return <User className="w-4 h-4" />;
      case 'exercise': return <Target className="w-4 h-4" />;
      case 'quiz': return <AlertTriangle className="w-4 h-4" />;
      case 'visual': return <BarChart className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'text-blue-600';
      case 'example': return 'text-green-600';
      case 'exercise': return 'text-purple-600';
      case 'quiz': return 'text-orange-600';
      case 'visual': return 'text-pink-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Root Cause Analysis</h1>
                  <p className="text-sm text-gray-600">Master systematic problem-solving</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
                <Star className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-600">{stats.totalPoints} XP</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-600">Level {stats.level}</span>
              </div>
              <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-600">{Math.round(getTotalProgress())}% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Module Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Course Modules</h2>
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  {completedPages.size}/{rcaLearningModules.reduce((sum, m) => sum + m.pages.length, 0)}
                </div>
              </div>
              
              <div className="space-y-4">
                {rcaLearningModules.map((module, index) => {
                  const progress = getModuleProgress(module);
                  const isExpanded = expandedModules.includes(module.id);
                  const ModuleIcon = module.icon;
                  
                  return (
                    <motion.div
                      key={module.id}
                      className="border rounded-lg overflow-hidden"
                      initial={false}
                    >
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`bg-gradient-to-r ${module.color} p-2 rounded-lg`}>
                              <ModuleIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Module {index + 1}</h3>
                              <p className="text-sm text-gray-600">{module.title}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {progress === 100 && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>{module.pages.length} pages</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${module.color} h-2 rounded-full transition-all duration-300`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-gray-200"
                          >
                            <div className="p-2 space-y-1">
                              {module.pages.map((page, pageIndex) => {
                                const isCompleted = isPageCompleted(module.id, page.id);
                                const isSelected = selectedModule === module.id && selectedPage === page.id;
                                
                                return (
                                  <button
                                    key={page.id}
                                    onClick={() => {
                                      setSelectedModule(module.id);
                                      setSelectedPage(page.id);
                                    }}
                                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                      isSelected
                                        ? 'bg-blue-50 border-blue-200 border'
                                        : 'hover:bg-gray-50'
                                    }`}
                                  >
                                    <div className={`${getTypeColor(page.type)} mr-3`}>
                                      {getPageIcon(page.type)}
                                    </div>
                                    <div className="flex-1 text-left">
                                      <h4 className="text-sm font-medium text-gray-900">
                                        {pageIndex + 1}. {page.title}
                                      </h4>
                                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                        <div className="flex items-center">
                                          <Clock className="w-3 h-3 mr-1" />
                                          {page.duration}
                                        </div>
                                        <div className="flex items-center">
                                          <Zap className="w-3 h-3 mr-1" />
                                          {page.points} XP
                                        </div>
                                      </div>
                                    </div>
                                    {isCompleted && (
                                      <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {selectedModule && selectedPage ? (
                <PageContent
                  moduleId={selectedModule}
                  pageId={selectedPage}
                  onComplete={handlePageComplete}
                  isCompleted={isPageCompleted(selectedModule, selectedPage)}
                  onPageChange={setSelectedPage}
                />
              ) : (
                <WelcomeScreen />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Welcome Screen Component
const WelcomeScreen: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-6">
        <Brain className="w-12 h-12 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome to Root Cause Analysis Mastery
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        This comprehensive course will teach you systematic problem-solving techniques used by top product managers. 
        Master the art of identifying root causes and implementing lasting solutions.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <Target className="w-8 h-8 mb-3" />
          <h3 className="font-semibold mb-2">10 Comprehensive Modules</h3>
          <p className="text-blue-100">From basic concepts to advanced frameworks</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <Trophy className="w-8 h-8 mb-3" />
          <h3 className="font-semibold mb-2">Real-World Examples</h3>
          <p className="text-purple-100">Learn from actual product management scenarios</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">What You'll Learn:</h3>
        <div className="grid md:grid-cols-2 gap-4 text-left">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <span>Problem framing and identification</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <span>Data collection and analysis</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <span>5 Whys and Fishbone diagrams</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <span>Advanced RCA frameworks</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <span>Presenting RCA findings</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <span>Real-world case studies</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mt-8">
        Select a module from the sidebar to begin your learning journey →
      </p>
    </div>
  );
};

// Page Content Component
interface PageContentProps {
  moduleId: string;
  pageId: string;
  onComplete: (moduleId: string, pageId: string, points: number) => void;
  isCompleted: boolean;
  onPageChange: (pageId: string) => void;
}

const PageContent: React.FC<PageContentProps> = ({ moduleId, pageId, onComplete, isCompleted, onPageChange }) => {
  const module = getRcaModule(moduleId);
  const page = module?.pages.find(p => p.id === pageId);

  if (!module || !page) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600">Content not found</h3>
      </div>
    );
  }

  const currentPageIndex = module.pages.findIndex(p => p.id === pageId);
  const nextPage = module.pages[currentPageIndex + 1];
  const prevPage = module.pages[currentPageIndex - 1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
            <p className="text-gray-600 mt-2">{module.title}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{page.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Zap className="w-4 h-4" />
              <span>{page.points} XP</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              page.type === 'theory' ? 'text-blue-600 bg-blue-100' :
              page.type === 'example' ? 'text-green-600 bg-green-100' :
              page.type === 'exercise' ? 'text-purple-600 bg-purple-100' :
              page.type === 'quiz' ? 'text-orange-600 bg-orange-100' :
              page.type === 'visual' ? 'text-pink-600 bg-pink-100' :
              'text-gray-600 bg-gray-100'
            }`}>
              {page.type.charAt(0).toUpperCase() + page.type.slice(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({children}) => (
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{children}</h1>
                  <div className="w-16 h-1 bg-blue-500 rounded"></div>
                </div>
              ),
              h2: ({children}) => (
                <div className="mb-6 mt-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{children}</h2>
                  <div className="w-12 h-0.5 bg-gray-300 rounded"></div>
                </div>
              ),
              h3: ({children}) => <h3 className="text-xl font-medium text-gray-900 mb-3 mt-6">{children}</h3>,
              p: ({children}) => {
                const content = children?.toString() || '';
                
                // Check for special formatting
                if (content.includes('✅') || content.includes('❌')) {
                  return (
                    <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4 rounded-r-lg">
                      <p className="text-gray-700 leading-relaxed m-0">{children}</p>
                    </div>
                  );
                }
                
                if (content.includes('Example:') || content.includes('Case Study:')) {
                  return (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded-r-lg">
                      <p className="text-blue-900 leading-relaxed m-0 font-medium">{children}</p>
                    </div>
                  );
                }
                
                if (content.includes('Root Cause:') || content.includes('Result:')) {
                  return (
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4 rounded-r-lg">
                      <p className="text-green-900 leading-relaxed m-0 font-medium">{children}</p>
                    </div>
                  );
                }
                
                return <p className="text-gray-700 leading-relaxed mb-4">{children}</p>;
              },
              ul: ({children}) => <ul className="list-none pl-0 mb-6 space-y-2">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
              li: ({children}) => {
                const content = children?.toString() || '';
                
                if (content.includes('✅') || content.includes('❌')) {
                  return (
                    <li className="flex items-start space-x-3 text-gray-700 leading-relaxed">
                      <span className="text-lg">{content.includes('✅') ? '✅' : '❌'}</span>
                      <span>{children?.toString().replace(/[✅❌]\s*/, '')}</span>
                    </li>
                  );
                }
                
                return (
                  <li className="flex items-start space-x-3 text-gray-700 leading-relaxed">
                    <span className="text-blue-500 text-lg">•</span>
                    <span>{children}</span>
                  </li>
                );
              },
              strong: ({children}) => <strong className="font-semibold text-gray-900 bg-yellow-100 px-1 rounded">{children}</strong>,
              code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">{children}</code>,
              pre: ({children}) => (
                <div className="bg-gray-50 border rounded-lg p-4 overflow-x-auto mb-6">
                  <pre className="text-sm text-gray-800 font-mono">{children}</pre>
                </div>
              ),
              blockquote: ({children}) => (
                <div className="border-l-4 border-blue-500 bg-blue-50 pl-4 pr-4 py-2 italic text-blue-900 mb-6 rounded-r-lg">
                  {children}
                </div>
              ),
                             table: ({children}) => (
                 <div className="overflow-x-auto mb-6 bg-white rounded-lg shadow-lg border border-gray-200">
                   <table className="w-full border-collapse">
                     {children}
                   </table>
                 </div>
               ),
               thead: ({children}) => <thead className="bg-gradient-to-r from-blue-50 to-blue-100">{children}</thead>,
               tbody: ({children}) => <tbody className="bg-white">{children}</tbody>,
               th: ({children}) => (
                 <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200 text-sm uppercase tracking-wider">
                   {children}
                 </th>
               ),
               td: ({children}) => {
                 const content = children?.toString() || '';
                 let cellClass = "px-6 py-4 text-gray-700 border-b border-gray-100";
                 
                 // Style based on content
                 if (content.includes('✅')) {
                   cellClass += " text-green-700 font-medium";
                 } else if (content.includes('❌')) {
                   cellClass += " text-red-700 font-medium";
                 } else if (content.includes('⚠️')) {
                   cellClass += " text-yellow-700 font-medium";
                 }
                 
                 return <td className={cellClass}>{children}</td>;
               },
               tr: ({children}) => <tr className="hover:bg-gray-50 transition-colors duration-150">{children}</tr>
            }}
          >
            {page.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-200">
        <div>
          {prevPage && (
            <button
              onClick={() => onPageChange(prevPage.id)}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: {prevPage.title}
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onComplete(moduleId, pageId, page.points)}
            disabled={isCompleted}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              isCompleted
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>
          
          {nextPage && (
            <button
              onClick={() => onPageChange(nextPage.id)}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              Next: {nextPage.title}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RcaLearn; 