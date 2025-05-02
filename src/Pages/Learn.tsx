import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronDown,
  Brain,
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  Star,
  Clock,
  Award,
  Lock,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { progressService } from '../services/ProgressService';
import { learningContentService, LearningModule } from '../services/LearningContentService';
import ReactMarkdown from 'react-markdown';

// Rest of the Learn component code... 