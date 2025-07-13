import { Achievement, UserStats } from '../components/UserProgress';

const STORAGE_KEY = 'rca_user_progress';
const XP_PER_LEVEL = 100;

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

class ProgressService {
  private progress: UserProgress;

  constructor() {
    this.progress = this.loadProgress();
  }

  private loadProgress(): UserProgress {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }

    // Initialize default progress
    return {
      scenarios: [],
      lessons: [],
      achievements: [],
      totalTimeSpent: 0,
      lastActive: new Date().toISOString(),
      currentStreak: 0,
      longestStreak: 0,
      level: 1,
      xp: 0
    };
  }

  private saveProgress(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
  }

  private updateStreak(): void {
    const now = new Date();
    const lastActive = new Date(this.progress.lastActive);
    const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      // Consecutive day
      this.progress.currentStreak++;
      this.progress.longestStreak = Math.max(this.progress.currentStreak, this.progress.longestStreak);
    } else if (daysDiff > 1) {
      // Streak broken
      this.progress.currentStreak = 1;
    }

    this.progress.lastActive = now.toISOString();
    this.saveProgress();
  }

  private addXP(points: number): void {
    this.progress.xp += points;
    const newLevel = Math.floor(this.progress.xp / XP_PER_LEVEL) + 1;
    
    if (newLevel > this.progress.level) {
      this.progress.level = newLevel;
      this.checkLevelAchievements(newLevel);
    }
    
    this.saveProgress();
  }

  private checkLevelAchievements(level: number): void {
    const levelAchievements = [
      {
        level: 5,
        id: 'reach-level-5',
        title: 'Rising Star',
        description: 'Reached Level 5',
        points: 100
      },
      {
        level: 10,
        id: 'reach-level-10',
        title: 'RCA Expert',
        description: 'Reached Level 10',
        points: 200
      }
    ];

    levelAchievements.forEach(achievement => {
      if (level >= achievement.level) {
        this.unlockAchievement(achievement.id);
      }
    });
  }

  updateScenarioProgress(
    scenarioId: string,
    score: number,
    timeSpent: number
  ): void {
    const now = new Date().toISOString();
    const existingProgress = this.progress.scenarios.find(s => s.id === scenarioId);

    if (existingProgress) {
      existingProgress.attempts++;
      existingProgress.timeSpent += timeSpent;
      existingProgress.lastAttempt = now;
      if (score > existingProgress.bestScore) {
        existingProgress.bestScore = score;
        this.addXP(Math.floor(score / 10)); // Award XP for improvement
      }
      // Update completion status based on current best score
      if (!existingProgress.completed && score >= 70) {
        existingProgress.completed = true;
        this.addXP(25); // Bonus XP for first completion
      }
    } else {
      this.progress.scenarios.push({
        id: scenarioId,
        bestScore: score,
        attempts: 1,
        lastAttempt: now,
        timeSpent,
        completed: score >= 70
      });
      this.addXP(10); // Award XP for first attempt
      if (score >= 70) {
        this.addXP(25); // Bonus XP for completion on first try
      }
    }

    this.progress.totalTimeSpent += timeSpent;
    this.updateStreak();
    this.checkScenarioAchievements();
    this.saveProgress();
  }

  updateLessonProgress(
    lessonId: string,
    completed: boolean,
    timeSpent: number,
    score?: number
  ): void {
    const now = new Date().toISOString();
    const existingProgress = this.progress.lessons.find(l => l.id === lessonId);

    if (existingProgress) {
      existingProgress.timeSpent += timeSpent;
      existingProgress.lastAccessed = now;
      if (completed && !existingProgress.completed) {
        existingProgress.completed = true;
        existingProgress.score = score;
        this.addXP(20); // Award XP for completion
      }
    } else {
      this.progress.lessons.push({
        id: lessonId,
        completed,
        timeSpent,
        lastAccessed: now,
        score
      });
      if (completed) {
        this.addXP(20); // Award XP for completion
      }
    }

    this.progress.totalTimeSpent += timeSpent;
    this.updateStreak();
    this.checkLessonAchievements();
    this.saveProgress();
  }

  private checkScenarioAchievements(): void {
    const completedScenarios = this.progress.scenarios.filter(s => s.completed).length;
    const perfectScores = this.progress.scenarios.filter(s => s.bestScore === 100).length;

    const scenarioAchievements = [
      {
        id: 'first-scenario',
        condition: completedScenarios >= 1,
        title: 'First Steps',
        description: 'Complete your first scenario',
        points: 50
      },
      {
        id: 'ten-scenarios',
        condition: completedScenarios >= 10,
        title: 'Seasoned Analyst',
        description: 'Complete 10 scenarios',
        points: 100
      },
      {
        id: 'perfect-score',
        condition: perfectScores >= 1,
        title: 'Perfect Analysis',
        description: 'Achieve a perfect score in any scenario',
        points: 150
      }
    ];

    scenarioAchievements.forEach(achievement => {
      if (achievement.condition) {
        this.unlockAchievement(achievement.id);
      }
    });
  }

  private checkLessonAchievements(): void {
    const completedLessons = this.progress.lessons.filter(l => l.completed).length;

    const lessonAchievements = [
      {
        id: 'first-lesson',
        condition: completedLessons >= 1,
        title: 'Eager Student',
        description: 'Complete your first lesson',
        points: 30
      },
      {
        id: 'study-master',
        condition: completedLessons >= 5,
        title: 'Study Master',
        description: 'Complete 5 lessons',
        points: 80
      }
    ];

    lessonAchievements.forEach(achievement => {
      if (achievement.condition) {
        this.unlockAchievement(achievement.id);
      }
    });
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

  getStats(): UserStats {
    const completedScenarios = this.progress.scenarios.filter(s => s.completed).length;
    const totalScores = this.progress.scenarios.reduce((sum, s) => sum + s.bestScore, 0);
    const averageScore = this.progress.scenarios.length > 0
      ? Math.round(totalScores / this.progress.scenarios.length)
      : 0;

    return {
      totalPoints: this.progress.xp,
      level: this.progress.level,
      scenariosCompleted: completedScenarios,
      averageScore,
      timeSpent: this.formatTime(this.progress.totalTimeSpent),
      currentStreak: this.progress.currentStreak,
      achievements: this.progress.achievements
    };
  }

  private formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }

  getScenarioProgress(scenarioId: string): ScenarioProgress | undefined {
    return this.progress.scenarios.find(s => s.id === scenarioId);
  }

  getLessonProgress(lessonId: string): LessonProgress | undefined {
    return this.progress.lessons.find(l => l.id === lessonId);
  }

  // Get detailed analytics for dashboard
  getDetailedAnalytics() {
    const completedLessons = this.progress.lessons.filter(l => l.completed).length;
    const completedScenarios = this.progress.scenarios.filter(s => s.completed).length;
    const totalAttempts = this.progress.scenarios.reduce((sum, s) => sum + s.attempts, 0);
    const averageScore = this.progress.scenarios.length > 0 
      ? this.progress.scenarios.reduce((sum, s) => sum + s.bestScore, 0) / this.progress.scenarios.length 
      : 0;

    return {
      completedLessons,
      completedScenarios,
      totalAttempts,
      averageScore: Math.round(averageScore),
      totalTimeSpent: this.progress.totalTimeSpent,
      currentStreak: this.progress.currentStreak,
      longestStreak: this.progress.longestStreak,
      level: this.progress.level,
      xp: this.progress.xp,
      achievements: this.progress.achievements
    };
  }

  // Get next recommended lesson
  getNextRecommendedLesson() {
    // This could be enhanced with ML recommendations
    // For now, return the first incomplete lesson
    const incompleteLessons = this.progress.lessons.filter(l => !l.completed);
    if (incompleteLessons.length > 0) {
      return incompleteLessons[0];
    }
    return null;
  }

  // Get learning streak information
  getStreakInfo() {
    const today = new Date();
    const lastActive = new Date(this.progress.lastActive);
    const daysSinceActive = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      currentStreak: this.progress.currentStreak,
      longestStreak: this.progress.longestStreak,
      daysSinceActive,
      streakAtRisk: daysSinceActive >= 1
    };
  }
}

export const progressService = new ProgressService(); 