import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BrainCircuit,
  BadgeCheck,
  CheckCircle2,
  Info,
  Clock,
  Target,
  Trophy,
  Star,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RcaScenario, { rcaScenarios, RcaScenarioData } from '../components/RcaScenario';
import RcaChatInterface from '../components/RcaChatInterface';

interface ScenarioProgress {
  id: string;
  bestScore: number;
  attempts: number;
  lastAttempt: string;
  timeSpent: number;
}

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [practiceStarted, setPracticeStarted] = useState(false);
  const [_completedEvaluation, setCompletedEvaluation] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [scenarioProgress, setScenarioProgress] = useState<ScenarioProgress[]>([]);
  const [showTips, setShowTips] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('scenarioProgress');
    if (savedProgress) {
      setScenarioProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleScenarioSelection = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setPracticeStarted(false);
    setCompletedEvaluation(null);
    setTimer(0);
    setIsTimerActive(false);
  };

  const handleStartPractice = () => {
    setPracticeStarted(true);
    setIsTimerActive(true);
  };

  const handlePracticeComplete = (evaluation: string) => {
    setCompletedEvaluation(evaluation);
    setIsTimerActive(false);
    
    // Extract score from evaluation (assuming it's in the format "Score: X%")
    const scoreMatch = evaluation.match(/Score:\s*(\d+)%/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
    
    // Update progress
    const currentScenario = selectedScenario as string;
    const now = new Date().toISOString();
    
    setScenarioProgress(prev => {
      const existing = prev.find(p => p.id === currentScenario);
      const updated = existing
        ? {
            ...existing,
            bestScore: Math.max(existing.bestScore, score),
            attempts: existing.attempts + 1,
            lastAttempt: now,
            timeSpent: existing.timeSpent + timer
          }
        : {
            id: currentScenario,
            bestScore: score,
            attempts: 1,
            lastAttempt: now,
            timeSpent: timer
          };
      
      const newProgress = existing
        ? prev.map(p => p.id === currentScenario ? updated : p)
        : [...prev, updated];
      
      // Save to localStorage
      localStorage.setItem('scenarioProgress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const getCurrentScenario = (): RcaScenarioData | undefined => {
    return rcaScenarios.find(scenario => scenario.id === selectedScenario);
  };

  const getScenarioProgress = (scenarioId: string): ScenarioProgress | undefined => {
    return scenarioProgress.find(p => p.id === scenarioId);
  };

  const rcaTips = [
    "Start by gathering all relevant data before jumping to conclusions",
    "Use the '5 Whys' technique to dig deeper into the root cause",
    "Consider multiple potential causes rather than fixating on one",
    "Look for patterns in user behavior and system interactions",
    "Validate your assumptions with data whenever possible"
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
              {practiceStarted && (
                <div className="flex items-center bg-blue-100 px-4 py-2 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-600">{formatTime(timer)}</span>
                </div>
              )}
              <div className="flex items-center">
                <BrainCircuit className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-xl font-semibold">RCA Practice</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-start md:items-center flex-col md:flex-row">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Interactive RCA Practice</h1>
              <p className="text-gray-600 mt-2">
                Practice your Root Cause Analysis skills with realistic product management scenarios. 
                Interact with our AI assistant that simulates real stakeholder conversations.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Info className="h-5 w-5" />
                RCA Tips
              </button>
            </div>
          </div>
          
          <AnimatePresence>
            {showTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 bg-blue-50 rounded-lg p-6"
              >
                <h3 className="font-semibold text-blue-800 mb-4">Pro Tips for Better RCA:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {rcaTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-blue-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Scenarios Selection */}
          {!practiceStarted && (
            <div className="md:col-span-1 space-y-6">
              <h2 className="font-semibold text-xl text-gray-800">
                Select a Scenario
              </h2>
              
              <div className="space-y-4">
                {rcaScenarios.map((scenario) => {
                  const progress = getScenarioProgress(scenario.id);
                  return (
                    <motion.div
                      key={scenario.id}
                      whileHover={{ y: -5 }}
                    >
                      <RcaScenario
                        scenario={scenario}
                        isSelected={selectedScenario === scenario.id}
                        onSelect={handleScenarioSelection}
                        progress={progress}
                      />
                      {progress && (
                        <div className="mt-2 px-4 py-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-yellow-600" />
                              <span>Best Score: {progress.bestScore}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-purple-600" />
                              <span>Attempts: {progress.attempts}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Scenario Details or Practice */}
          <div className={`${practiceStarted ? 'md:col-span-3' : 'md:col-span-2'}`}>
            {selectedScenario && !practiceStarted ? (
              // Scenario details and start button
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {getCurrentScenario()?.title}
                  </h2>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-2">Scenario:</h3>
                    <p className="text-gray-700">{getCurrentScenario()?.scenario}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      Practice Objectives:
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                        <span>Ask clarifying questions to understand the problem scope</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                        <span>Apply appropriate RCA techniques (5 Whys, Fishbone Diagram, etc.)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                        <span>Identify potential root causes and validate your hypothesis</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                        <span>Recommend corrective actions and preventive measures</span>
                      </li>
                    </ul>
                  </div>
                  
                  <button
                    onClick={handleStartPractice}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <BadgeCheck className="h-5 w-5 mr-2" />
                    Start RCA Practice
                  </button>
                </div>
              </div>
            ) : !selectedScenario ? (
              // No scenario selected
              <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center text-center h-full">
                <BrainCircuit className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Select a scenario to begin
                </h3>
                <p className="text-gray-500">
                  Choose from our collection of realistic product management scenarios
                </p>
              </div>
            ) : (
              // Practice in progress
              <div className="h-[calc(100vh-200px)]">
                <RcaChatInterface 
                  scenario={getCurrentScenario()?.scenario || ''} 
                  onComplete={handlePracticeComplete}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice; 