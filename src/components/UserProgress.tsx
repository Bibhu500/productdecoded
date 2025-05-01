import React from 'react';
import {
  Star,
  Award,
  Clock,
  CheckCircle,
  Target
} from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt: string;
  progress: number;
  unlocked: boolean;
}

export interface UserStats {
  totalPoints: number;
  level: number;
  scenariosCompleted: number;
  averageScore: number;
  timeSpent: string;
  currentStreak: number;
  achievements: Achievement[];
}

// ... existing code ... 