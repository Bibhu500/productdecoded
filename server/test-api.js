// Test file to demonstrate API usage with Clerk authentication
// Run with: node test-api.js

const CLERK_ID = 'user_2abc123def456'; // Example Clerk ID
const API_BASE = 'http://localhost:5000/api';

// Example API calls for testing

// 1. Create/Update User (usually called from frontend after Clerk authentication)
const createUserExample = {
  method: 'POST',
  url: `${API_BASE}/users/create`,
  body: {
    clerkId: CLERK_ID,
    email: 'john.doe@example.com',
    name: 'John Doe',
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    imageUrl: 'https://example.com/avatar.jpg'
  }
};

// 2. Get User by Clerk ID
const getUserExample = {
  method: 'GET',
  url: `${API_BASE}/users/clerk/${CLERK_ID}`
};

// 3. Get User Progress by Clerk ID
const getProgressExample = {
  method: 'GET',
  url: `${API_BASE}/progress/clerk/${CLERK_ID}`
};

// 4. Update Scenario Progress
const updateScenarioExample = {
  method: 'POST',
  url: `${API_BASE}/progress/clerk/${CLERK_ID}/scenario`,
  body: {
    scenarioId: 'user-engagement-drop',
    score: 85,
    timeSpent: 25
  }
};

// 5. Update Lesson Progress
const updateLessonExample = {
  method: 'POST',
  url: `${API_BASE}/progress/clerk/${CLERK_ID}/lesson`,
  body: {
    lessonId: 'rca-intro',
    completed: true,
    timeSpent: 15,
    score: 95
  }
};

// 6. Get User Stats
const getStatsExample = {
  method: 'GET',
  url: `${API_BASE}/progress/clerk/${CLERK_ID}/stats`
};

// 7. Check Achievements
const checkAchievementsExample = {
  method: 'POST',
  url: `${API_BASE}/achievements/check/${CLERK_ID}`
};

// 8. Seed Achievements (run once)
const seedAchievementsExample = {
  method: 'POST',
  url: `${API_BASE}/achievements/seed`
};

// 9. Webhook endpoint for Clerk (configured in Clerk dashboard)
const clerkWebhookExample = {
  url: `${API_BASE}/webhooks/clerk`,
  description: 'Configure this URL in your Clerk dashboard webhooks section',
  events: ['user.created', 'user.updated', 'user.deleted']
};

console.log('=== ProductDecoded API Test Examples ===\n');

console.log('1. Create/Update User:');
console.log(`${createUserExample.method} ${createUserExample.url}`);
console.log('Body:', JSON.stringify(createUserExample.body, null, 2));
console.log();

console.log('2. Get User by Clerk ID:');
console.log(`${getUserExample.method} ${getUserExample.url}`);
console.log();

console.log('3. Get User Progress:');
console.log(`${getProgressExample.method} ${getProgressExample.url}`);
console.log();

console.log('4. Update Scenario Progress:');
console.log(`${updateScenarioExample.method} ${updateScenarioExample.url}`);
console.log('Body:', JSON.stringify(updateScenarioExample.body, null, 2));
console.log();

console.log('5. Update Lesson Progress:');
console.log(`${updateLessonExample.method} ${updateLessonExample.url}`);
console.log('Body:', JSON.stringify(updateLessonExample.body, null, 2));
console.log();

console.log('6. Get User Stats:');
console.log(`${getStatsExample.method} ${getStatsExample.url}`);
console.log();

console.log('7. Check for New Achievements:');
console.log(`${checkAchievementsExample.method} ${checkAchievementsExample.url}`);
console.log();

console.log('8. Seed Initial Achievements:');
console.log(`${seedAchievementsExample.method} ${seedAchievementsExample.url}`);
console.log();

console.log('9. Clerk Webhook Configuration:');
console.log('URL:', clerkWebhookExample.url);
console.log('Events to subscribe:', clerkWebhookExample.events.join(', '));
console.log();

console.log('=== Frontend Integration Example ===\n');

const frontendExample = `
// Frontend code example using Clerk and your API

import { useUser } from '@clerk/nextjs';

function MyComponent() {
  const { user } = useUser();

  // Create/sync user on first login
  useEffect(() => {
    if (user) {
      fetch('/api/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        })
      });
    }
  }, [user]);

  // Save scenario progress
  const saveScenarioProgress = async (scenarioId, score, timeSpent) => {
    await fetch(\`/api/progress/clerk/\${user.id}/scenario\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioId, score, timeSpent })
    });
  };

  // Save lesson progress
  const saveLessonProgress = async (lessonId, completed, timeSpent, score) => {
    await fetch(\`/api/progress/clerk/\${user.id}/lesson\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, completed, timeSpent, score })
    });
  };

  return <div>Your learning component</div>;
}
`;

console.log(frontendExample);

console.log('=== Setup Instructions ===\n');
console.log('1. Add your MongoDB URI to .env file');
console.log('2. Run: npm run dev');
console.log('3. Configure Clerk webhook URL in Clerk dashboard');
console.log('4. Seed achievements: POST /api/achievements/seed');
console.log('5. Test user creation: POST /api/users/create');
console.log('6. Start saving progress data!');
console.log();

console.log('MongoDB Collections:');
console.log('- Users: Stores user data from Clerk');
console.log('- progresses: Stores learning progress and streaks');
console.log('- achievements: Stores achievement definitions');
console.log('- userachievements: Stores user achievement unlocks');
console.log();

console.log('Server is ready to save all your user learning data! 🚀'); 