import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BrainCircuit,
  BadgeCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RcaScenario, { rcaScenarios, RcaScenarioData } from '../components/RcaScenario';
import RcaChatInterface from '../components/RcaChatInterface';

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [practiceStarted, setPracticeStarted] = useState(false);
  const [completedEvaluation, setCompletedEvaluation] = useState<string | null>(null);

  const handleScenarioSelection = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setPracticeStarted(false);
    setCompletedEvaluation(null);
  };

  const handleStartPractice = () => {
    setPracticeStarted(true);
  };

  const handlePracticeComplete = (evaluation: string) => {
    setCompletedEvaluation(evaluation);
  };

  const getCurrentScenario = (): RcaScenarioData | undefined => {
    return rcaScenarios.find(scenario => scenario.id === selectedScenario);
  };

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
              <BrainCircuit className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">RCA Practice</span>
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
            <div className="mt-4 md:mt-0 bg-blue-50 p-4 rounded-lg flex items-start">
              <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-700">
                  <strong>How it works:</strong> Select a scenario, ask clarifying questions, 
                  and perform your analysis. The AI will provide guidance and feedback on your approach.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Scenarios Selection */}
          {!practiceStarted && (
            <div className="md:col-span-1 space-y-6">
              <h2 className="font-semibold text-xl text-gray-800">
                Select a Scenario
              </h2>
              
              <div className="space-y-4">
                {rcaScenarios.map((scenario) => (
                  <RcaScenario
                    key={scenario.id}
                    scenario={scenario}
                    isSelected={selectedScenario === scenario.id}
                    onSelect={handleScenarioSelection}
                  />
                ))}
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