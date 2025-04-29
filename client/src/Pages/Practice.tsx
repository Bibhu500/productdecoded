import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList,
  ArrowLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  scenario: string;
  questions: {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

const caseStudies: CaseStudy[] = [
  {
    id: 'manufacturing-defect',
    title: 'Manufacturing Quality Issue',
    description: 'Analyze a production line defect and identify the root cause',
    difficulty: 'Beginner',
    scenario: `A manufacturing company is experiencing a high rate of defective products in their assembly line. 
    In the past week, 15% of products failed quality control, up from the usual 2%. The defects are primarily 
    related to improper component alignment. Your task is to analyze the situation and identify the root cause.`,
    questions: [
      {
        id: 'q1',
        text: 'What should be your first step in analyzing this situation?',
        options: [
          'Immediately replace all assembly line workers',
          'Collect and analyze recent quality control data',
          'Shut down the production line',
          'Order new components from suppliers'
        ],
        correctAnswer: 1,
        explanation: 'The first step in RCA is to gather data and understand the problem scope. Quality control data will help identify patterns and potential contributing factors.'
      },
      {
        id: 'q2',
        text: 'Which of these observations would be most relevant to the investigation?',
        options: [
          'The cafeteria menu changed last week',
          'A new shift supervisor started three weeks ago',
          'The assembly line calibration was done two months ago',
          'The alignment tools were recalibrated last week'
        ],
        correctAnswer: 3,
        explanation: 'Since the defects are related to alignment issues, the recent recalibration of alignment tools is most relevant and could be directly related to the problem.'
      }
    ]
  },
  {
    id: 'software-outage',
    title: 'Software System Outage',
    description: 'Investigate a critical system failure in a software application',
    difficulty: 'Intermediate',
    scenario: `A critical business application experienced an unexpected outage during peak hours, 
    affecting thousands of users. The system was down for 2 hours, causing significant business impact. 
    Initial reports show no recent code deployments or infrastructure changes.`,
    questions: [
      {
        id: 'q1',
        text: 'Which of these tools would be most appropriate for this RCA?',
        options: [
          'Fishbone Diagram',
          '5 Whys Analysis',
          'Fault Tree Analysis',
          'Pareto Chart'
        ],
        correctAnswer: 2,
        explanation: 'Fault Tree Analysis is ideal for complex systems where multiple factors could contribute to a failure, making it perfect for analyzing system outages.'
      }
    ]
  }
];

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleCaseSelection = (caseId: string) => {
    setSelectedCase(caseId);
    setUserAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelection = (questionId: string, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const resetPractice = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const currentCase = caseStudies.find(c => c.id === selectedCase);
  const allQuestionsAnswered = currentCase 
    ? currentCase.questions.every(q => userAnswers[q.id] !== undefined)
    : false;

  const calculateScore = () => {
    if (!currentCase) return 0;
    const correctAnswers = currentCase.questions.filter(
      q => userAnswers[q.id] === q.correctAnswer
    ).length;
    return (correctAnswers / currentCase.questions.length) * 100;
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
              <ClipboardList className="h-6 w-6 text-green-600" />
              <span className="ml-2 text-xl font-semibold">Practice RCA</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Case Studies List */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Case Studies</h2>
              <div className="space-y-4">
                {caseStudies.map(study => (
                  <motion.button
                    key={study.id}
                    onClick={() => handleCaseSelection(study.id)}
                    className={`w-full p-4 rounded-lg border transition-colors ${
                      selectedCase === study.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-500'
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-left">
                        <h3 className="font-semibold">{study.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{study.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        study.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        study.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {study.difficulty}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Case Study Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {selectedCase && currentCase ? (
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h2 className="text-2xl font-bold">{currentCase.title}</h2>
                    <p className="text-gray-600 mt-2">{currentCase.description}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Scenario:</h3>
                    <p className="text-gray-700">{currentCase.scenario}</p>
                  </div>

                  <div className="space-y-8">
                    {currentCase.questions.map((question, qIndex) => (
                      <div key={question.id} className="space-y-4">
                        <h4 className="font-semibold">
                          Question {qIndex + 1}: {question.text}
                        </h4>
                        <div className="space-y-2">
                          {question.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleAnswerSelection(question.id, index)}
                              disabled={showResults}
                              className={`w-full p-3 rounded-lg border text-left transition-colors ${
                                userAnswers[question.id] === index
                                  ? showResults
                                    ? index === question.correctAnswer
                                      ? 'bg-green-100 border-green-500'
                                      : 'bg-red-100 border-red-500'
                                    : 'bg-blue-50 border-blue-500'
                                  : 'border-gray-200 hover:border-blue-500'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {showResults && userAnswers[question.id] === index && (
                                  index === question.correctAnswer
                                    ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    : <XCircle className="w-5 h-5 text-red-500" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                        {showResults && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t">
                    {showResults ? (
                      <>
                        <div className="flex items-center">
                          <Brain className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="font-semibold">
                            Score: {calculateScore()}%
                          </span>
                        </div>
                        <button
                          onClick={resetPractice}
                          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Try Again
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!allQuestionsAnswered}
                        className={`w-full py-3 rounded-lg flex items-center justify-center ${
                          allQuestionsAnswered
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Submit Answers
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600">
                    Select a case study to begin
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Choose from our collection of real-world scenarios
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

export default Practice; 