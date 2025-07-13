import React, { useState } from 'react';
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
  Star,
  CheckCircle,
  Award
} from 'lucide-react';
import Modal from '../components/ui/Modal';

const Landingpage: React.FC = () => {
  const navigate = useNavigate();
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const pmSkills = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Root Cause Analysis",
      description: "Master systematic problem-solving with structured RCA frameworks",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Product Sense",
      description: "Develop intuition for what makes great products and user experiences",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Design Thinking",
      description: "Learn user-centered design principles and methodologies",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Product Metrics",
      description: "Understand key metrics, analytics, and data-driven decision making",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Product Improvement",
      description: "Strategies for continuous product optimization and growth",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Guesstimations",
      description: "Market sizing, estimation techniques, and analytical thinking",
      color: "from-rose-500 to-pink-600"
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Comprehensive Learning Modules",
      description: "Structured curriculum covering all essential PM skills"
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: "AI-Powered Simulations",
      description: "Practice with realistic scenarios and get instant feedback"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Real Case Studies",
      description: "Learn from actual product challenges and solutions"
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Progress Analytics",
      description: "Track your learning journey with detailed insights"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "PM Aspirant",
      image: "/src/assets/priya.jpeg",
      text: " Cant believe you guys are doing it for free. While its a new platform, the case studies are based on real product challenges. The AI simulations helped me understand complex PM scenarios and build confidence for interviews."
    },
    {
      name: "Michael Rodriguez", 
      role: "Software Engineer transitioning to PM",
      image: "/src/assets/rahul.jpeg",
      text: "Hats off to the creators of this platform. The UX, case studies, learning materials eveything is top notch. I've been using this platform for a few months now and it has been a game changer for my PM journey and yet free. "
    },
    {
      name: "Priya Patel",
      role: "MBA Student",
      image: "/src/assets/neha.jpg", 
      text: "Finding quality PM resources and practical learning all at one place is rare, This is indeed helpful. Thanks again."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/8 to-orange-500/8" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.1)_1px,transparent_0)] bg-[size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center mb-12"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-2xl shadow-lg">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <span className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ProductDecoded
                </span>
              </div>
            </motion.div>

            {/* Hero Text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Master Product Skills Like a{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent">
                Pro PM
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              The ultimate platform for product management aspirants. Master RCA, product sense, design thinking, 
              metrics, and more through AI-powered simulations, real case studies, and structured learning paths.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            >
              <button
                onClick={() => navigate('/dashboard')}
                className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <Zap className="w-6 h-6" />
                <span>Start Practicing for Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="https://discord.gg/uA372jhX"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border-2 border-gray-200 text-gray-700 px-10 py-5 rounded-2xl font-semibold text-lg hover:shadow-lg hover:border-emerald-300 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <MessageSquare className="w-6 h-6" />
                <span>Join Discord Community</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-4xl font-bold text-emerald-600 mb-2">50+</div>
                <div className="text-gray-600 font-medium">Case Studies</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-4xl font-bold text-orange-500 mb-2">100+</div>
                <div className="text-gray-600 font-medium">PM Aspirants</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-4xl font-bold text-teal-600 mb-2">200%</div>
                <div className="text-gray-600 font-medium">Improvement rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* PM Skills Section */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center mb-6"
            >
              <Award className="w-8 h-8 text-emerald-600 mr-3" />
              <span className="text-emerald-600 font-semibold text-lg">Essential Skills</span>
            </motion.div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Master Essential PM Skills
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 h-full group-hover:-translate-y-2">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${skill.color} text-white mb-6 shadow-lg`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
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
      <div className="py-32 bg-gradient-to-br from-emerald-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-8 h-8 text-teal-600 mr-3" />
              <span className="text-teal-600 font-semibold text-lg">Platform Features</span>
            </motion.div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why Product Managers Choose ProductDecoded
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI-powered learning platform designed by PMs, for aspiring PMs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 inline-flex mb-8 group-hover:shadow-2xl group-hover:shadow-emerald-500/10 transition-all duration-300">
                  <div className="text-emerald-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={() => navigate('/dashboard')}
              className="group bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <Trophy className="w-6 h-6" />
              <span>Start Tracking My Progress</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center mb-6"
            >
              <Star className="w-8 h-8 text-amber-500 mr-3" />
              <span className="text-amber-600 font-semibold text-lg">Testimonials</span>
            </motion.div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
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
                className="bg-gradient-to-br from-emerald-50 to-orange-50 rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-white shadow-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic mb-6 text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Community CTA */}
      <div className="py-32 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-white mb-8">
              Join 100+ Product Management Aspirants
            </h2>
            <p className="text-xl text-emerald-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Start your journey to becoming a top product manager today. Practice with AI simulations, 
              learn from real case studies, and connect with a community of like-minded professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="group bg-white text-emerald-600 px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <Trophy className="w-6 h-6" />
                <span>Start Learning for Free</span>
              </button>
              <a
                href="https://discord.gg/productdecoded"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-transparent border-2 border-white text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <Users className="w-6 h-6" />
                <span>Join Free Community</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-2xl shadow-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold">ProductDecoded</span>
            </div>
          </div>
          <div className="text-center text-gray-400">
            <p className="text-lg mb-8">&copy; 2024 ProductDecoded. Empowering the next generation of product managers.</p>
            <div className="flex justify-center space-x-8">
              <a href="https://discord.gg/productdecoded" className="hover:text-white transition-colors text-lg">
                Discord Community
              </a>
              <span>•</span>
              <button 
                onClick={() => setIsPrivacyModalOpen(true)}
                className="hover:text-white transition-colors text-lg"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button 
                onClick={() => setIsTermsModalOpen(true)}
                className="hover:text-white transition-colors text-lg"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <Modal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)}
        title="Privacy Policy"
      >
        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold mb-3">Information We Collect</h3>
            <p>We collect information you provide directly to us when you create an account, use our services, or communicate with us. This may include your name, email address, and learning progress data.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">How We Use Your Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and personalize your learning experience.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Information Sharing</h3>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Data Security</h3>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us through our Discord community or email.</p>
          </div>
        </div>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)}
        title="Terms of Service"
      >
        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold mb-3">Acceptance of Terms</h3>
            <p>By accessing and using ProductDecoded, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Use License</h3>
            <p>Permission is granted to temporarily use ProductDecoded for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">User Account</h3>
            <p>You are responsible for safeguarding the password and for all activities that occur under your account. You agree not to disclose your password to any third party.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Prohibited Uses</h3>
            <p>You may not use our service for any illegal or unauthorized purpose nor may you, in the use of the service, violate any laws in your jurisdiction.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Disclaimer</h3>
            <p>The information on this platform is provided on an 'as is' basis. To the fullest extent permitted by law, we exclude all representations, warranties, and conditions relating to our platform and the use of this platform.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Changes to Terms</h3>
            <p>We reserve the right to modify these terms at any time. We will always post the most current version on our platform.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Landingpage;
