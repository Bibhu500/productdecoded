import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, RefreshCw, CheckCircle2 } from 'lucide-react';
import { sendMessage, evaluateRCA, ChatMessage } from '../lib/openai';
import { motion } from 'framer-motion';

interface RcaChatInterfaceProps {
  scenario: string;
  onComplete: (evaluation: string) => void;
}

const RcaChatInterface: React.FC<RcaChatInterfaceProps> = ({ scenario, onComplete }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedAnalysis, setSubmittedAnalysis] = useState(false);
  const [_evaluation, setEvaluation] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat with system message and introduction
  useEffect(() => {
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are a Product Management expert who specializes in Root Cause Analysis (RCA). 
      Your role is to help train product managers by simulating realistic RCA scenarios.
      
      The scenario is: ${scenario}
      
      Guide the user through the RCA process, answering their questions and providing feedback.`
    };
    
    const initialMessage: ChatMessage = {
      role: 'assistant',
      content: `I'm your RCA practice assistant. Here's the scenario we'll be working with:

${scenario}

You can ask me clarifying questions about the situation, and when you're ready, share your analysis of the root cause and your proposed solution. I'll provide feedback on your approach.

What questions do you have about this scenario?`
    };
    
    setMessages([systemMessage, initialMessage]);
  }, [scenario]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Get response from AI
    const updatedMessages = [...messages.filter(msg => msg.role !== 'system'), userMessage];
    const systemPrompt = messages.find(msg => msg.role === 'system')?.content || '';
    const messagesWithSystem = [
      { role: 'system' as const, content: systemPrompt },
      ...updatedMessages.filter(msg => msg.role !== 'system')
    ];

    try {
      const response = await sendMessage(messagesWithSystem);
      const assistantMessage: ChatMessage = { role: 'assistant', content: response };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.'
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnalysis = async () => {
    if (isLoading || submittedAnalysis) return;
    setIsLoading(true);
    
    // Collect all user messages as the analysis
    const userMessages = messages
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .join('\n\n');
    
    try {
      const evaluationResult = await evaluateRCA(scenario, userMessages);
      setEvaluation(evaluationResult);
      setSubmittedAnalysis(true);
      onComplete(evaluationResult);
      
      // Add evaluation to chat
      const evaluationMessage: ChatMessage = {
        role: 'assistant',
        content: `### Evaluation of Your RCA\n\n${evaluationResult}`
      };
      setMessages(prevMessages => [...prevMessages, evaluationMessage]);
    } catch (error) {
      console.error('Error evaluating analysis:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error evaluating your analysis. Please try again.'
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    // Reset to initial state but keep the scenario
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are a Product Management expert who specializes in Root Cause Analysis (RCA). 
      Your role is to help train product managers by simulating realistic RCA scenarios.
      
      The scenario is: ${scenario}
      
      Guide the user through the RCA process, answering their questions and providing feedback.`
    };
    
    const initialMessage: ChatMessage = {
      role: 'assistant',
      content: `I'm your RCA practice assistant. Here's the scenario we'll be working with:

${scenario}

You can ask me clarifying questions about the situation, and when you're ready, share your analysis of the root cause and your proposed solution. I'll provide feedback on your approach.

What questions do you have about this scenario?`
    };
    
    setMessages([systemMessage, initialMessage]);
    setSubmittedAnalysis(false);
    setEvaluation(null);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-blue-600 text-white flex items-center">
        <MessageSquare className="h-5 w-5 mr-2" />
        <h3 className="font-semibold">RCA Practice Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages
          .filter(message => message.role !== 'system')
          .map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap">
                  {message.content.split('### Evaluation of Your RCA\n\n').map((part, i) => {
                    if (i === 1) {
                      // This is the evaluation part
                      return (
                        <div key={i} className="mt-2 p-3 bg-white rounded border-2 border-green-500">
                          <div className="flex items-center mb-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                            <span className="font-semibold text-green-700">Evaluation</span>
                          </div>
                          {part}
                        </div>
                      );
                    }
                    return part;
                  })}
                </div>
              </motion.div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        {!submittedAnalysis ? (
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask questions or share your RCA analysis..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`p-2 rounded-lg transition-colors ${
                isLoading || !input.trim()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={resetChat}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Start New Practice
            </button>
          </div>
        )}
        
        {!submittedAnalysis && messages.filter(m => m.role === 'user').length >= 3 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSubmitAnalysis}
              disabled={isLoading}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isLoading 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Submit for Evaluation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RcaChatInterface; 