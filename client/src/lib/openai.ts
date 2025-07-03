import OpenAI from 'openai';

// Initialize OpenAI client with proper error handling
let openai: OpenAI;

try {
  // Get API key from environment
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
  
  // Clean the API key in case it has unwanted characters
  const cleanedApiKey = apiKey.trim().replace(/[\r\n\s]+/g, '');
  
  if (!cleanedApiKey) {
    console.error('OpenAI API key is missing in .env file');
  }
  
  // Initialize the client with the API key
  openai = new OpenAI({
    apiKey: cleanedApiKey || 'sk-dummy-key-for-initialization-only',
    dangerouslyAllowBrowser: true, // Enable browser usage
  });
  
  console.log("OpenAI client initialization attempted");
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error);
  // Create a dummy client to prevent app crashes
  openai = new OpenAI({
    apiKey: 'sk-dummy-key-for-initialization-only',
    dangerouslyAllowBrowser: true,
  });
}

// RCA PM Expert system prompt
const RCA_PM_SYSTEM_PROMPT = `You are a Product Management expert who specializes in Product Problem Analysis. 
Your role is to help train product managers by simulating realistic RCA scenarios.

You will be given a problem statement about a product issue. You will:
1. Help the user understand the scenario by answering their questions
2. Provide clarifying details when asked
3. Guide them through the RCA process without giving away the answers
4. Evaluate their final root cause analysis and solution
5. Provide constructive feedback on their approach

Use the following structure for your interactions:
- Ask clarifying questions to understand the problem
- Use the 5 Whys technique and other RCA frameworks
- Identify potential root causes and validate them
- Suggest corrective actions and preventive measures

Maintain a professional, encouraging tone. Your goal is to help the user improve their RCA skills through practice.`;

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Send a message to the OpenAI API and get a response
 */
export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  try {
    // Check if we have a valid API key first
    if (!openai.apiKey || openai.apiKey === 'sk-dummy-key-for-initialization-only') {
      return 'OpenAI API key is missing or invalid. Please check your .env file and add a valid key.';
    }
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Provide a more helpful error message
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return 'OpenAI API key error: The API key provided seems to be invalid. Please check your .env file and ensure the key is correctly formatted.';
      } else if (error.message.includes('insufficient_quota')) {
        return 'OpenAI API quota exceeded: Your account has reached its usage limit. Please check your OpenAI account.';
      }
    }
    return 'Sorry, there was an error processing your request. Please check the console for more details.';
  }
}

/**
 * Evaluate the user's RCA analysis
 */
export async function evaluateRCA(scenario: string, userAnalysis: string): Promise<string> {
  const messages: ChatMessage[] = [
    { role: 'system', content: `${RCA_PM_SYSTEM_PROMPT} For this message, you are evaluating a user's RCA. Be encouraging but honest about areas of improvement.` },
    { role: 'user', content: `Scenario: ${scenario}\n\nUser's Analysis: ${userAnalysis}\n\nPlease evaluate my root cause analysis and solution. What did I do well and what could I improve?` }
  ];

  try {
    // Check if we have a valid API key first
    if (!openai.apiKey || openai.apiKey === 'sk-dummy-key-for-initialization-only') {
      return 'OpenAI API key is missing or invalid. Please check your .env file and add a valid key.';
    }
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || 'Sorry, I couldn\'t evaluate your analysis.';
  } catch (error) {
    console.error('Error calling OpenAI API for evaluation:', error);
    // Provide a more helpful error message
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return 'OpenAI API key error: The API key provided seems to be invalid. Please check your .env file and ensure the key is correctly formatted.';
      } else if (error.message.includes('insufficient_quota')) {
        return 'OpenAI API quota exceeded: Your account has reached its usage limit. Please check your OpenAI account.';
      }
    }
    return 'Sorry, there was an error processing your analysis. Please check the console for more details.';
  }
} 