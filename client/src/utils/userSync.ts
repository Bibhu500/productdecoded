// Utility to manually sync Clerk users with your database
// Use this while debugging webhook issues

import { API_BASE } from '../config/api';

export const syncUserWithDatabase = async (user: any) => {
  if (!user) return;

  try {
    console.log('🔄 Syncing user with database...');
    
    const response = await fetch(`${API_BASE}/users/create`, {
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

    if (response.ok) {
      const data = await response.json();
      console.log('✅ User synced successfully:', data.user.name);
      return data.user;
    } else {
      console.error('❌ Failed to sync user:', await response.text());
    }
  } catch (error) {
    console.error('❌ User sync error:', error);
  }
};

export const saveScenarioProgress = async (clerkId: string, scenarioId: string, score: number, timeSpent: number) => {
  try {
    const response = await fetch(`${API_BASE}/progress/clerk/${clerkId}/scenario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioId, score, timeSpent })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Scenario progress saved');
      return data;
    }
  } catch (error) {
    console.error('❌ Failed to save scenario progress:', error);
  }
};

export const saveLessonProgress = async (clerkId: string, lessonId: string, completed: boolean, timeSpent: number, score?: number) => {
  try {
    const response = await fetch(`${API_BASE}/progress/clerk/${clerkId}/lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, completed, timeSpent, score })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Lesson progress saved');
      return data;
    }
  } catch (error) {
    console.error('❌ Failed to save lesson progress:', error);
  }
}; 