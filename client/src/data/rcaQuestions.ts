export interface RCATest {
  id: string;
  title: string;
  problem_statement: string;
  instructions: string;
  clarifications: Record<string, string>;
  expected_root_cause: string;
  accepted_answers: string[];
  reasoning_steps: string[];
  validation_message: {
    correct: string;
    incorrect: string;
  };
}

export const rcaQuestions: RCATest[] = [
  {
    id: "rca_001",
    title: "Drop in User Sign-ups",
    problem_statement: "Your product's daily new user sign-ups have dropped by 35% over the past week. As the Product Manager, you're responsible for identifying the root cause and suggesting next steps.",
    instructions: "You're expected to ask clarifying questions and narrow down the issue step by step. Once you're confident, state your final root cause clearly.",
    clarifications: {
      time_period: "The drop started 7 days ago and is continuing.",
      region_specific: "Yes, the drop is mainly from Android users in India.",
      recent_changes: "A new app update was released 8 days ago targeting Android users.",
      app_reviews: "There has been a spike in 1-star reviews mentioning login errors.",
      error_logs: "Firebase logs show a 401 authentication error post-login for many Android devices.",
      other_platforms: "iOS sign-ups remain stable.",
      marketing: "No major changes in campaigns or budgets.",
      tracking: "No changes in the sign-up funnel instrumentation."
    },
    expected_root_cause: "A bug in the new Android app update causing login failures, leading to sign-up drop.",
    accepted_answers: [
      "Bug in the Android update",
      "Login issue in new Android app version",
      "Authentication error post update for Android users",
      "Android app update caused login failure"
    ],
    reasoning_steps: [
      "Identify when the drop started.",
      "Check if the drop is across all users or a segment.",
      "Look at recent product/app changes.",
      "Correlate changes with user feedback (e.g. reviews).",
      "Check technical logs or error data.",
      "Isolate root cause based on impacted segment and timing."
    ],
    validation_message: {
      correct: "✅ That's correct! The root cause was a login failure caused by a bug in the latest Android app update.",
      incorrect: "❌ That doesn't seem to be the root cause. Try analyzing where and when the drop happened and correlate with any recent changes."
    }
  },
  {
    id: "rca_002",
    title: "Sudden Revenue Drop",
    problem_statement: "Monthly recurring revenue (MRR) has decreased by 25% over the past month. The finance team is concerned and needs an immediate explanation.",
    instructions: "Analyze the revenue drop systematically and identify the root cause. Consider all possible factors that could impact revenue.",
    clarifications: {
      time_period: "The drop started 4 weeks ago and has been consistent.",
      customer_segment: "The drop is primarily from enterprise customers (>$10K MRR).",
      churn_rate: "Customer churn rate increased from 2% to 6% among enterprise clients.",
      product_changes: "A new pricing model was introduced 5 weeks ago for enterprise plans.",
      competitor_activity: "A major competitor launched a similar product at 30% lower price point.",
      customer_feedback: "Several enterprise customers mentioned pricing concerns in exit interviews.",
      support_tickets: "Increase in pricing-related support tickets by 200%.",
      sales_team: "Sales team reported difficulty closing deals due to pricing objections."
    },
    expected_root_cause: "New pricing model introduced 5 weeks ago made enterprise plans less competitive, leading to increased churn.",
    accepted_answers: [
      "New pricing model caused enterprise churn",
      "Pricing changes made product less competitive",
      "Enterprise pricing increase led to customer loss",
      "Pricing model change caused revenue drop"
    ],
    reasoning_steps: [
      "Identify the timeframe of revenue drop.",
      "Segment the data to find affected customer groups.",
      "Analyze churn patterns and rates.",
      "Review recent product/pricing changes.",
      "Correlate timing of changes with revenue impact.",
      "Validate with customer feedback and market analysis."
    ],
    validation_message: {
      correct: "✅ Correct! The new pricing model made enterprise plans less competitive, causing customer churn.",
      incorrect: "❌ Look deeper into the timing and customer segments affected. What changed around the time the revenue started dropping?"
    }
  },
  {
    id: "rca_003",
    title: "Feature Adoption Plateau",
    problem_statement: "A new feature that was performing well initially has seen adoption plateau at 15% of active users, far below the expected 40% target.",
    instructions: "Investigate why feature adoption has stagnated and identify barriers preventing wider adoption.",
    clarifications: {
      time_period: "Feature was launched 3 months ago, adoption plateaued after 6 weeks.",
      user_segments: "High adoption among power users (60%), low among casual users (8%).",
      feature_location: "Feature is accessible through a secondary menu, not main navigation.",
      user_education: "No in-app tutorials or onboarding flow for the new feature.",
      technical_performance: "Feature works well, no performance issues reported.",
      user_feedback: "Users say they didn't know the feature existed or how to use it.",
      analytics_data: "High drop-off rate on feature landing page (80% bounce rate).",
      competitor_comparison: "Similar features in competitor apps have 45% adoption rates."
    },
    expected_root_cause: "Poor discoverability and lack of user education/onboarding for the new feature.",
    accepted_answers: [
      "Poor feature discoverability and lack of onboarding",
      "Feature is hard to find and users don't know how to use it",
      "No user education and feature hidden in secondary menu",
      "Discoverability and onboarding issues"
    ],
    reasoning_steps: [
      "Analyze adoption patterns across user segments.",
      "Review feature placement and discoverability.",
      "Examine user education and onboarding flows.",
      "Check user feedback and support tickets.",
      "Compare with competitor implementations.",
      "Identify barriers to adoption."
    ],
    validation_message: {
      correct: "✅ Exactly! The feature suffers from poor discoverability and lacks proper user onboarding.",
      incorrect: "❌ Think about the user journey. How do users discover and learn about new features? What's missing here?"
    }
  },
  {
    id: "rca_004",
    title: "Performance Degradation",
    problem_statement: "Your app's average response time has increased from 200ms to 2.5 seconds over the past 48 hours, causing user complaints and increased bounce rates.",
    instructions: "Identify the root cause of the performance degradation quickly as it's affecting user experience significantly.",
    clarifications: {
      time_period: "Performance issues started exactly 48 hours ago at 3 PM EST.",
      affected_features: "All features are slow, but search functionality is most affected.",
      infrastructure: "No changes to server infrastructure or scaling policies.",
      database_performance: "Database queries are 10x slower than usual.",
      recent_deployments: "A new search algorithm was deployed 50 hours ago.",
      traffic_patterns: "No unusual spikes in traffic or user behavior.",
      error_logs: "Increased timeout errors and database connection issues.",
      resource_usage: "CPU usage normal, but database connections are maxed out."
    },
    expected_root_cause: "New search algorithm is inefficient and causing database performance issues.",
    accepted_answers: [
      "New search algorithm is inefficient",
      "Recent search algorithm deployment caused database issues",
      "Inefficient search algorithm causing database performance problems",
      "Search algorithm update is causing database bottleneck"
    ],
    reasoning_steps: [
      "Identify when performance issues started.",
      "Correlate with recent deployments or changes.",
      "Analyze which features are most affected.",
      "Check database performance and resource usage.",
      "Examine query patterns and execution times.",
      "Connect the timing of deployment with performance impact."
    ],
    validation_message: {
      correct: "✅ Correct! The new search algorithm is inefficient and overloading the database.",
      incorrect: "❌ Look at the timing carefully. What was deployed just before the performance issues started?"
    }
  },
  {
    id: "rca_005",
    title: "Customer Support Ticket Surge",
    problem_statement: "Customer support tickets have increased by 300% over the past week, overwhelming your support team and increasing response times.",
    instructions: "Analyze the surge in support tickets to identify the root cause and recommend immediate actions.",
    clarifications: {
      time_period: "Ticket volume started increasing 7 days ago.",
      ticket_categories: "60% are about password reset issues, 30% about app crashes, 10% others.",
      recent_changes: "A new authentication system was rolled out 10 days ago.",
      password_reset: "Password reset emails are being marked as spam by major email providers.",
      app_crashes: "Crashes are occurring during the new login flow on older devices.",
      user_demographics: "Issues mainly affect users with accounts older than 6 months.",
      technical_logs: "Email delivery rates dropped from 95% to 30% for password resets.",
      rollout_scope: "New auth system was rolled out to 100% of users gradually over 3 days."
    },
    expected_root_cause: "New authentication system causing password reset email deliverability issues and app crashes.",
    accepted_answers: [
      "New authentication system causing multiple issues",
      "Password reset emails being marked as spam due to new auth system",
      "New auth system causing email deliverability and app crash issues",
      "Authentication system rollout caused password and crash problems"
    ],
    reasoning_steps: [
      "Categorize support tickets by type and volume.",
      "Identify common themes and timing patterns.",
      "Correlate with recent system changes or deployments.",
      "Analyze technical metrics (email delivery, crash rates).",
      "Examine user demographics and affected segments.",
      "Connect system changes to support ticket categories."
    ],
    validation_message: {
      correct: "✅ Exactly! The new authentication system is causing both email deliverability issues and app crashes.",
      incorrect: "❌ Look at the ticket categories and what changed recently. There's a connection between the auth system and the support issues."
    }
  },
  {
    id: "rca_006",
    title: "Conversion Rate Drop",
    problem_statement: "Your e-commerce conversion rate has dropped from 3.2% to 1.8% over the past two weeks, significantly impacting revenue.",
    instructions: "Investigate the conversion rate drop and identify what's preventing users from completing purchases.",
    clarifications: {
      time_period: "Conversion rate started declining 14 days ago.",
      affected_pages: "Drop-off is highest on the checkout page (increased by 40%).",
      payment_methods: "New payment gateway was integrated 16 days ago.",
      error_rates: "Payment errors increased from 2% to 15%.",
      mobile_vs_desktop: "Mobile conversion dropped more significantly (2.8% to 1.2%).",
      user_feedback: "Users report payment form is confusing and takes too long to load.",
      technical_issues: "Payment gateway has 5-second response time vs 1-second for old gateway.",
      international_users: "International users most affected (conversion dropped 60%)."
    },
    expected_root_cause: "New payment gateway has poor performance and user experience, especially for mobile and international users.",
    accepted_answers: [
      "New payment gateway has poor performance and UX",
      "Payment gateway integration causing checkout issues",
      "New payment system is slow and confusing users",
      "Payment gateway performance and usability issues"
    ],
    reasoning_steps: [
      "Identify where in the funnel users are dropping off.",
      "Correlate timing with recent changes or deployments.",
      "Analyze payment error rates and performance metrics.",
      "Segment data by device type and geography.",
      "Review user feedback and technical performance.",
      "Connect gateway change to conversion rate impact."
    ],
    validation_message: {
      correct: "✅ Correct! The new payment gateway has performance and usability issues affecting conversions.",
      incorrect: "❌ Focus on the checkout process. What changed recently that could affect how users complete purchases?"
    }
  },
  {
    id: "rca_007",
    title: "User Engagement Decline",
    problem_statement: "Daily active users (DAU) have decreased by 20% over the past month, and average session duration has dropped from 12 minutes to 8 minutes.",
    instructions: "Analyze the user engagement decline and identify factors contributing to reduced app usage.",
    clarifications: {
      time_period: "Engagement started declining 4 weeks ago, accelerating in the last 2 weeks.",
      user_segments: "Decline is consistent across all user segments and demographics.",
      content_changes: "New content recommendation algorithm was deployed 5 weeks ago.",
      content_quality: "Algorithm is showing less relevant content based on user feedback.",
      competitor_activity: "Major competitor launched a viral feature 3 weeks ago.",
      push_notifications: "Notification click-through rates dropped by 50%.",
      in_app_metrics: "Users are spending less time on main content feed.",
      user_feedback: "Users complain about boring and repetitive content recommendations."
    },
    expected_root_cause: "New content recommendation algorithm is showing less relevant content, reducing user engagement.",
    accepted_answers: [
      "New content recommendation algorithm showing irrelevant content",
      "Content algorithm causing poor user experience",
      "Recommendation system is not showing relevant content",
      "Content algorithm change reduced engagement"
    ],
    reasoning_steps: [
      "Analyze engagement metrics and identify patterns.",
      "Review recent product changes and deployments.",
      "Examine content quality and relevance metrics.",
      "Check user feedback and behavior patterns.",
      "Correlate algorithm changes with engagement decline.",
      "Validate with content consumption data."
    ],
    validation_message: {
      correct: "✅ Exactly! The new content recommendation algorithm is showing less relevant content to users.",
      incorrect: "❌ Think about what drives user engagement. What changed that could affect content relevance and user interest?"
    }
  },
  {
    id: "rca_008",
    title: "API Response Time Spike",
    problem_statement: "Your API response times have spiked from an average of 100ms to 3 seconds, causing mobile app crashes and partner integration failures.",
    instructions: "Quickly identify and resolve the API performance issues affecting multiple client applications.",
    clarifications: {
      time_period: "Performance issues started 6 hours ago at 2 AM EST.",
      affected_endpoints: "All endpoints affected, but user authentication endpoint is worst (10s response time).",
      infrastructure: "No changes to server infrastructure, auto-scaling is working normally.",
      database_performance: "Database queries are normal, no slowdowns detected.",
      recent_deployments: "A new caching layer was deployed 8 hours ago.",
      cache_hit_rate: "Cache hit rate is 0% instead of expected 80%.",
      error_logs: "Cache connection timeouts and fallback to database queries.",
      traffic_patterns: "Normal traffic levels, no unusual spikes."
    },
    expected_root_cause: "New caching layer deployment has configuration issues preventing cache hits, forcing all requests to database.",
    accepted_answers: [
      "New caching layer configuration issues",
      "Cache deployment causing 0% hit rate",
      "Caching layer not working, forcing database queries",
      "Cache configuration problems causing API slowdown"
    ],
    reasoning_steps: [
      "Identify when performance issues started.",
      "Correlate with recent deployments or changes.",
      "Analyze cache performance and hit rates.",
      "Check database vs cache query patterns.",
      "Examine error logs and connection issues.",
      "Connect cache deployment to performance impact."
    ],
    validation_message: {
      correct: "✅ Correct! The new caching layer has configuration issues causing 0% cache hit rate.",
      incorrect: "❌ Look at the timing and what was deployed recently. Something with the caching system isn't working properly."
    }
  }
]; 