import { Package, Target } from 'lucide-react';

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon component
  requiredLevel?: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz';
  content: string;
  points: number;
  quiz?: Quiz;
}

interface Quiz {
  questions: QuizQuestion[];
  passingScore: number;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const rcaFramework = {
  steps: [
    {
      title: "1. Problem Definition",
      description: "Clearly define the problem, its impact, and scope",
      key_points: [
        "What is the specific issue?",
        "When did it first occur?",
        "What is the impact on users/business?",
        "What systems/processes are affected?"
      ]
    },
    {
      title: "2. Data Collection",
      description: "Gather relevant data and evidence",
      key_points: [
        "Collect metrics and logs",
        "Interview stakeholders",
        "Review documentation",
        "Analyze trends"
      ]
    },
    {
      title: "3. Cause Identification",
      description: "Use techniques to identify potential causes",
      key_points: [
        "Apply 5 Whys technique",
        "Create Fishbone diagram",
        "Map cause-effect relationships",
        "Consider multiple hypotheses"
      ]
    },
    {
      title: "4. Root Cause Analysis",
      description: "Determine the fundamental cause(s)",
      key_points: [
        "Validate causes with data",
        "Test hypotheses",
        "Identify systemic issues",
        "Consider contributing factors"
      ]
    },
    {
      title: "5. Solution Development",
      description: "Develop and prioritize solutions",
      key_points: [
        "Brainstorm potential solutions",
        "Evaluate feasibility",
        "Consider short and long-term fixes",
        "Prioritize based on impact/effort"
      ]
    },
    {
      title: "6. Implementation",
      description: "Execute and monitor solutions",
      key_points: [
        "Create action plan",
        "Assign responsibilities",
        "Set timelines",
        "Monitor effectiveness"
      ]
    },
    {
      title: "7. Prevention",
      description: "Establish measures to prevent recurrence",
      key_points: [
        "Update processes",
        "Implement monitoring",
        "Document lessons learned",
        "Train team members"
      ]
    }
  ]
};

export const learningModules: LearningModule[] = [
  {
    id: 'fundamentals',
    title: 'Product Analysis Fundamentals',
    description: 'Master the core concepts and principles of Product Problem Analysis',
    icon: Package,
    lessons: [
      {
        id: 'intro',
        title: 'Introduction to Product Analysis',
        duration: '15 mins',
        type: 'text',
        content: `
# Introduction to Product Problem Analysis

Product Problem Analysis is a systematic process for identifying the primary source of product issues. As a Product Manager, mastering this approach is crucial for:

- Solving product issues effectively
- Preventing recurring problems
- Making data-driven decisions
- Improving product quality

## What is Product Problem Analysis?

This methodology is more than just problem-solving—it's a structured approach to:
1. Identify what happened
2. Understand why it happened
3. Determine what to do to prevent it from happening again

## Key Principles

1. Focus on systems and processes, not people
2. Look for causes, not symptoms
3. Use data and evidence
4. Consider multiple perspectives
5. Aim for prevention

## When to Use Product Analysis

- Product adoption issues
- User engagement drops
- Feature performance problems
- Quality concerns
- Customer complaints
- System failures

## Benefits of Product Analysis

- Prevents recurring issues
- Saves time and resources
- Improves product quality
- Enhances team learning
- Builds user trust
`,
        points: 50
      },
      {
        id: '5-whys',
        title: 'The 5 Whys Technique',
        duration: '20 mins',
        type: 'text',
        content: `
# The 5 Whys Technique

The 5 Whys is a fundamental RCA technique that helps dig deeper into a problem by repeatedly asking "Why?"

## How it Works

1. Start with the problem statement
2. Ask "Why did this happen?"
3. Take the answer and ask "Why?" again
4. Repeat 3-5 times until you reach the root cause

## Example Analysis

Problem: "User engagement with our new feature dropped by 40%"

1. Why? Users aren't completing the workflow
2. Why? Many users abandon at step 3
3. Why? Step 3 takes too long to load
4. Why? The API call is inefficient
5. Why? The query isn't optimized for large datasets

Root Cause: Inefficient database query design

## Best Practices

1. Be specific with each answer
2. Use data and evidence
3. Avoid assumptions
4. Consider multiple paths
5. Document your analysis

## Common Pitfalls

- Stopping too soon
- Making assumptions
- Focusing on blame
- Ignoring evidence
- Single-path thinking

## When to Use 5 Whys

- Simple to moderate problems
- Clear cause-effect relationships
- Quick analysis needed
- Team brainstorming
`,
        points: 75
      },
      {
        id: 'fishbone',
        title: 'Fishbone Diagram',
        duration: '25 mins',
        type: 'text',
        content: `
# Fishbone (Ishikawa) Diagram

The Fishbone Diagram is a visual tool for identifying potential causes of a problem across different categories.

## Structure

- Problem statement at the "head"
- Major categories as "bones"
- Potential causes as "branches"
- Sub-causes as smaller branches

## Common Categories

1. People
2. Process
3. Technology
4. Environment
5. Materials
6. Methods

## Creating a Fishbone Diagram

1. Define the problem clearly
2. Identify major categories
3. Brainstorm potential causes
4. Organize causes by category
5. Analyze relationships
6. Identify critical factors

## Example: Feature Adoption Issue

Categories and sample causes:

1. People
   - Lack of training
   - Resistance to change
   - Unclear responsibilities

2. Process
   - Complex workflow
   - Missing documentation
   - Unclear requirements

3. Technology
   - Performance issues
   - Integration problems
   - Technical debt

4. Environment
   - Market conditions
   - Competition
   - User context

## Analysis Tips

1. Use data to validate causes
2. Consider interactions
3. Prioritize critical factors
4. Look for patterns
5. Document findings
`,
        points: 100,
        quiz: {
          questions: [
            {
              question: "What is the main purpose of the Fishbone Diagram?",
              options: [
                "To create project timelines",
                "To identify potential causes across categories",
                "To track bug reports",
                "To manage team resources"
              ],
              correctAnswer: 1,
              explanation: "The Fishbone Diagram helps visualize and organize potential causes of a problem across different categories, making it easier to identify root causes."
            }
          ],
          passingScore: 80
        }
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Techniques',
    description: 'Deep dive into sophisticated RCA methodologies',
    icon: Target,
    requiredLevel: 2,
    lessons: [
      {
        id: 'fta',
        title: 'Fault Tree Analysis',
        duration: '30 mins',
        type: 'text',
        content: `
# Fault Tree Analysis (FTA)

FTA is a top-down, deductive failure analysis that breaks down a system failure into its contributing factors.

## Key Concepts

1. Top Event: The main system failure
2. Gates: Logical relationships
3. Basic Events: Root causes
4. Intermediate Events: Sub-failures

## Creating an FTA

1. Define the top event
2. Identify immediate causes
3. Add logical gates
4. Break down further
5. Identify basic events

## Types of Gates

- AND: All inputs required
- OR: Any input sufficient
- XOR: Exclusive conditions
- Priority AND: Sequence matters

## Analysis Process

1. Qualitative Analysis
   - Minimal Cut Sets
   - Common Cause Analysis
   - Importance Analysis

2. Quantitative Analysis
   - Probability Calculations
   - Risk Assessment
   - Reliability Analysis

## Example: Feature Failure

Top Event: "Critical feature unavailable"

Contributing Factors:
1. Server Issues
   - Hardware failure
   - Software crash
   - Network problems

2. Client Issues
   - Browser compatibility
   - Cache problems
   - Version mismatch

## Best Practices

1. Be systematic
2. Use proper symbols
3. Validate logic
4. Consider probabilities
5. Document assumptions
`,
        points: 150
      }
    ]
  }
];

class LearningContentService {
  getModules(): LearningModule[] {
    return learningModules;
  }

  getModule(moduleId: string): LearningModule | undefined {
    return learningModules.find(m => m.id === moduleId);
  }

  getLesson(moduleId: string, lessonId: string): Lesson | undefined {
    const module = this.getModule(moduleId);
    return module?.lessons.find(l => l.id === lessonId);
  }

  getRcaFramework() {
    return rcaFramework;
  }
}

export const learningContentService = new LearningContentService(); 