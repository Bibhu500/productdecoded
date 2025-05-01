import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  CheckCircle,


  Target,
  Send,
  Loader
  
} from 'lucide-react';

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  timeLimit: number;
  points: number;
  requiredLevel?: number;
  icon: any;
}

interface Props {
  scenario: Scenario;
  onComplete: (scenarioId: string, score: number, timeSpent: number) => void;
  onBack: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const RcaScenario: React.FC<Props> = ({ scenario, onComplete, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = generateResponse(userMessage, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);

      // Check if scenario should be completed
      if (shouldCompleteScenario(messages)) {
        handleScenarioComplete();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = (userMessage: string, previousMessages: Message[]): string => {
    // Simple response generation logic - in a real app, this would be more sophisticated
    const messageCount = previousMessages.length;
    
    if (messageCount === 0) {
      return "Let's start analyzing this issue. What specific data points or metrics have you observed that indicate a problem?";
    }

    if (userMessage.toLowerCase().includes('why')) {
      return "That's a good question. Have you considered looking at [relevant metrics] or [potential factors]? What other data could help us validate this hypothesis?";
    }

    if (messageCount >= 6) {
      return "Based on our analysis, it seems we've identified some key factors. Would you like to summarize your findings and propose solutions?";
    }

    return "Interesting observation. How does this relate to the overall problem we're trying to solve? What evidence supports this connection?";
  };

  const shouldCompleteScenario = (currentMessages: Message[]): boolean => {
    // Simple completion logic - in a real app, this would be more sophisticated
    return currentMessages.length >= 8;
  };

  const handleScenarioComplete = () => {
    setIsComplete(true);
    const timeSpent = timer / 60; // Convert to minutes
    const score = calculateScore(messages);
    onComplete(scenario.id, score, timeSpent);
  };

  const calculateScore = (messages: Message[]): number => {
    // Simple scoring logic - in a real app, this would be more sophisticated
    const baseScore = 70;
    const messageBonus = Math.min(messages.length * 2, 20);
    const timeBonus = Math.max(0, 10 - Math.floor(timer / 60));
    return Math.min(100, baseScore + messageBonus + timeBonus);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Scenarios
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-600">{formatTime(timer)}</span>
            </div>
            {isComplete && (
              <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-600">Complete!</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${
              scenario.difficulty === 'Beginner' ? 'bg-green-100' :
              scenario.difficulty === 'Intermediate' ? 'bg-yellow-100' :
              scenario.difficulty === 'Advanced' ? 'bg-orange-100' :
              'bg-red-100'
            }`}>
              <scenario.icon className={`h-6 w-6 ${
                scenario.difficulty === 'Beginner' ? 'text-green-600' :
                scenario.difficulty === 'Intermediate' ? 'text-yellow-600' :
                scenario.difficulty === 'Advanced' ? 'text-orange-600' :
                'text-red-600'
              }`} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{scenario.title}</h1>
              <p className="text-gray-600">{scenario.description}</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Objectives:</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                <span>Identify and analyze the root cause using appropriate techniques</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                <span>Gather and analyze relevant data to support your findings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                <span>Propose effective solutions based on your analysis</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {message.content}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 rounded-lg p-4">
                <Loader className="h-5 w-5 animate-spin text-gray-600" />
              </div>
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isComplete}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading || isComplete}
              className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                !input.trim() || isLoading || isComplete
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RcaScenario; 