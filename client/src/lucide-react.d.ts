declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
  }
  
  export type LucideIcon = FC<LucideProps>;
  
  // Export all the icons used in the project
  export const Package: LucideIcon;
  export const Target: LucideIcon;
  export const BookOpen: LucideIcon;
  export const BarChart3: LucideIcon;
  export const Award: LucideIcon;
  export const Clock: LucideIcon;
  export const Flame: LucideIcon;
  export const PlayCircle: LucideIcon;
  export const BookMarked: LucideIcon;
  export const Activity: LucideIcon;
  export const Trophy: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Brain: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const Calculator: LucideIcon;
  export const LogOut: LucideIcon;
  export const User: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Send: LucideIcon;
  export const RefreshCw: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const Star: LucideIcon;
  export const Lock: LucideIcon;
  export const Zap: LucideIcon;
  export const BarChart: LucideIcon;
  export const Users: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Mail: LucideIcon;
  export const Phone: LucideIcon;
  export const MapPin: LucideIcon;
  export const Shield: LucideIcon;
  export const X: LucideIcon;
  export const Compass: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const PieChart: LucideIcon;
  export const Play: LucideIcon;
  export const Calendar: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const ThumbsUp: LucideIcon;
  export const Loader: LucideIcon;
  export const ArrowRight: LucideIcon;
} 