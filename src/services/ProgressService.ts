import { Achievement, UserStats } from '../components/UserProgress';

export interface ScenarioProgress {
  id: string;
  bestScore: number;
  attempts: number;
  lastAttempt: string;
  timeSpent: number;
  completed: boolean;
}

export interface LessonProgress {
  id: string;
  completed: boolean;
  timeSpent: number;
  lastAccessed: string;
  score?: number;
}

export interface UserProgress {
  scenarios: ScenarioProgress[];
  lessons: LessonProgress[];
  achievements: Achievement[];
  totalTimeSpent: number;
  lastActive: string;
  currentStreak: number;
  longestStreak: number;
  level: number;
  xp: number;
}

private unlockAchievement(achievementId: string): void {
  if (!this.progress.achievements.some(a => a.id === achievementId)) {
    const achievementData: Achievement = {
      id: achievementId,
      title: this.getAchievementTitle(achievementId),
      description: this.getAchievementDescription(achievementId),
      icon: 'trophy',
      points: this.getAchievementPoints(achievementId),
      unlockedAt: new Date().toISOString(),
      progress: 100,
      unlocked: true
    };
    this.progress.achievements.push(achievementData);
    this.saveProgress();
  }
}

private getAchievementTitle(id: string): string {
  const titles: { [key: string]: string } = {
    'first-scenario': 'First Steps',
    'ten-scenarios': 'Seasoned Analyst',
    'perfect-score': 'Perfect Analysis',
    'first-lesson': 'Eager Student',
    'study-master': 'Study Master',
    'reach-level-5': 'Rising Star',
    'reach-level-10': 'RCA Expert'
  };
  return titles[id] || 'Achievement Unlocked';
}

private getAchievementDescription(id: string): string {
  const descriptions: { [key: string]: string } = {
    'first-scenario': 'Complete your first scenario',
    'ten-scenarios': 'Complete 10 scenarios',
    'perfect-score': 'Achieve a perfect score in any scenario',
    'first-lesson': 'Complete your first lesson',
    'study-master': 'Complete 5 lessons',
    'reach-level-5': 'Reached Level 5',
    'reach-level-10': 'Reached Level 10'
  };
  return descriptions[id] || 'Achievement unlocked!';
}

private getAchievementPoints(id: string): number {
  const points: { [key: string]: number } = {
    'first-scenario': 50,
    'ten-scenarios': 100,
    'perfect-score': 150,
    'first-lesson': 30,
    'study-master': 80,
    'reach-level-5': 100,
    'reach-level-10': 200
  };
  return points[id] || 50;
} 