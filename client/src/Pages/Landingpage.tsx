import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  BarChart3, 
  Lightbulb, 
  Users, 
  BookOpen, 
  Play, 
  TrendingUp,
  Package,
  PieChart,
  Calculator,
  MessageSquare,
  ExternalLink,

  ArrowRight,
  Zap,
  Trophy,
  Star
} from 'lucide-react';

const Landingpage: React.FC = () => {
  const navigate = useNavigate();

  const pmSkills = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Root Cause Analysis",
      description: "Master systematic problem-solving with structured RCA frameworks",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Product Sense",
      description: "Develop intuition for what makes great products and user experiences",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Design Thinking",
      description: "Learn user-centered design principles and methodologies",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Product Metrics",
      description: "Understand key metrics, analytics, and data-driven decision making",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Product Improvement",
      description: "Strategies for continuous product optimization and growth",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Guesstimations",
      description: "Market sizing, estimation techniques, and analytical thinking",
      color: "from-red-500 to-red-600"
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Comprehensive Learning Modules",
      description: "Structured curriculum covering all essential PM skills"
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "AI-Powered Simulations",
      description: "Practice with realistic scenarios and get instant feedback"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Real Case Studies",
      description: "Learn from actual product challenges and solutions"
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Progress Analytics",
      description: "Track your learning journey with detailed insights"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior PM at Meta",
      image: "/src/assets/priya.jpeg",
      text: "ProductDecoded transformed my approach to product thinking. The AI simulations feel incredibly realistic and helped me land my dream PM role."
    },
    {
      name: "Michael Rodriguez", 
      role: "Product Lead at Stripe",
      image: "/src/assets/rahul.jpeg",
      text: "The structured learning path and practical case studies gave me the confidence to make data-driven product decisions in complex scenarios."
    },
    {
      name: "Priya Patel",
      role: "PM at Google",
      image: "/src/assets/neha.jpg", 
      text: "The guesstimation and metrics modules were game-changers. I use these frameworks daily in my role as a senior product manager."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ProductDecoded
                </span>
              </div>
            </motion.div>

            {/* Hero Text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Master Product Skills Like a{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pro PM
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              The ultimate platform for product management aspirants. Master RCA, product sense, design thinking, 
              metrics, and more through AI-powered simulations, real case studies, and structured learning paths.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Start Practicing</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <a
                href="https://discord.gg/uA372jhX"
                
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Join Discord Community</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Case Studies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">1000+</div>
                <div className="text-sm text-gray-600">PM Aspirants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* PM Skills Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Master Essential PM Skills
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive training in all the skills that top product managers use daily
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pmSkills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${skill.color} text-white mb-6`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {skill.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Product Managers Choose ProductDecoded
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-powered learning platform designed by PMs, for aspiring PMs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 inline-flex mb-6">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Top Product Managers
            </h2>
            <p className="text-xl text-gray-600">
              See how ProductDecoded helped them succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Community CTA */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Join 1000+ Product Management Aspirants
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your journey to becoming a top product manager today. Practice with AI simulations, 
              learn from real case studies, and connect with a community of like-minded professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Trophy className="w-5 h-5" />
                <span>Start Practicing</span>
              </button>
              <a
                href="https://discord.gg/productdecoded"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Join Free Community</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">ProductDecoded</span>
            </div>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 ProductDecoded. Empowering the next generation of product managers.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="https://discord.gg/productdecoded" className="hover:text-white transition-colors">
                Discord Community
              </a>
              <span>•</span>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;
