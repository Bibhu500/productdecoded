import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Send,
  Loader,
  AlertTriangle,
  CheckCircle2,
  X,
  Trophy,
  Star
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { RCATest } from '../data/rcaQuestions';
import { sendRCAMessage, evaluateAnswer, ChatMessage } from '../lib/deepseek';

interface Props {
  rcaTest: RCATest;
  onComplete: (score: number, timeSpent: number) => void;
  onBack: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const RcaChatInterface: React.FC<Props> = ({ rcaTest, onComplete, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [evaluationResult, setEvaluationResult] = useState<{
    isCorrect: boolean;
    feedback: string;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    // Send initial message
    const initialMessage: Message = {
      role: 'assistant',
      content: `Hello! I'm here to help you practice Root Cause Analysis for: **${rcaTest.title}**

${rcaTest.problem_statement}

Let's work through this systematically. What's your first question or observation about this situation?`,
      timestamp: Date.now()
    };
    setMessages([initialMessage]);

    return () => clearInterval(interval);
  }, [rcaTest]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Convert to ChatMessage format for API
      const chatMessages: ChatMessage[] = [
        ...messages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      const scenarioData = {
        problem_statement: rcaTest.problem_statement,
        clarifications: rcaTest.clarifications,
        expected_root_cause: rcaTest.expected_root_cause,
        reasoning_steps: rcaTest.reasoning_steps
      };

      const response = await sendRCAMessage(chatMessages, scenarioData);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || isLoading) return;

    setIsLoading(true);
    
    try {
      // Use DeepSeek to evaluate the answer
      const result = await evaluateAnswer(
        userAnswer,
        rcaTest.expected_root_cause,
        rcaTest.accepted_answers
      );

      setEvaluationResult(result);
      setShowValidation(true);

      if (result.isCorrect) {
        const timeSpent = timer / 60; // Convert to minutes
        const score = calculateScore(messages.length, timer);
        setFinalScore(score);
        
        // Show success modal first, then complete after delay
        setTimeout(() => {
          setShowValidation(false);
          setShowSuccess(true);
          setIsComplete(true);
          
          // Auto-close after showing success for 3 seconds
          setTimeout(() => {
            onComplete(score, timeSpent);
          }, 3000);
        }, 2000);
      }
    } catch (error) {
      console.error('Error evaluating answer:', error);
      setEvaluationResult({
        isCorrect: false,
        feedback: 'Error evaluating your answer. Please try again.'
      });
      setShowValidation(true);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateScore = (messageCount: number, timeSpent: number): number => {
    const baseScore = 70; // Minimum passing score
    const efficiencyBonus = Math.max(0, 20 - Math.floor(messageCount / 3)); // Fewer messages = higher score
    const timeBonus = Math.max(0, 10 - Math.floor(timeSpent / 120)); // Faster completion = higher score
    return Math.min(100, baseScore + efficiencyBonus + timeBonus);
  };

  const getScoreGrade = (score: number): { grade: string; color: string } => {
    if (score >= 90) return { grade: 'Excellent', color: 'text-green-600' };
    if (score >= 80) return { grade: 'Great', color: 'text-blue-600' };
    if (score >= 70) return { grade: 'Good', color: 'text-yellow-600' };
    return { grade: 'Needs Improvement', color: 'text-red-600' };
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            disabled={isComplete}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Questions
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
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
            <div className="bg-blue-100 p-2 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{rcaTest.title}</h1>
              <p className="text-gray-600">Interactive RCA Session</p>
            </div>
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
                <div className="prose prose-sm max-w-none">
                  {message.role === 'user' ? (
                    <div className="text-white">{message.content}</div>
                  ) : (
                    <ReactMarkdown
                      components={{
                        // Override default styling for markdown elements
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-md font-semibold mb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-medium mb-1">{children}</h3>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  )}
                </div>
                <div className="text-xs mt-2 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-2">
                <Loader className="h-5 w-5 animate-spin text-gray-600" />
                <span className="text-gray-600">Thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-gray-50">
          {!isComplete && (
            <>
              <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask questions to gather more information..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                    !input.trim() || isLoading
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
              </form>

              {/* Final Answer Section */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Ready to submit your final root cause analysis?</h4>
                <form onSubmit={handleFinalAnswer} className="flex gap-4">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="State your final root cause conclusion..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!userAnswer.trim() || isLoading}
                    className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                      !userAnswer.trim() || isLoading
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                    }`}
                  >
                    {isLoading ? (
                      <Loader className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Submit Final Answer
                      </>
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Validation Modal */}
      {showValidation && evaluationResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Analysis Result</h3>
              <button
                onClick={() => setShowValidation(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className={`p-4 rounded-lg ${evaluationResult.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center gap-3 mb-3">
                {evaluationResult.isCorrect ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <X className="h-6 w-6 text-red-600" />
                )}
                <div>
                  <p className={`font-medium ${evaluationResult.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {evaluationResult.isCorrect ? 'Excellent!' : 'Not quite right'}
                  </p>
                </div>
              </div>
              
              <p className={`text-sm ${evaluationResult.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {evaluationResult.feedback}
              </p>
              
              {!evaluationResult.isCorrect && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Expected answer:</strong> {rcaTest.expected_root_cause}
                  </p>
                </div>
              )}
            </div>
            
            {!evaluationResult.isCorrect && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setShowValidation(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Success Celebration Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-xl text-center"
          >
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
                className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
              >
                <Trophy className="h-8 w-8 text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 Congratulations!</h2>
              <p className="text-gray-600">You've successfully completed the RCA analysis!</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-lg">Your Score: {finalScore}/100</span>
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <div className={`font-medium ${getScoreGrade(finalScore).color}`}>
                  Grade: {getScoreGrade(finalScore).grade}
                </div>
                <div>Time: {formatTime(timer)}</div>
                <div>Messages: {messages.length}</div>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              This question is now marked as completed!
              <br />
              Returning to question list in a moment...
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RcaChatInterface; 