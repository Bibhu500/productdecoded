import React from 'react';
import {
  Award,
  Clock,
  Star,
  Target,
  Trophy
} from 'lucide-react';

{achievements.map(achievement => (
  <div key={achievement.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
    // ... rest of the achievement rendering code ...
  </div>
))} 