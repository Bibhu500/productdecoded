import { 
  Brain, 
  Target, 
  Activity, 
  Users, 
  AlertTriangle, 
  BarChart3, 
  Star, 
  Award, 
  CheckCircle, 
  Trophy 
} from 'lucide-react';

export interface LearningPage {
  id: string;
  title: string;
  content: string;
  duration: string;
  type: 'theory' | 'example' | 'exercise' | 'quiz' | 'visual';
  points: number;
}

export interface RcaLearningModule {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  duration: string;
  pages: LearningPage[];
  objectives: string[];
  keyTakeaways: string[];
  practiceExercises: string[];
}

export const rcaLearningModules: RcaLearningModule[] = [
  {
    id: 'module-1',
    title: 'Introduction to Root Cause Analysis',
    description: 'Understand what RCA is, when to use it, and its role in product and operational problem-solving.',
    icon: Brain,
    color: 'from-blue-500 to-blue-600',
    duration: '45 mins',
    objectives: [
      'Define Root Cause Analysis and its importance in product management',
      'Identify when to use RCA vs other problem-solving methods',
      'Understand the difference between symptoms, causes, and root causes',
      'Learn the 5-Step RCA Thinking Process'
    ],
    keyTakeaways: [
      'RCA is about finding the fundamental reason behind problems',
      'Symptoms are what you see, causes are what happened, root causes are why it happened',
      'RCA prevents problems from recurring',
      'Use RCA for complex, recurring, or high-impact problems'
    ],
    practiceExercises: [
      'Identify symptoms vs causes in 5 product scenarios',
      'Apply the 5-Step RCA process to a simple problem',
      'Evaluate when RCA is appropriate vs other methods'
    ],
    pages: [
      {
        id: 'page-1',
        title: 'What is Root Cause Analysis?',
        duration: '10 mins',
        type: 'theory',
        points: 20,
        content: `# What is Root Cause Analysis?

## Definition
Root Cause Analysis (RCA) is a systematic process for identifying the fundamental reason behind a problem, failure, or undesired outcome. It's not just about fixing the immediate issue, but understanding why it happened in the first place.

## The RCA Mindset
Think of RCA like being a detective. When a crime happens, you don't just arrest the first person you see running away. You investigate:
- What happened? (The incident)
- How did it happen? (The sequence of events)
- Why did it happen? (The underlying causes)

## Real-World Example: Netflix's 2008 Outage
In 2008, Netflix experienced a major service outage that affected millions of users. Let's see how RCA thinking works:

**Symptom:** Users couldn't stream videos
**Immediate Cause:** Database server crashed
**Root Cause:** Database wasn't designed to handle peak holiday traffic surge

**Without RCA:** Just restart the server → Problem happens again during next peak
**With RCA:** Redesign database architecture → Problem solved permanently

## Key Principles of RCA
1. **Focus on Systems, Not People** - "The system allowed this to happen"
2. **Look for Causes, Not Blame** - "What conditions led to this?"
3. **Use Evidence, Not Assumptions** - "Show me the data"
4. **Prevent, Don't Just Fix** - "How do we stop this from happening again?"

## Why RCA Matters for Product Managers
- **Prevents Recurring Issues:** Fix the root, not just the symptom
- **Saves Resources:** Less time firefighting, more time building
- **Improves User Experience:** Fewer bugs and issues
- **Builds Trust:** Shows you're proactive, not reactive
- **Drives Innovation:** Understanding failures leads to better solutions`
      },
      {
        id: 'page-2',
        title: 'When to Use RCA - The Decision Framework',
        duration: '8 mins',
        type: 'theory',
        points: 15,
        content: `# When to Use RCA - The Decision Framework

## The RCA Decision Matrix

| Problem Type | Use RCA? | Why? | Alternative |
|-------------|----------|------|-------------|
| **High Impact** (Revenue/User loss) | ✅ Yes | Must prevent recurrence | - |
| **Recurring Issues** | ✅ Yes | Breaking the cycle | - |
| **Complex Problems** | ✅ Yes | Multiple interconnected causes | - |
| **One-time Simple Issues** | ❌ No | Not worth the effort | Quick fix |
| **Urgent Fires** | ⚠️ Later | Fix first, analyze later | Immediate action |

## Common Product Management Scenarios

### ✅ **Perfect for RCA:**
1. **User Engagement Drop**: Monthly active users decreased 15% over 2 weeks
2. **Feature Adoption Issues**: New feature has <10% adoption after 3 months
3. **Conversion Funnel Problems**: Sign-up conversion dropped from 12% to 8%
4. **System Reliability**: App crashes increased 300% after latest release
5. **Customer Satisfaction**: NPS score dropped from 8.2 to 6.1

### ❌ **Not Suitable for RCA:**
1. **Minor UI Bugs**: Button color is slightly off
2. **One-time Issues**: Single user reported login problem
3. **Expected Variations**: Seasonal dips in usage
4. **Immediate Emergencies**: Server is down right now
5. **Preference Decisions**: Should we use blue or green?

## The "WORTH" Framework
Before starting RCA, ask:
- **W**ill this problem recur?
- **O**utcome: Is the impact significant?
- **R**esources: Do we have time/people for proper analysis?
- **T**ime-sensitive: Can we afford to analyze?
- **H**igh-stakes: Are there serious consequences?

If 3+ answers are "Yes", proceed with RCA.

## Real Example: Spotify's Discover Weekly
**Problem:** Users weren't engaging with Discover Weekly playlists
**RCA Decision:** ✅ Yes - High impact on user retention and engagement
**Result:** Discovered users didn't understand the playlist updated weekly
**Solution:** Added clear messaging about weekly updates
**Impact:** 40% increase in playlist engagement`
      },
      {
        id: 'page-3',
        title: 'Symptoms vs Causes vs Root Causes',
        duration: '12 mins',
        type: 'example',
        points: 25,
        content: `# Symptoms vs Causes vs Root Causes

## The Three Levels of Problems

### 🔍 **Symptoms** (What you observe)
- Observable effects or outcomes
- What users/stakeholders complain about
- Metrics that are trending badly
- The "pain" everyone feels

### ⚡ **Causes** (What happened)
- Events or conditions that led to symptoms
- The "how" of the problem
- Usually multiple causes for one symptom
- The sequence of events

### 🎯 **Root Causes** (Why it happened)
- The fundamental reason behind the causes
- The "why" of the problem
- Usually one primary root cause
- The source that, if fixed, prevents recurrence

## Real-World Case Study: Airbnb's Search Problem

### **The Scenario:**
In 2012, Airbnb noticed a significant drop in bookings in major cities.

### **Level 1: Symptoms**
- 25% decrease in bookings in NYC, SF, LA
- User complaints about "no good options"
- Increased bounce rate from search results
- Hosts reporting fewer inquiries

### **Level 2: Causes**
- Search results showing poor quality listings first
- High-quality listings buried on page 2+
- Slow loading times for search results
- Mobile search experience was poor

### **Level 3: Root Cause**
- Search algorithm prioritized newest listings over quality
- No quality scoring system for listings
- Technical team focused on speed over relevance

### **The Solution:**
- Redesigned search algorithm to prioritize quality
- Implemented host quality scoring
- Created better mobile search experience

### **Result:**
- 30% increase in bookings within 3 months
- Improved user satisfaction scores
- Better host engagement

## Another Example: Instagram Stories Launch

### **The Scenario:**
Instagram Stories had lower adoption than expected in first month.

### **Symptoms:**
- Only 15% of users tried Stories
- Low daily active Stories users
- Users confused about feature location
- Engagement metrics below projections

### **Causes:**
- Stories icon wasn't prominent enough
- Users didn't understand the concept
- No onboarding tutorial
- Feature felt separate from main feed

### **Root Cause:**
- Product team assumed users would understand Stories concept
- No user research on discoverability
- Feature design didn't align with user mental model

### **Solution:**
- Added prominent Stories bar at top of feed
- Created interactive onboarding tutorial
- Integrated Stories more naturally into user flow

## Practice Exercise: Uber's Rating System

**Scenario:** Uber noticed that driver ratings were consistently high (4.8+) but passenger complaints were increasing.

**Your Task:** Identify what might be symptoms, causes, and root causes:

**Symptoms:**
- Driver ratings averaging 4.8/5
- Increasing passenger complaints
- Customer service tickets rising
- Some drivers avoiding certain areas

**Causes:**
- Passengers afraid to give low ratings
- Rating system happens after ride completion
- No feedback mechanism for specific issues
- Drivers can see who rated them low

**Root Cause:**
- Rating system designed for sellers (like eBay) not service workers
- No anonymity protection for passengers
- Fear of retaliation prevents honest feedback

This layered approach helps you avoid solving symptoms while root causes persist.`
      },
      {
        id: 'page-4',
        title: 'The 5-Step RCA Process',
        duration: '10 mins',
        type: 'theory',
        points: 20,
        content: `# The 5-Step RCA Process

## The Universal RCA Framework

Every effective RCA follows these five steps, regardless of the specific method used:

### **Step 1: Define the Problem** 🎯
- What exactly happened?
- When did it happen?
- Who was affected?
- What's the impact?

### **Step 2: Collect Data** 📊
- Gather quantitative metrics
- Collect qualitative feedback
- Document timeline of events
- Interview stakeholders

### **Step 3: Identify Possible Causes** 🔍
- Brainstorm potential causes
- Map cause-and-effect relationships
- Use structured methods (5 Whys, Fishbone)
- Avoid jumping to conclusions

### **Step 4: Determine Root Cause** 🎯
- Test hypotheses with data
- Verify causes with evidence
- Distinguish root causes from symptoms
- Ensure cause-effect relationship

### **Step 5: Implement Solutions** 🛠️
- Design preventive measures
- Create action plans
- Implement changes
- Monitor effectiveness

## Real Example: Slack's Notification Problem

Let's walk through how Slack might have analyzed their notification overwhelm issue:

### **Step 1: Define the Problem**
- **What:** Users complaining about too many notifications
- **When:** Increased complaints over 3 months
- **Who:** 40% of active users
- **Impact:** 15% increase in notification disabling

### **Step 2: Collect Data**
- **Metrics:** Average 50 notifications/day per user
- **Feedback:** "Too noisy," "Can't focus," "Missing important messages"
- **Timeline:** Problem started after adding @channel features
- **Interviews:** Users want control, not elimination

### **Step 3: Identify Possible Causes**
- Default notification settings too aggressive
- Users don't know how to customize settings
- No priority/importance filtering
- @channel feature overused
- Mobile and desktop notifications duplicated

### **Step 4: Determine Root Cause**
**Data showed:** 80% of users never changed default settings
**Root Cause:** Default notification settings optimized for engagement, not productivity

### **Step 5: Implement Solutions**
- **Immediate:** Better default settings
- **Medium-term:** Notification customization wizard
- **Long-term:** Smart notification filtering
- **Result:** 30% reduction in complaints, 25% fewer disabled notifications

## Common Pitfalls to Avoid

### ❌ **Rushing to Solutions**
"We need to fix this now!" leads to symptom fixing

### ❌ **Stopping at First Cause**
"The server crashed" isn't the root cause

### ❌ **Blame-Focused Thinking**
"Sarah made a mistake" doesn't prevent recurrence

### ❌ **Assumption-Based Analysis**
"I think users want..." without data

### ❌ **Single-Cause Thinking**
Most problems have multiple contributing factors

## Tips for Success

### ✅ **Be Patient and Thorough**
Good RCA takes time - don't rush the process

### ✅ **Use Multiple Perspectives**
Get input from different team members and stakeholders

### ✅ **Document Everything**
Keep detailed records of your analysis

### ✅ **Focus on Systems**
Look for process and system improvements

### ✅ **Test Your Theories**
Validate causes with data before implementing solutions`
      },
      {
        id: 'page-5',
        title: 'RCA in Action - Case Study Analysis',
        duration: '15 mins',
        type: 'example',
        points: 30,
        content: `# RCA in Action - Case Study Analysis

## Case Study: WhatsApp's New Year's Eve Outage

### **Background**
On New Year's Eve 2014, WhatsApp experienced a global outage lasting 4 hours during peak messaging time.

### **The 5-Step Analysis**

#### **Step 1: Define the Problem**
- **What:** Complete service outage - no messages sending/receiving
- **When:** December 31, 2014, 6 PM - 10 PM GMT
- **Who:** 600 million users globally affected
- **Impact:** 
  - 4 hours of downtime
  - Peak holiday messaging disrupted
  - Massive user frustration
  - Significant revenue loss

#### **Step 2: Collect Data**
- **Server logs:** Memory usage spiked to 100% at 6 PM
- **Traffic patterns:** 50% higher than normal peak
- **User feedback:** "Messages not sending," "App keeps crashing"
- **Timeline:** Problems started exactly when Europe entered New Year
- **Infrastructure:** Database connections maxed out

#### **Step 3: Identify Possible Causes**
- **Traffic surge:** New Year's messaging spike
- **Server capacity:** Not enough servers for peak load
- **Database limits:** Connection pool exhausted
- **Memory leaks:** Potential software bugs
- **Network issues:** ISP or CDN problems
- **DDoS attack:** Malicious traffic

#### **Step 4: Determine Root Cause**
**Investigation Results:**
- Traffic was 50% higher than expected (contributing factor)
- Database connection pool limit reached (immediate cause)
- **ROOT CAUSE:** Capacity planning didn't account for synchronized global events

**Evidence:**
- Previous New Year's had 30% spike, this year had 50%
- Database configuration hadn't been updated for user growth
- No load testing for "synchronized global events"

#### **Step 5: Implement Solutions**
**Immediate (within 24 hours):**
- Increased database connection limits
- Added emergency server capacity

**Short-term (within 1 month):**
- Implemented predictive load balancing
- Created "event-based" capacity planning

**Long-term (within 6 months):**
- Built auto-scaling infrastructure
- Developed real-time capacity monitoring
- Created "global event" playbook

### **Results**
- No major outages during subsequent New Year's
- 99.9% uptime achieved
- Capacity planning became industry standard

## Practice Exercise: Analyze This Scenario

### **Scenario: Food Delivery App Crisis**

**Background:** FoodFast, a popular food delivery app, experienced a 40% drop in orders during their "Free Delivery Friday" promotion.

**Initial Observations:**
- Promotion launched at 12 PM
- Orders dropped from 1,000/hour to 600/hour
- Customer complaints about "app not working"
- Delivery drivers reporting no orders
- Restaurant partners confused about promotion

**Your Task:** Apply the 5-Step RCA Process

#### **Step 1: Define the Problem**
Write your problem definition:
- What:
- When:
- Who:
- Impact:

#### **Step 2: What Data Would You Collect?**
List 5 data sources you'd investigate:
1. _______________
2. _______________
3. _______________
4. _______________
5. _______________

#### **Step 3: Brainstorm Possible Causes**
Think of at least 6 potential causes:
1. _______________
2. _______________
3. _______________
4. _______________
5. _______________
6. _______________

#### **Step 4: Which Would You Test First?**
Rank your hypotheses and explain your reasoning:
_______________

#### **Step 5: What Solutions Would You Implement?**
Design immediate and long-term solutions:
_______________

### **Key Lessons from This Module**
1. **RCA is systematic** - Follow the process, don't skip steps
2. **Data drives decisions** - Verify causes with evidence
3. **Root causes are often systemic** - Look beyond immediate triggers
4. **Solutions must prevent recurrence** - Fix the system, not just the symptom
5. **Documentation is crucial** - Learn from each RCA for future reference

**Next Module Preview:** We'll dive deep into problem identification and framing - the foundation of effective RCA.`
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Problem Identification and Problem Framing',
    description: 'Learn to define and frame the problem properly before jumping to causes.',
    icon: Target,
    color: 'from-purple-500 to-purple-600',
    duration: '50 mins',
    objectives: [
      'Master the art of problem framing and definition',
      'Use the "Is / Is Not" Matrix effectively',
      'Create clear problem hypotheses',
      'Avoid confirmation bias in problem analysis',
      'Define proper scope for RCA investigations'
    ],
    keyTakeaways: [
      'A well-defined problem is half solved',
      'Scope definition prevents analysis paralysis',
      'Problem framing affects solution quality',
      'Is/Is Not Matrix clarifies boundaries'
    ],
    practiceExercises: [
      'Frame 3 vague problems into precise RCA questions',
      'Create Is/Is Not matrices for complex scenarios',
      'Practice scope definition exercises'
    ],
    pages: [
      {
        id: 'page-1',
        title: 'The Art of Problem Framing',
        duration: '12 mins',
        type: 'theory',
        points: 25,
        content: `# The Art of Problem Framing

## Why Problem Framing Matters

"A problem well-defined is a problem half-solved." - Charles Kettering

Problem framing is the foundation of effective RCA. Get it wrong, and you'll spend weeks solving the wrong problem. Get it right, and the solution often becomes obvious.

## The Difference Between Good and Bad Problem Framing

### ❌ **Poor Problem Framing:**
- "Our app is slow"
- "Users don't like our product"
- "Sales are down"
- "The team is not performing well"

### ✅ **Good Problem Framing:**
- "App loading time increased from 2.1s to 4.3s for iOS users in the past 2 weeks"
- "User retention dropped 15% for new signups after onboarding redesign"
- "Enterprise sales decreased 30% in Q3 compared to Q2, specifically for mid-market accounts"
- "Code review cycle time increased from 2 days to 5 days after team expansion"

## The Problem Framing Framework

### **1. Specificity - The WHAT**
Transform vague complaints into precise definitions:
- **Vague:** "Customers are unhappy"
- **Specific:** "Customer satisfaction score dropped from 4.2 to 3.6 for premium users"

### **2. Scope - The WHERE/WHO**
Define clear boundaries:
- **Too Broad:** "All users are experiencing issues"
- **Right Scope:** "iOS users on version 2.1+ in North America"

### **3. Timeline - The WHEN**
Establish clear timeframes:
- **Vague:** "Recently we've seen problems"
- **Specific:** "Issues started September 15th and peaked on September 22nd"

### **4. Impact - The WHY IT MATTERS**
Quantify the significance:
- **Vague:** "This is a big problem"
- **Specific:** "Resulting in $50K weekly revenue loss and 200 user churn"

## Real-World Example: Airbnb's Search Problem

### **Initial Vague Problem:**
"Users can't find good places to stay"

### **Proper Problem Framing:**
"Search result relevance score decreased from 85% to 67% for weekend bookings in major cities (NYC, LA, SF) over the past 6 weeks, resulting in 12% increase in zero-booking searches and 8% decrease in booking conversion rate."

### **Why This Works:**
- **Specific:** Relevance score with exact numbers
- **Scoped:** Weekend bookings in specific cities
- **Timeline:** Past 6 weeks
- **Impact:** Quantified business metrics

## The Problem Statement Template

Use this template for consistent problem framing:

**"[METRIC/OUTCOME] changed from [BASELINE] to [CURRENT STATE] for [SPECIFIC SEGMENT] during [TIME PERIOD], resulting in [BUSINESS IMPACT] and affecting [STAKEHOLDERS]."**

### **Examples:**

**E-commerce:**
"Add-to-cart conversion rate decreased from 23% to 18% for mobile users on product pages during the last 3 weeks, resulting in $15K weekly revenue loss and affecting 45% of our customer base."

**SaaS Product:**
"Daily active users dropped from 12,000 to 9,500 for freemium accounts using the dashboard feature over the past month, resulting in lower upgrade rates and affecting our Q4 revenue targets."

**Social Media:**
"Average session duration decreased from 18 minutes to 12 minutes for users aged 18-24 on the mobile app since the UI refresh 2 weeks ago, resulting in 20% lower ad engagement and affecting advertiser satisfaction."

## Common Problem Framing Mistakes

### **1. The Symptom Trap**
❌ **Wrong:** "Our server keeps crashing"
✅ **Right:** "Application response time increased 300% during peak hours"

### **2. The Blame Frame**
❌ **Wrong:** "The engineering team delivered buggy code"
✅ **Right:** "Bug reports increased 150% in the week following the latest release"

### **3. The Solution Bias**
❌ **Wrong:** "We need to redesign the UI"
✅ **Right:** "User task completion rate dropped from 78% to 62% after the interface update"

### **4. The Everything Problem**
❌ **Wrong:** "The entire product experience is broken"
✅ **Right:** "User onboarding completion rate decreased from 85% to 65% for new mobile signups"

## Tools for Better Problem Framing

### **The 5W1H Framework:**
- **What** happened?
- **When** did it happen?
- **Where** did it happen?
- **Who** was affected?
- **Why** does it matter?
- **How** are we measuring it?

### **The Problem Framing Checklist:**
✅ Is the problem statement specific and measurable?
✅ Are the boundaries clearly defined?
✅ Is the timeframe explicit?
✅ Is the business impact quantified?
✅ Can someone else understand the problem without context?
✅ Does it focus on outcomes, not solutions?

## Practice Exercise: Frame These Problems

Transform these vague problems into well-framed problem statements:

1. **Vague:** "Our email campaigns aren't working"
   **Your Frame:** ________________

2. **Vague:** "The new feature is confusing"
   **Your Frame:** ________________

3. **Vague:** "Customers are complaining about delivery"
   **Your Frame:** ________________

**Remember:** A well-framed problem guides your entire RCA process. Invest time here to save time later.`
      },
      {
        id: 'page-2',
        title: 'The "Is / Is Not" Matrix',
        duration: '10 mins',
        type: 'theory',
        points: 20,
        content: `# The "Is / Is Not" Matrix

## What is the Is/Is Not Matrix?

The Is/Is Not Matrix is a powerful tool for defining problem boundaries. It helps you clarify what's included and excluded from your investigation, preventing scope creep and ensuring focused analysis.

## The Matrix Structure

| Dimension | IS (Included) | IS NOT (Excluded) |
|-----------|---------------|-------------------|
| **What** | What problems are you investigating? | What problems are you NOT investigating? |
| **Where** | Which locations, systems, or components? | Which are NOT affected? |
| **When** | What time periods, events, or conditions? | What times are NOT relevant? |
| **Who** | Which users, customers, or stakeholders? | Which groups are NOT affected? |
| **How Much** | What's the extent or severity? | What severity levels are NOT relevant? |

## Real-World Example: Netflix Streaming Quality Issue

### **Problem Statement:**
"Video streaming quality decreased for mobile users during evening hours, resulting in increased buffering and user complaints."

### **Is/Is Not Matrix:**

| Dimension | IS | IS NOT |
|-----------|----|---------| 
| **What** | • Video buffering during playback • Reduced video resolution • Loading delays | • Audio quality issues • Login problems • Subscription billing issues |
| **Where** | • Mobile apps (iOS/Android) • Home WiFi networks • North American servers | • Desktop/TV apps • Cellular networks • International servers |
| **When** | • Evening hours (6-10 PM) • Weekdays and weekends • Started 2 weeks ago | • Morning/afternoon hours • Business hours • Issues before 2 weeks ago |
| **Who** | • Mobile app users • Residential customers • All subscription tiers | • Desktop users • Business customers • Specific geographic regions |
| **How Much** | • Buffering every 2-3 minutes • Quality drops to 480p • Affects 25% of mobile users | • Occasional buffering • Quality above 720p • Affects less than 5% of users |

## Benefits of Using Is/Is Not Matrix

### **1. Prevents Scope Creep**
Without clear boundaries, your RCA can expand to investigate everything, making it ineffective.

### **2. Identifies Patterns**
Comparing what IS and ISN'T affected often reveals important clues about root causes.

### **3. Focuses Resources**
Team knows exactly what to investigate and what to ignore.

### **4. Challenges Assumptions**
Forces you to explicitly state what you're assuming is relevant.

## Another Example: E-commerce Checkout Problem

### **Problem Statement:**
"Checkout conversion rate dropped from 28% to 22% for first-time visitors, resulting in $30K weekly revenue loss."

### **Is/Is Not Matrix:**

| Dimension | IS | IS NOT |
|-----------|----|---------| 
| **What** | • Checkout abandonment • Payment processing failures • Form completion issues | • Product page issues • Search functionality • Account creation problems |
| **Where** | • Checkout pages • Payment forms • Desktop and mobile | • Product catalog • Shopping cart • Help/support pages |
| **When** | • Last 3 weeks • All times of day • Both weekdays/weekends | • Before 3 weeks ago • Specific time periods • Seasonal variations |
| **Who** | • First-time visitors • All geographic regions • All device types | • Returning customers • Specific countries • Specific browsers only |
| **How Much** | • 6% conversion drop • $30K weekly impact • 15% increase in abandonment | • Minor fluctuations • Small revenue impact • Normal abandonment rates |

## How to Create an Effective Is/Is Not Matrix

### **Step 1: Start with Your Problem Statement**
Use your well-framed problem statement as the foundation.

### **Step 2: Brainstorm Each Dimension**
For each dimension (What, Where, When, Who, How Much), list everything that might be relevant.

### **Step 3: Categorize Ruthlessly**
Move items to either IS or IS NOT. Avoid "maybe" or "sometimes."

### **Step 4: Look for Patterns**
Compare the IS and IS NOT columns. Do you see patterns that suggest causes?

### **Step 5: Validate with Data**
Use data to confirm your IS/IS NOT assumptions.

## Common Mistakes to Avoid

### **❌ Being Too Inclusive**
"Everything might be related" leads to unfocused analysis.

### **❌ Making Assumptions**
"We know this isn't relevant" without checking data.

### **❌ Static Thinking**
Not updating the matrix as you learn more.

### **❌ Ignoring the "Is Not" Column**
The excluded items are often as important as included ones.

## Practice Exercise: Create Your Matrix

**Scenario:** "Mobile app crash rate increased from 0.5% to 2.1% for Android users after the latest update, affecting user engagement and app store ratings."

Create an Is/Is Not matrix for this problem:

| Dimension | IS | IS NOT |
|-----------|----|---------| 
| **What** | ________________ | ________________ |
| **Where** | ________________ | ________________ |
| **When** | ________________ | ________________ |
| **Who** | ________________ | ________________ |
| **How Much** | ________________ | ________________ |

**Pro Tip:** The Is/Is Not matrix is a living document. Update it as you gather more information and refine your understanding of the problem.`
      },
      {
        id: 'page-3',
        title: 'Creating Problem Hypotheses',
        duration: '12 mins',
        type: 'theory',
        points: 25,
        content: `# Creating Problem Hypotheses

## What is a Problem Hypothesis?

A problem hypothesis is an educated guess about what might be causing your problem. It's a testable statement that guides your investigation and helps you focus your data collection efforts.

## The Hypothesis Framework

### **Good Hypothesis Structure:**
"If [CAUSE] is true, then we should see [OBSERVABLE EVIDENCE] in [SPECIFIC LOCATION/TIME]."

### **Example:**
"If the checkout page redesign is causing conversion drop, then we should see higher abandonment rates specifically on the payment step for users who reached checkout after the redesign launch."

## Types of Problem Hypotheses

### **1. Technical Hypotheses**
Focus on system, infrastructure, or code issues:
- "If the database connection pool is exhausted, then we should see increased response times during peak traffic hours"
- "If the mobile app crashes are due to memory leaks, then we should see increasing memory usage over time in crash reports"

### **2. User Experience Hypotheses**
Focus on user behavior and interface issues:
- "If the new onboarding flow is confusing, then we should see higher drop-off rates at specific steps and increased support tickets about getting started"
- "If the search function is not meeting user expectations, then we should see increased use of filters and higher bounce rates from search results"

### **3. Business Process Hypotheses**
Focus on operational or workflow issues:
- "If the approval process is causing delays, then we should see longer time-to-completion for requests that require multiple approvals"
- "If inadequate training is causing quality issues, then we should see higher error rates from newer team members"

## Real-World Example: Spotify's Discover Weekly

### **Problem Statement:**
"Discover Weekly playlist engagement dropped 20% over 6 weeks, with users skipping more songs and saving fewer tracks."

### **Hypothesis Generation:**

#### **Hypothesis 1: Algorithm Changes**
"If recent algorithm updates are reducing music relevance, then we should see:
- Higher skip rates within first 30 seconds of songs
- Lower 'thumbs up' ratings on recommended tracks
- Decreased correlation between user listening history and recommended songs"

#### **Hypothesis 2: Music Catalog Issues**
"If music licensing changes reduced available tracks, then we should see:
- Increased repetition of songs across different users' playlists
- Higher percentage of songs from smaller/indie labels
- User complaints about missing familiar artists"

#### **Hypothesis 3: User Behavior Changes**
"If users' music preferences are shifting, then we should see:
- Changes in overall listening patterns across the platform
- Similar engagement drops in other algorithmic playlists
- Generational differences in engagement patterns"

#### **Hypothesis 4: Technical Issues**
"If playlist generation system has bugs, then we should see:
- Inconsistent playlist lengths or duplicate songs
- Error logs from the recommendation engine
- Correlation between engagement drops and system deployments"

## How to Generate Strong Hypotheses

### **1. Use Multiple Perspectives**
- **Technical:** What could go wrong with systems?
- **User:** What might confuse or frustrate users?
- **Business:** What process changes might cause issues?
- **External:** What outside factors might influence the problem?

### **2. Apply the "Five Whys" Mindset**
For each potential cause, ask "Why might this happen?"

### **3. Consider Timing**
What changed around the time the problem started?

### **4. Look at Analogous Problems**
Have you seen similar issues before? What caused them?

### **5. Involve Your Team**
Different team members will have different perspectives and expertise.

## Hypothesis Prioritization Matrix

Once you have multiple hypotheses, prioritize them using this matrix:

| Hypothesis | Likelihood (1-10) | Impact if True (1-10) | Ease to Test (1-10) | Priority Score |
|------------|-------------------|----------------------|-------------------|----------------|
| Algorithm changes | 8 | 9 | 7 | 8.0 |
| Music catalog issues | 6 | 7 | 9 | 7.3 |
| User behavior changes | 4 | 8 | 6 | 6.0 |
| Technical issues | 7 | 6 | 8 | 7.0 |

**Priority Score = (Likelihood + Impact + Ease to Test) / 3**

## Testing Your Hypotheses

### **Quantitative Testing:**
- **Metrics analysis:** Look for supporting data
- **A/B testing:** Compare different conditions
- **Correlation analysis:** Find relationships between variables
- **Time series analysis:** Identify patterns over time

### **Qualitative Testing:**
- **User interviews:** Understand user perspectives
- **Support ticket analysis:** Look for complaint patterns
- **Team interviews:** Gather internal insights
- **Observational studies:** Watch user behavior

## Common Hypothesis Mistakes

### **❌ Confirmation Bias**
Only looking for evidence that supports your favorite hypothesis.

### **❌ Single Hypothesis Thinking**
Focusing on one cause instead of considering multiple possibilities.

### **❌ Untestable Hypotheses**
Creating hypotheses that can't be validated with available data.

### **❌ Solution-Oriented Hypotheses**
Starting with a solution and working backwards to find a cause.

## Practice Exercise: Generate Hypotheses

**Scenario:** "Customer support ticket volume increased 150% in the past 2 weeks, with most tickets related to 'account access issues' and 'payment problems'."

Generate 4 hypotheses using different perspectives:

1. **Technical Hypothesis:**
   "If ________________, then we should see ________________"

2. **User Experience Hypothesis:**
   "If ________________, then we should see ________________"

3. **Business Process Hypothesis:**
   "If ________________, then we should see ________________"

4. **External Factor Hypothesis:**
   "If ________________, then we should see ________________"

**Next Steps:** Once you have solid hypotheses, you're ready to collect data systematically to test them. Remember: the goal is to find the truth, not to prove your favorite theory right.`
      },
      {
        id: 'page-4',
        title: 'Avoiding Confirmation Bias',
        duration: '8 mins',
        type: 'theory',
        points: 15,
        content: `# Avoiding Confirmation Bias

## What is Confirmation Bias?

Confirmation bias is the tendency to search for, interpret, and remember information that confirms our pre-existing beliefs while ignoring contradictory evidence. In RCA, this can lead to:

- Selecting data that supports your initial hypothesis
- Ignoring evidence that points to other causes
- Stopping investigation once you find supporting evidence
- Interpreting ambiguous data as confirmation

## Why Confirmation Bias is Dangerous in RCA

### **Real Example: Knight Capital's $440M Loss**

In 2012, Knight Capital deployed new software that began making erratic trades, losing $440 million in 45 minutes.

**Initial Hypothesis:** "It's just a temporary glitch"
**Confirmation Bias:** Team focused on normal trading patterns, ignored alarms
**Result:** Delayed response, massive losses
**Actual Cause:** Software bug that should have been caught immediately

### **The Cost of Confirmation Bias:**
- **Wrong Solutions:** Fixing symptoms instead of root causes
- **Recurring Problems:** Issues come back because real cause wasn't addressed
- **Wasted Resources:** Time and money spent on ineffective fixes
- **Lost Trust:** Stakeholders lose confidence in your analysis

## Common Confirmation Bias Traps in RCA

### **1. The Favorite Hypothesis Trap**
You have a theory you really believe in, so you:
- Look only for supporting evidence
- Dismiss contradictory data as "outliers"
- Stop investigating once you find some support

### **2. The Expertise Trap**
"I've seen this before" leads to:
- Assuming same cause as previous similar issues
- Not considering new factors or changes
- Relying on past experience over current data

### **3. The Pressure Trap**
Under time pressure, you:
- Go with the first plausible explanation
- Skip thorough investigation
- Choose easier-to-fix causes over harder ones

### **4. The Team Groupthink Trap**
When everyone agrees too quickly:
- Alternative viewpoints get suppressed
- Dissenting voices are ignored
- Group reinforces each other's biases

## Strategies to Avoid Confirmation Bias

### **1. Use the Devil's Advocate Method**
For each hypothesis, actively argue against it:
- "What evidence would disprove this theory?"
- "What are the weaknesses in this explanation?"
- "What alternative explanations exist?"

### **2. Seek Disconfirming Evidence**
Actively look for data that contradicts your hypothesis:
- "What would we see if this hypothesis was wrong?"
- "Where can we find evidence against this theory?"
- "What data contradicts our current thinking?"

### **3. Use Multiple Perspectives**
Include diverse viewpoints in your analysis:
- Technical team member
- User experience specialist
- Business stakeholder
- External consultant or fresh eyes

### **4. Structured Hypothesis Testing**
Create formal tests for each hypothesis:
- Define what success/failure looks like
- Set specific metrics to measure
- Establish criteria for accepting/rejecting hypotheses

## Case Study: Instagram's Engagement Drop

### **Scenario:**
Instagram noticed a 15% drop in daily engagement after introducing a new feature.

### **Initial Hypothesis (Biased):**
"Users need time to adapt to the new feature"

### **Confirmation Bias Signs:**
- Team focused on positive feedback about the feature
- Ignored metrics showing decreased usage
- Explained away negative data as "temporary adjustment"

### **Bias-Free Approach:**
1. **Multiple Hypotheses:**
   - Feature is genuinely confusing
   - Feature competes with existing behaviors
   - Technical issues with feature implementation
   - Users actually don't want this feature

2. **Disconfirming Evidence:**
   - User research showing confusion
   - Support tickets about the feature
   - Usage data showing avoidance patterns
   - Comparison with similar feature launches

3. **Structured Testing:**
   - A/B test with feature on/off
   - User interviews about feature experience
   - Detailed analytics on feature usage patterns
   - Competitive analysis of similar features

### **Result:**
Found that feature was technically sound but poorly positioned in the UI, causing users to accidentally trigger it and become frustrated.

## Practical Tools for Bias Prevention

### **The Pre-Mortem Technique**
Before starting investigation, ask:
"If our analysis turns out to be wrong, what would be the most likely reasons?"

### **The Red Team Approach**
Assign someone to challenge every conclusion:
- "What if we're wrong about this?"
- "What evidence contradicts this finding?"
- "What are we not considering?"

### **The Evidence Inventory**
For each hypothesis, create columns:
- Evidence FOR
- Evidence AGAINST
- Evidence NEUTRAL/UNCLEAR

### **The Assumption Audit**
List all assumptions and actively test them:
- "We assume users understand the feature"
- "We assume the problem started with the recent release"
- "We assume the issue affects all user segments equally"

## Practice Exercise: Bias Detection

**Scenario:** Your team is investigating why mobile app ratings dropped from 4.2 to 3.1 stars after a major update.

**Team's Initial Hypothesis:** "Users are just resistant to change; they'll adapt"

**Identify the bias risks:**
1. What type of confirmation bias is this?
2. What evidence might the team ignore?
3. How would you restructure the investigation?

**Your Analysis:**
1. Bias Type: ________________
2. Ignored Evidence: ________________
3. Better Approach: ________________

**Remember:** The goal of RCA is to find the truth, not to prove you were right. Stay curious, stay skeptical, and let the data guide your conclusions.`
      },
      {
        id: 'page-5',
        title: 'Defining Scope - Customer, System, Metric, Feature',
        duration: '8 mins',
        type: 'theory',
        points: 15,
        content: `# Defining Scope - Customer, System, Metric, Feature

## Why Scope Definition Matters

Scope definition is like drawing a map before a journey. Without clear boundaries, your RCA can become:
- **Too broad:** Analysis paralysis, never-ending investigation
- **Too narrow:** Missing important interconnected causes
- **Misdirected:** Focusing on wrong areas while real issues persist

## The CSMF Framework

Define scope across four critical dimensions:

### **C - Customer Scope**
Who is affected by the problem?

### **S - System Scope** 
What systems, components, or processes are involved?

### **M - Metric Scope**
What specific metrics or outcomes are we analyzing?

### **F - Feature Scope**
What features, functions, or capabilities are in scope?

## Real-World Example: Airbnb's Booking Problem

### **Problem Statement:**
"Booking conversion rate decreased 12% in the past month"

### **CSMF Scope Definition:**

#### **Customer Scope (C):**
- **In Scope:** 
  - First-time bookers
  - Desktop users
  - North American users
  - Stays 1-7 nights
- **Out of Scope:**
  - Repeat customers
  - Mobile app users
  - International users
  - Extended stays (>7 nights)

#### **System Scope (S):**
- **In Scope:**
  - Booking flow pages
  - Payment processing system
  - Search and filtering
  - Host communication tools
- **Out of Scope:**
  - User registration system
  - Host onboarding process
  - Review and rating system
  - Mobile app architecture

#### **Metric Scope (M):**
- **In Scope:**
  - Booking conversion rate
  - Booking abandonment rate
  - Time-to-complete booking
  - Payment success rate
- **Out of Scope:**
  - User acquisition metrics
  - Host satisfaction scores
  - Search ranking performance
  - Customer lifetime value

#### **Feature Scope (F):**
- **In Scope:**
  - Property search and filters
  - Booking request process
  - Payment and checkout
  - Host-guest messaging
- **Out of Scope:**
  - User profile management
  - Property listing creation
  - Review writing system
  - Wishlist functionality

## How to Define Effective Scope

### **1. Start with Impact Analysis**
Map the problem to affected areas:
- Which customers report the issue?
- What systems show anomalies?
- Which metrics are declining?
- What features are involved?

### **2. Use the 80/20 Rule**
Focus on the 20% of scope that likely contains 80% of the root cause.

### **3. Consider Interconnections**
Some boundaries may need to be expanded if systems are highly connected.

### **4. Time-box Your Investigation**
Set clear deadlines for each scope area to prevent endless analysis.

## Scope Definition Template

Use this template for consistent scope definition:

\`\`\`
Problem: [Your problem statement]

CUSTOMER SCOPE:
✅ Included: 
- [Customer segment 1]
- [Customer segment 2]
❌ Excluded:
- [Customer segment 3]
- [Customer segment 4]

SYSTEM SCOPE:
✅ Included:
- [System/component 1]
- [System/component 2]
❌ Excluded:
- [System/component 3]
- [System/component 4]

METRIC SCOPE:
✅ Included:
- [Metric 1]
- [Metric 2]
❌ Excluded:
- [Metric 3]
- [Metric 4]

FEATURE SCOPE:
✅ Included:
- [Feature 1]
- [Feature 2]
❌ Excluded:
- [Feature 3]
- [Feature 4]
\`\`\`

## Common Scoping Mistakes

### **❌ Scope Creep**
Starting with bookings, then expanding to search, then to user acquisition...

### **❌ Artificial Boundaries**
Excluding interconnected systems that might be causing the issue.

### **❌ Metric Confusion**
Mixing leading and lagging indicators in the same analysis.

### **❌ One-Size-Fits-All**
Using the same scope for different types of problems.

## Practice Exercise: Define Scope

**Scenario:** "E-commerce mobile app saw 25% decrease in purchase completion rate for electronics category over the past 2 weeks."

Define the CSMF scope:

**Customer Scope:**
- Included: ________________
- Excluded: ________________

**System Scope:**
- Included: ________________
- Excluded: ________________

**Metric Scope:**
- Included: ________________
- Excluded: ________________

**Feature Scope:**
- Included: ________________
- Excluded: ________________

**Pro Tips:**
1. **Document your scope decisions** - Include reasoning for future reference
2. **Review scope regularly** - Adjust as you learn more about the problem
3. **Communicate scope clearly** - Ensure all team members understand boundaries
4. **Don't be afraid to expand** - If evidence points outside scope, adjust accordingly

**Next Module Preview:** Now that you have a well-framed problem and clear scope, it's time to systematically collect and analyze the data that will lead you to the root cause.`
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Data Collection & Signals Exploration',
    description: 'Learn what data to look at and how to gather useful context quickly.',
    icon: Activity,
    color: 'from-green-500 to-green-600',
    duration: '40 mins',
    objectives: ['Master quantitative vs qualitative data collection', 'Build effective event timelines', 'Identify deviation points in metrics', 'Use analytics tools for RCA'],
    keyTakeaways: ['Data drives RCA decisions', 'Look for deviation points', 'Combine quantitative and qualitative signals'],
    practiceExercises: ['Analyze metrics dashboard', 'Create event timeline', 'Interview stakeholders'],
    pages: [
      {
        id: 'page-1',
        title: 'Types of Data: Quantitative vs Qualitative',
        duration: '10 mins',
        type: 'theory',
        points: 20,
        content: `# Types of Data: Quantitative vs Qualitative

## Quantitative Data
- **Metrics & Numbers**: User counts, conversion rates, response times
- **Analytics Tools**: Google Analytics, Mixpanel, internal dashboards
- **Logs & System Data**: Server logs, database queries, API calls

## Qualitative Data  
- **User Feedback**: Support tickets, surveys, reviews
- **Interviews**: Customer interviews, team discussions
- **Observations**: User behavior, workflow analysis

## Example: E-commerce Checkout Issue
**Quantitative**: 15% drop in checkout completion, 300ms increase in page load time
**Qualitative**: Users complaining "payment button doesn't work", support tickets about timeouts`
      },
      {
        id: 'page-2',
        title: 'Event Timelines and Incident Logs',
        duration: '10 mins',
        type: 'example',
        points: 20,
        content: `# Event Timelines and Incident Logs

## Building Effective Timelines
1. **Start with the problem occurrence**
2. **Work backwards to find patterns**
3. **Include deployments, changes, external events**
4. **Note both technical and business events**

## Example: Spotify Outage Timeline
- **2:00 PM**: Normal service operation
- **2:15 PM**: New recommendation algorithm deployed
- **2:30 PM**: First user complaints about slow loading
- **2:45 PM**: 50% increase in server response time
- **3:00 PM**: Service degradation widespread
- **3:15 PM**: Rollback initiated
- **3:30 PM**: Service restored

**Root Cause**: Algorithm consumed excessive database resources`
      },
      {
        id: 'page-3',
        title: 'Identifying Deviation Points',
        duration: '8 mins',
        type: 'theory',
        points: 15,
        content: `# Identifying Deviation Points

## What Are Deviation Points?
Moments when metrics change from normal patterns

## Common Deviation Patterns
- **Sudden drops/spikes**: Immediate changes
- **Gradual trends**: Slow degradation over time  
- **Cyclical changes**: Regular patterns broken

## Tools for Detection
- **Google Analytics**: Traffic and conversion changes
- **Mixpanel**: User behavior tracking
- **SQL queries**: Database performance metrics
- **Custom dashboards**: Business-specific KPIs`
      },
      {
        id: 'page-4',
        title: 'User Feedback and System Signals',
        duration: '12 mins',
        type: 'example',
        points: 25,
        content: `# User Feedback and System Signals

## Collecting User Feedback
- **Support tickets**: Direct problem reports
- **App store reviews**: Public user sentiment
- **User interviews**: Detailed problem context
- **Social media**: Real-time user reactions

## System Signals
- **Error rates**: Application and server errors
- **Performance metrics**: Response times, throughput
- **Infrastructure alerts**: CPU, memory, disk usage
- **Third-party service status**: External dependencies

## Case Study: Instagram Feed Loading Issue
**User Signals**: "Feed won't load", "App keeps crashing"
**System Signals**: 300% increase in API timeouts, database connection pool exhausted
**Root Cause**: Database query optimization needed for new feed algorithm`
      }
    ]
  },
  {
    id: 'module-4',
    title: 'The "5 Whys" Method',
    description: 'Master the most popular RCA framework.',
    icon: AlertTriangle,
    color: 'from-red-500 to-red-600',
    duration: '35 mins',
    objectives: ['Master the 5 Whys technique', 'Avoid common mistakes', 'Build effective why trees'],
    keyTakeaways: ['Ask why 5 times minimum', 'Focus on systems not people', 'Verify each why with data'],
    practiceExercises: ['Practice 5 Whys on 3 scenarios', 'Build why trees', 'Validate assumptions'],
    pages: [
      {
        id: 'page-1',
        title: 'The Origin of 5 Whys (Toyota)',
        duration: '8 mins',
        type: 'theory',
        points: 15,
        content: `# The Origin of 5 Whys (Toyota)

## Toyota Production System
Developed by Toyota for manufacturing quality control

## The Basic Process
1. **State the problem**
2. **Ask "Why did this happen?"**
3. **Ask "Why?" for each answer**
4. **Continue until root cause found**
5. **Implement solution**

## Example: Car Won't Start
1. **Problem**: Car won't start
2. **Why?** Battery is dead
3. **Why?** Alternator not charging
4. **Why?** Alternator belt broken
5. **Why?** Belt exceeded service life
6. **Why?** Car not maintained per schedule
**Root Cause**: Lack of preventive maintenance`
      },
      {
        id: 'page-2',
        title: 'Rules to Apply 5 Whys Effectively',
        duration: '10 mins',
        type: 'theory',
        points: 20,
        content: `# Rules to Apply 5 Whys Effectively

## Rule 1: Focus on Systems, Not People
❌ **Wrong**: "John made a mistake"
✅ **Right**: "The process allowed errors to occur"

## Rule 2: Use Data to Verify Each Why
Each answer should be backed by evidence

## Rule 3: Don't Stop at 5
Continue until you find the true root cause

## Rule 4: Involve the Right People
Include those who understand the system

## Rule 5: Document Everything
Keep detailed records of the analysis`
      },
      {
        id: 'page-3',
        title: 'Common Mistakes People Make',
        duration: '10 mins',
        type: 'example',
        points: 20,
        content: `# Common Mistakes People Make

## Mistake 1: Stopping Too Early
**Problem**: Website crashed
**Why?** Server overloaded
**STOP** ❌ (This is a symptom, not root cause)

## Mistake 2: Jumping to Solutions
**Problem**: Low user engagement
**Why?** Users don't like the new feature
**Solution**: Remove the feature ❌
**Better**: Continue asking why users don't like it

## Mistake 3: Blame Focus
**Why?** Sarah deployed buggy code ❌
**Better**: Why did buggy code reach production?

## Mistake 4: Single Path Thinking
Problems often have multiple contributing factors`
      },
      {
        id: 'page-4',
        title: '5 Whys Tree Building',
        duration: '7 mins',
        type: 'visual',
        points: 15,
        content: `# 5 Whys Tree Building

## Tree Structure
When multiple answers exist for one "why", create branches

## Example: E-commerce Conversion Drop
**Problem**: Checkout conversion dropped 20%

**Why?** Users abandon at payment step
├── **Why?** Payment form is confusing
│   └── **Why?** New design launched without testing
├── **Why?** Payment processing is slow  
│   └── **Why?** Third-party payment service degraded
└── **Why?** Mobile experience is poor
    └── **Why?** Mobile testing was inadequate

**Multiple Root Causes Identified**:
- Insufficient UX testing process
- Lack of third-party monitoring
- Mobile testing gaps`
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Fishbone / Ishikawa Diagrams',
    description: 'Learn to use visual cause-mapping for clarity.',
    icon: BarChart3,
    color: 'from-orange-500 to-orange-600',
    duration: '40 mins',
    objectives: ['Build fishbone diagrams', 'Use 6M categories', 'Adapt for product/tech issues'],
    keyTakeaways: ['Visual mapping reveals patterns', '6M framework provides structure', 'Great for team collaboration'],
    practiceExercises: ['Create fishbone for app crash', 'Use 6M categories', 'Team brainstorming session'],
    pages: [
      {
        id: 'page-1',
        title: 'Building a Fishbone Diagram',
        duration: '12 mins',
        type: 'visual',
        points: 25,
        content: `# Building a Fishbone Diagram

## What Is a Fishbone Diagram?
Visual tool that maps potential causes of a problem

## Structure
- **Head**: The problem/effect
- **Spine**: Main horizontal line
- **Bones**: Category branches
- **Sub-bones**: Specific causes

## Step-by-Step Process
1. **Define the problem** (write at fish head)
2. **Identify main categories** (major bones)
3. **Brainstorm causes** for each category
4. **Add sub-causes** (smaller bones)
5. **Analyze and prioritize** potential causes

## Visual Example: Website Performance Issue
\`\`\`
Methods     Machines     Materials
    |           |           |
    |           |           |
    └───────────┴───────────┘
                │
         Slow Website ←── (Problem)
                │
    ┌───────────┴───────────┐
    |           |           |
    |           |           |
Measurements  Mother Nature  Manpower
\`\`\`
`
      },
      {
        id: 'page-2',
        title: '6M Categories: Methods, Machines, Materials, etc.',
        duration: '10 mins',
        type: 'theory',
        points: 20,
        content: `# 6M Categories

## The 6M Framework
1. **Methods**: Processes, procedures, workflows
2. **Machines**: Equipment, tools, technology
3. **Materials**: Resources, inputs, data
4. **Measurements**: Metrics, monitoring, feedback
5. **Mother Nature**: Environment, external factors
6. **Manpower**: People, skills, training

## Example: Mobile App Crashes
**Methods**: Development process, testing procedures
**Machines**: Servers, mobile devices, development tools
**Materials**: Code libraries, third-party APIs, data
**Measurements**: Error tracking, performance monitoring
**Mother Nature**: OS updates, network conditions
**Manpower**: Developer experience, QA coverage`
      },
      {
        id: 'page-3',
        title: 'Adapting Fishbone to Product/Tech',
        duration: '10 mins',
        type: 'example',
        points: 20,
        content: `# Adapting Fishbone to Product/Tech

## Tech-Specific Categories
- **Code**: Bugs, logic errors, architecture
- **Infrastructure**: Servers, databases, networks
- **Data**: Quality, availability, processing
- **Users**: Behavior, expectations, feedback
- **Process**: Development, testing, deployment
- **External**: Third-party services, market changes

## Product Management Categories
- **User Experience**: Design, usability, flow
- **Business Logic**: Requirements, features, priorities
- **Technical**: Performance, scalability, reliability
- **Market**: Competition, trends, regulations
- **Team**: Skills, communication, resources
- **Strategy**: Vision, roadmap, metrics`
      },
      {
        id: 'page-4',
        title: 'Cause Clustering and Theme Finding',
        duration: '8 mins',
        type: 'exercise',
        points: 15,
        content: `# Cause Clustering and Theme Finding

## After Creating the Fishbone
1. **Group similar causes** together
2. **Identify common themes** across categories
3. **Prioritize high-impact causes**
4. **Look for root cause patterns**

## Example: User Retention Drop
**Common Themes Identified**:
- **Onboarding Issues**: Poor first-time experience
- **Performance Problems**: Slow loading across features
- **Communication Gaps**: Users don't understand value
- **Technical Debt**: Multiple systems affected

**Next Steps**: Prioritize themes by impact and feasibility`
      }
    ]
  },
  {
    id: 'module-6',
    title: 'RCA in Product & Metrics',
    description: 'RCA on product failures, growth drops, or conversion rate issues.',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    duration: '45 mins',
    objectives: ['Analyze metric drops', 'Use funnel analysis', 'Detect cohort issues'],
    keyTakeaways: ['Metrics tell stories', 'Funnels reveal bottlenecks', 'Cohorts show patterns'],
    practiceExercises: ['RCA on sign-up drop', 'Funnel analysis', 'Cohort comparison'],
    pages: [
      {
        id: 'page-1',
        title: 'Metric RCA: DAU, Retention, NPS Drop',
        duration: '12 mins',
        type: 'theory',
        points: 25,
        content: `# Metric RCA: DAU, Retention, NPS Drop

## Common Product Metrics Issues
- **DAU (Daily Active Users)**: Sudden or gradual decline
- **Retention**: Users not returning after first use
- **NPS (Net Promoter Score)**: Satisfaction dropping
- **Conversion**: Sign-ups, purchases, upgrades declining

## RCA Approach for Metrics
1. **Identify the deviation**: When did it start?
2. **Segment the data**: Which user groups affected?
3. **Correlate with events**: What changed around that time?
4. **Analyze user journey**: Where in the funnel?
5. **Validate with qualitative data**: Why are users leaving?

## Example: Slack DAU Drop
**Problem**: DAU dropped 15% over 2 weeks
**Segmentation**: New users primarily affected
**Correlation**: Onboarding flow redesigned
**Root Cause**: New flow too complex, users abandoned`
      },
      {
        id: 'page-2',
        title: 'Funnel Analysis as Diagnostic Tool',
        duration: '10 mins',
        type: 'example',
        points: 20,
        content: `# Funnel Analysis as Diagnostic Tool

## What Is Funnel Analysis?
Track user progression through key steps

## Common Product Funnels
- **Acquisition**: Landing → Sign-up → Activation
- **Engagement**: Login → Feature Use → Value Realization
- **Conversion**: Trial → Payment → Subscription
- **Retention**: Usage → Habit Formation → Renewal

## Example: SaaS Trial-to-Paid Conversion
**Step 1**: Trial sign-up (1000 users)
**Step 2**: First login (800 users) - 20% drop
**Step 3**: Feature usage (600 users) - 25% drop
**Step 4**: Value realization (400 users) - 33% drop
**Step 5**: Upgrade to paid (120 users) - 70% drop ⚠️

**Analysis**: Biggest drop at upgrade step suggests pricing or value communication issue`
      },
      {
        id: 'page-3',
        title: 'Cohort-based Issue Detection',
        duration: '10 mins',
        type: 'visual',
        points: 20,
        content: `# Cohort-based Issue Detection

## What Are Cohorts?
Groups of users with shared characteristics or timeline

## Common Cohort Types
- **Time-based**: Users who signed up in same month
- **Feature-based**: Users who used specific feature
- **Source-based**: Users from same acquisition channel
- **Behavior-based**: Users with similar usage patterns

## Example: Mobile App Retention Issue
**Week 1 Cohort**: 90% retention after 7 days
**Week 2 Cohort**: 85% retention after 7 days
**Week 3 Cohort**: 70% retention after 7 days
**Week 4 Cohort**: 65% retention after 7 days

**Analysis**: Declining retention suggests product degradation or competition`
      },
      {
        id: 'page-4',
        title: 'Activity: RCA of Sign-up Drop in SaaS',
        duration: '13 mins',
        type: 'exercise',
        points: 30,
        content: `# Activity: RCA of Sign-up Drop in SaaS

## Scenario
Your SaaS product experienced a 30% drop in sign-ups over the past month.

## Given Data
- **Total sign-ups**: Dropped from 1000/month to 700/month
- **Traffic**: Remained stable at 10,000 monthly visitors
- **Conversion rate**: Dropped from 10% to 7%
- **Top traffic sources**: Google (50%), Social (30%), Direct (20%)

## Your RCA Process
1. **Segment the data** by traffic source
2. **Analyze the conversion funnel**
3. **Check for external factors**
4. **Validate with user feedback**

## Potential Findings
- Google traffic converting poorly due to SEO changes
- Sign-up form redesign created friction
- Competitor launched aggressive campaign
- Pricing change announced affected conversions`
      }
    ]
  },
  {
    id: 'module-7',
    title: 'RCA in Technology & Engineering',
    description: 'Apply RCA to technical incidents and bugs.',
    icon: Star,
    color: 'from-teal-500 to-teal-600',
    duration: '40 mins',
    objectives: ['Analyze downtime incidents', 'Use logs for debugging', 'Create blameless postmortems'],
    keyTakeaways: ['Logs tell the story', 'Systems thinking over blame', 'Prevention over fixes'],
    practiceExercises: ['Analyze server outage', 'Review deployment issue', 'Write postmortem'],
    pages: [
      {
        id: 'page-1',
        title: 'RCA for Downtime or Latency',
        duration: '12 mins',
        type: 'theory',
        points: 25,
        content: `# RCA for Downtime or Latency

## Common Technical Issues
- **Service downtime**: Complete service unavailability
- **Performance degradation**: Slow response times
- **Intermittent failures**: Sporadic issues
- **Data corruption**: Incorrect or lost data

## Technical RCA Process
1. **Establish timeline**: When did issues start?
2. **Collect logs**: Application, server, database logs
3. **Analyze metrics**: CPU, memory, network, disk usage
4. **Review recent changes**: Deployments, configurations
5. **Test hypotheses**: Reproduce issues in staging

## Example: E-commerce Site Crash
**Timeline**: 2 PM - site became unresponsive
**Logs**: Database connection pool exhausted
**Metrics**: Database CPU at 100%
**Recent changes**: New feature deployed 1 PM
**Root cause**: Inefficient database query in new feature`
      },
      {
        id: 'page-2',
        title: 'Log and Alert-based Debugging',
        duration: '10 mins',
        type: 'example',
        points: 20,
        content: `# Log and Alert-based Debugging

## Types of Logs
- **Application logs**: Business logic errors
- **System logs**: OS and infrastructure events
- **Database logs**: Query performance, errors
- **Network logs**: Traffic, connectivity issues

## Alert Analysis
- **Error rate spikes**: Sudden increase in failures
- **Performance degradation**: Response time increases
- **Resource exhaustion**: Memory, CPU, disk alerts
- **Dependency failures**: Third-party service issues

## Example: API Response Time Issue
**Alert**: API response time increased 300%
**Application logs**: Database query timeouts
**Database logs**: Lock contention on user table
**System logs**: Memory usage normal
**Root cause**: Database index missing after schema change`
      },
      {
        id: 'page-3',
        title: 'Postmortems and Blameless RCA Culture',
        duration: '10 mins',
        type: 'theory',
        points: 20,
        content: `# Postmortems and Blameless RCA Culture

## What Is a Blameless Postmortem?
Focus on systems and processes, not individual blame

## Key Principles
1. **Assume good intentions**: People tried to do the right thing
2. **Focus on learning**: What can we improve?
3. **System thinking**: How did the system allow this?
4. **Psychological safety**: Encourage honest reporting

## Postmortem Template
**What happened?** Brief incident summary
**Impact:** Who was affected and how?
**Root cause:** Why did this happen?
**Timeline:** Detailed sequence of events
**Action items:** What will we change?
**Lessons learned:** Key takeaways`
      },
      {
        id: 'page-4',
        title: 'Using RCA for Tech Debt & Scalability',
        duration: '8 mins',
        type: 'exercise',
        points: 15,
        content: `# Using RCA for Tech Debt & Scalability

## Tech Debt RCA
**Problem**: Development velocity decreasing
**Why?** More time spent fixing bugs
**Why?** Code quality degrading
**Why?** Pressure to deliver features quickly
**Why?** No time allocated for refactoring
**Root cause**: Process doesn't balance feature delivery with code quality

## Scalability RCA
**Problem**: System can't handle increased load
**Why?** Database becomes bottleneck
**Why?** Queries not optimized for scale
**Why?** Performance testing inadequate
**Why?** Load testing not part of deployment process
**Root cause**: Lack of performance validation in development lifecycle`
      }
    ]
  },
  {
    id: 'module-8',
    title: 'Structured RCA Frameworks & Trees',
    description: 'Explore advanced RCA tools and logic trees.',
    icon: Award,
    color: 'from-indigo-500 to-indigo-600',
    duration: '35 mins',
    objectives: ['Build logic trees', 'Use fault tree analysis', 'Combine multiple RCA tools'],
    keyTakeaways: ['Logic trees provide structure', 'Fault trees show failure paths', 'Hybrid approaches work best'],
    practiceExercises: ['Create logic tree', 'Build fault tree', 'Combine 5 Whys with trees'],
    pages: [
      {
        id: 'page-1',
        title: 'Cause-effect Logic Trees',
        duration: '10 mins',
        type: 'visual',
        points: 20,
        content: `# Cause-effect Logic Trees

## What Are Logic Trees?
Structured breakdown of potential causes using logical relationships

## Tree Structure
- **Root**: Main problem
- **Branches**: Potential cause categories
- **Leaves**: Specific root causes

## Example: User Churn Increase
**Problem**: Monthly churn increased 25%
├── **Product Issues**
│   ├── Performance degradation
│   ├── Bug in key feature
│   └── Competitor launched better product
├── **User Experience**
│   ├── Onboarding confusion
│   ├── Support response time increased
│   └── Pricing change announced
└── **External Factors**
    ├── Economic downturn
    ├── Industry regulation change
    └── Seasonal pattern`
      },
      {
        id: 'page-2',
        title: 'Fault Tree Analysis',
        duration: '10 mins',
        type: 'theory',
        points: 20,
        content: `# Fault Tree Analysis

## What Is Fault Tree Analysis?
Top-down approach showing how failures can occur

## Key Concepts
- **Top event**: The undesired outcome
- **Gates**: AND/OR logical operators
- **Basic events**: Root causes that can't be broken down further

## Example: Payment System Failure
**Top Event**: Payment processing fails
**AND Gate**: All conditions must be true
**OR Gate**: Any condition can trigger failure

**Structure**:
Payment Fails (Top Event)
├── **OR Gate**
│   ├── Database unavailable
│   ├── Network timeout
│   └── Third-party service down
└── **AND Gate**
    ├── High traffic volume
    └── Insufficient server capacity`
      },
      {
        id: 'page-3',
        title: 'Hybrid RCA: 5 Whys + Trees + Data',
        duration: '15 mins',
        type: 'example',
        points: 30,
        content: `# Hybrid RCA: 5 Whys + Trees + Data

## Combining Multiple Methods
Use strengths of different approaches together

## Hybrid Process
1. **Start with data analysis**: Identify patterns
2. **Use logic trees**: Structure potential causes
3. **Apply 5 Whys**: Deep dive into promising branches
4. **Validate with fishbone**: Ensure comprehensive coverage

## Example: E-commerce Conversion Drop
**Step 1 - Data**: 20% conversion drop, mobile users affected most
**Step 2 - Logic Tree**: Mobile experience issues identified
**Step 3 - 5 Whys**: 
- Why mobile conversion low? 
- Checkout form difficult
- Why difficult? 
- Small buttons, hard to tap
- Why small? 
- Designer used desktop specs
- Why? 
- No mobile-specific design review
- Why? 
- Process gap in design workflow
**Step 4 - Fishbone**: Confirmed process and training gaps`
      }
    ]
  },
  {
    id: 'module-9',
    title: 'Communicating & Presenting RCA',
    description: 'Learn how to present RCA findings in interviews, reports, or stakeholder updates.',
    icon: CheckCircle,
    color: 'from-pink-500 to-pink-600',
    duration: '30 mins',
    objectives: ['Structure RCA presentations', 'Write blameless reports', 'Handle stakeholder questions'],
    keyTakeaways: ['Tell a story with data', 'Focus on solutions', 'Make it actionable'],
    practiceExercises: ['Create 3-slide presentation', 'Write postmortem report', 'Practice stakeholder communication'],
    pages: [
      {
        id: 'page-1',
        title: 'RCA Storytelling',
        duration: '8 mins',
        type: 'theory',
        points: 15,
        content: `# RCA Storytelling

## Structure Your Story
1. **Setting**: What was the normal state?
2. **Inciting incident**: What problem occurred?
3. **Investigation**: How did you analyze it?
4. **Discovery**: What did you find?
5. **Resolution**: What actions will you take?

## Example Story Arc
**Setting**: "Our mobile app had stable 4.2-star rating"
**Incident**: "Last week, ratings dropped to 3.1 stars"
**Investigation**: "We analyzed user feedback and crash logs"
**Discovery**: "New feature caused memory leaks on older devices"
**Resolution**: "We'll optimize the code and improve device testing"`
      },
      {
        id: 'page-2',
        title: 'Presentation Structure',
        duration: '10 mins',
        type: 'visual',
        points: 20,
        content: `# Presentation Structure

## 3-Slide Format
**Slide 1: Problem & Impact**
- Clear problem statement
- Business impact quantified
- Timeline of events

**Slide 2: Root Cause Analysis**
- Investigation methodology
- Key findings with data
- Root cause identification

**Slide 3: Action Plan**
- Immediate fixes
- Long-term improvements
- Prevention measures
- Timeline and ownership

## Example: Netflix Streaming Issue
**Slide 1**: "Video quality degraded for 2M users during peak hours"
**Slide 2**: "CDN capacity insufficient for new encoding algorithm"
**Slide 3**: "Scale CDN capacity + optimize algorithm + improve monitoring"`
      },
      {
        id: 'page-3',
        title: 'Writing Blameless Postmortems',
        duration: '12 mins',
        type: 'exercise',
        points: 25,
        content: `# Writing Blameless Postmortems

## Key Elements
- **Objective tone**: Focus on facts, not blame
- **Clear timeline**: Sequence of events
- **Root cause focus**: Systems and processes
- **Actionable outcomes**: Specific improvements

## Template Structure
**Executive Summary**: Brief overview
**Impact**: What was affected
**Root Cause**: Why it happened
**Timeline**: Detailed sequence
**Action Items**: What will change
**Lessons Learned**: Key takeaways

## Example Excerpt
❌ **Blame-focused**: "John deployed buggy code"
✅ **Blameless**: "Deployment process allowed untested code to reach production"

**Action Item**: "Implement mandatory code review and automated testing"`
      }
    ]
  },
  {
    id: 'module-10',
    title: 'Practicing with RCA Scenarios (Capstone)',
    description: 'Apply everything to real, ambiguous product/tech/business cases.',
    icon: Trophy,
    color: 'from-yellow-500 to-yellow-600',
    duration: '60 mins',
    objectives: ['Apply all RCA methods', 'Handle ambiguous scenarios', 'Present findings professionally'],
    keyTakeaways: ['Practice makes perfect', 'Real scenarios are complex', 'Multiple valid solutions exist'],
    practiceExercises: ['Solve 5 full case studies', 'Present solutions', 'Peer review analysis'],
    pages: [
      {
        id: 'page-1',
        title: 'Case Study 1: DAU Dropped 20% Overnight',
        duration: '15 mins',
        type: 'exercise',
        points: 30,
        content: `# Case Study 1: DAU Dropped 20% Overnight

## Scenario
Your social media app experienced a sudden 20% drop in Daily Active Users overnight.

## Given Information
- **Normal DAU**: 1 million users
- **Current DAU**: 800,000 users
- **Geographic**: Global issue
- **Platform**: Both iOS and Android affected
- **Time**: Started at 3 AM PST

## Your Investigation
Apply the RCA methods you've learned:
1. **Data Collection**: What data would you gather?
2. **Timeline Analysis**: What events to investigate?
3. **Hypothesis Generation**: What could cause this?
4. **5 Whys**: Deep dive into top hypothesis
5. **Validation**: How would you confirm root cause?

## Potential Causes to Explore
- Server infrastructure issues
- App store policy changes
- Competitor actions
- Algorithm changes
- External events`
      },
      {
        id: 'page-2',
        title: 'Case Study 2: Feature Launch Failed to Gain Traction',
        duration: '12 mins',
        type: 'exercise',
        points: 25,
        content: `# Case Study 2: Feature Launch Failed to Gain Traction

## Scenario
Your team launched a new "Stories" feature 6 weeks ago. Adoption is only 5% despite projections of 30%.

## Given Information
- **Target users**: 18-35 age group
- **Feature placement**: Prominent in main feed
- **Technical metrics**: No performance issues
- **User feedback**: Mixed reactions
- **Competitor**: Instagram Stories at 60% adoption

## Your RCA Process
1. **Problem Framing**: Define the adoption issue clearly
2. **Data Segmentation**: Analyze by user demographics
3. **User Journey Analysis**: Where do users drop off?
4. **Qualitative Research**: Why aren't users engaging?
5. **Fishbone Analysis**: Map all potential causes

## Questions to Answer
- Is it a discovery problem or engagement problem?
- Are users trying it once and not returning?
- Is the feature solving a real user need?`
      },
      {
        id: 'page-3',
        title: 'Case Study 3: App Crashes After Deployment',
        duration: '10 mins',
        type: 'exercise',
        points: 20,
        content: `# Case Study 3: App Crashes After Deployment

## Scenario
Your mobile app crash rate increased from 0.1% to 2.5% after the latest deployment.

## Given Information
- **Deployment time**: Tuesday 2 PM
- **Crash detection**: Started 3 PM same day
- **Affected platforms**: iOS primarily
- **User segments**: All user types affected
- **Crash type**: App becomes unresponsive

## Technical RCA Approach
1. **Log Analysis**: What do crash logs reveal?
2. **Code Review**: What changed in the deployment?
3. **Device Testing**: Which devices affected most?
4. **Performance Metrics**: Memory, CPU usage patterns
5. **Rollback Analysis**: What happens if we revert?

## Investigation Framework
- **Immediate**: Stop the bleeding
- **Short-term**: Identify root cause
- **Long-term**: Prevent recurrence`
      },
      {
        id: 'page-4',
        title: 'Case Study 4: Delivery Times Doubled',
        duration: '13 mins',
        type: 'exercise',
        points: 25,
        content: `# Case Study 4: Delivery Times Doubled

## Scenario
Your food delivery app shows average delivery time increased from 30 minutes to 60 minutes in one specific region.

## Given Information
- **Affected region**: San Francisco Bay Area
- **Time period**: Last 2 weeks
- **Other regions**: Normal performance
- **Order volume**: Increased 15% in affected region
- **Driver complaints**: More traffic, longer waits

## Multi-faceted RCA
1. **Operations Analysis**: Driver availability, routing
2. **Technical Investigation**: GPS, routing algorithms
3. **External Factors**: Traffic, weather, events
4. **Business Impact**: Customer satisfaction, revenue
5. **Stakeholder Interviews**: Drivers, customers, restaurants

## Complex Cause Analysis
This scenario likely has multiple contributing factors:
- Operational constraints
- Technical limitations
- External environmental factors
- Business process gaps`
      },
      {
        id: 'page-5',
        title: 'Final Assessment: Interview Simulation',
        duration: '10 mins',
        type: 'quiz',
        points: 30,
        content: `# Final Assessment: Interview Simulation

## Interview Question
"Walk me through how you would conduct a root cause analysis for a recent product issue you've encountered."

## Evaluation Criteria
Your response should demonstrate:
1. **Structured approach**: Clear methodology
2. **Data-driven thinking**: Evidence-based analysis
3. **Systems thinking**: Focus on processes, not blame
4. **Stakeholder consideration**: Multiple perspectives
5. **Action orientation**: Concrete next steps

## Strong Answer Framework
1. **Problem Definition**: Clear, specific, measurable
2. **Investigation Plan**: Systematic data collection
3. **Analysis Methods**: Multiple RCA tools used
4. **Root Cause Identification**: Evidence-backed conclusion
5. **Solution Design**: Immediate and long-term fixes
6. **Prevention Strategy**: How to avoid recurrence

## Congratulations!
You've completed the comprehensive RCA mastery course. You now have the tools and knowledge to tackle complex product, technical, and business problems systematically.`
      }
    ]
  }
];

export const getRcaModule = (moduleId: string): RcaLearningModule | undefined => {
  return rcaLearningModules.find(module => module.id === moduleId);
};

export const getAllRcaModules = (): RcaLearningModule[] => {
  return rcaLearningModules;
}; 