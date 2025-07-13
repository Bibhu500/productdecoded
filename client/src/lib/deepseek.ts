// DeepSeek API Configuration
interface DeepSeekResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
    index: number;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// RCA PM Expert system prompt
const RCA_PM_SYSTEM_PROMPT = `You are an experienced Product Manager conducting a mock interview for Root Cause Analysis (RCA). 

Your role:
- Act as a professional interviewer helping the candidate practice RCA skills
- Ask probing questions and guide them through the analysis
- Keep responses conversational and concise (2-3 sentences max)
- Only provide specific information when directly asked
- Help them think through the problem systematically
- Use the 5 Whys technique and other RCA frameworks naturally

Guidelines:
- Be supportive but challenging
- Don't give away the answer directly
- Ask clarifying questions to guide their thinking
- Respond naturally without excessive formatting
- Keep the conversation flowing like a real interview`;

/**
 * Send a message to the DeepSeek API and get a response
 */
export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  try {
    // Get API key from environment
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      return 'DeepSeek API key is missing. Please check your .env file and add a valid VITE_DEEPSEEK_API_KEY.';
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API Error:', errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: DeepSeekResponse = await response.json();
    return data.choices[0].message.content || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return 'DeepSeek API key error: The API key provided seems to be invalid. Please check your .env file and ensure the key is correctly formatted.';
      } else if (error.message.includes('quota')) {
        return 'DeepSeek API quota exceeded: Your account has reached its usage limit. Please check your DeepSeek account.';
      }
    }
    
    return 'Sorry, there was an error processing your request. Please try again.';
  }
}

/**
 * Send a message for RCA guidance with specific scenario context
 */
export async function sendRCAMessage(
  messages: ChatMessage[], 
  scenarioData: {
    problem_statement: string;
    clarifications: Record<string, string>;
    expected_root_cause: string;
    reasoning_steps: string[];
  }
): Promise<string> {
  const contextualMessages: ChatMessage[] = [
    { 
      role: 'system', 
      content: `${RCA_PM_SYSTEM_PROMPT}

Problem Statement: ${scenarioData.problem_statement}

Available Information (only share when specifically asked):
${Object.entries(scenarioData.clarifications).map(([key, value]) => `${key}: ${value}`).join('\n')}

Expected reasoning path: ${scenarioData.reasoning_steps.join(' -> ')}

Remember: Only provide specific information when the candidate asks about it. Guide them naturally through the analysis.` 
    },
    ...messages
  ];

  return await sendMessage(contextualMessages);
}

/**
 * Evaluate the user's final answer using DeepSeek API
 */
export async function evaluateAnswer(
  userAnswer: string, 
  expectedAnswer: string, 
  acceptedAnswers: string[]
): Promise<{ isCorrect: boolean; feedback: string }> {
  const evaluationPrompt = `You are evaluating a candidate's Root Cause Analysis answer.

User's Answer: "${userAnswer}"
Expected Answer: "${expectedAnswer}"
Accepted Variations: ${acceptedAnswers.join(', ')}

Task: Determine if the user's answer is conceptually correct, even if worded differently.

Respond with exactly this format:
CORRECT: [true/false]
FEEDBACK: [Brief feedback explaining why it's correct/incorrect]`;

  const messages: ChatMessage[] = [
    { role: 'system', content: 'You are an expert evaluator for product management interviews.' },
    { role: 'user', content: evaluationPrompt }
  ];

  try {
    const response = await sendMessage(messages);
    
    // Parse the response
    const correctMatch = response.match(/CORRECT:\s*(true|false)/i);
    const feedbackMatch = response.match(/FEEDBACK:\s*(.+)/i);
    
    const isCorrect = correctMatch ? correctMatch[1].toLowerCase() === 'true' : false;
    const feedback = feedbackMatch ? feedbackMatch[1].trim() : 'Unable to evaluate answer properly.';
    
    return { isCorrect, feedback };
  } catch (error) {
    console.error('Error evaluating answer:', error);
    return { 
      isCorrect: false, 
      feedback: 'Error evaluating your answer. Please try again.' 
    };
  }
} 