import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Brain, 
  Target, 
  Users, 
  Zap,
  BarChart,
  Sparkles,
  Star,
  Clock,
  Trophy
} from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleGetStarted = () => {
    if (!isLoaded) return;
    if (isSignedIn) {
      navigate('/dashboard');
    } else {
      navigate('/sign-in');
    }
  };

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    const featuresSection = document.querySelector('#features-section');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Product Manager at TechCorp",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "This platform transformed how I approach problem-solving. The interactive RCA scenarios are incredibly realistic and helped me develop stronger analytical skills."
    },
    {
      name: "Michael Rodriguez",
      role: "Product Lead at StartupX",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "The structured approach to RCA learning and the AI-powered feedback system made a huge difference in my team's problem-solving capabilities."
    },
    {
      name: "Emily Watson",
      role: "Product Director at InnovateCo",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      text: "An invaluable resource for both new and experienced PMs. The real-world scenarios and detailed feedback helped me level up my RCA skills."
    }
  ];

  const stats = [
    { number: "500+", label: "Practice Scenarios", icon: <Target className="h-6 w-6 text-blue-500" /> },
    { number: "98%", label: "Success Rate", icon: <Trophy className="h-6 w-6 text-blue-500" /> },
    { number: "15K+", label: "Active Learners", icon: <Users className="h-6 w-6 text-blue-500" /> },
    { number: "4.9/5", label: "User Rating", icon: <Star className="h-6 w-6 text-blue-500" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium"
          >
            #1 Platform for Product Managers
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Master Root Cause Analysis Like a{' '}
            <span className="text-blue-600">Pro PM</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your problem-solving skills with our AI-powered platform. Learn and practice RCA techniques used by top 1% product managers.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row items-center">
            <button 
              onClick={handleGetStarted}
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg font-medium"
            >
              Start Free Trial <ArrowRight size={20} />
            </button>
            <button 
              onClick={handleLearnMore}
              className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium"
            >
              Watch Demo
            </button>
          </div>
        </motion.div>
      </header>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Product Managers Love Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with proven learning methodologies to deliver an unmatched RCA learning experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-blue-600" />}
              title="AI-Powered Learning"
              description="Get personalized feedback and guidance from our advanced AI assistant trained on real PM experiences"
            />
            <FeatureCard
              icon={<BarChart className="w-8 h-8 text-blue-600" />}
              title="Progress Analytics"
              description="Track your learning progress with detailed analytics and skill assessments"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-blue-600" />}
              title="Real PM Scenarios"
              description="Practice with real-world cases sourced from top tech companies"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Loved by Product Managers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of PMs who have accelerated their careers with our platform.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-blue-50 rounded-2xl p-8"
            >
              <div className="flex items-start gap-6">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-700 text-lg mb-4">"{testimonials[activeTestimonial].text}"</p>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-gray-600">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your PM Career?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join our community of product managers and start your journey to mastering RCA today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleGetStarted}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-lg font-medium"
                >
                  Start Free Trial <Zap size={20} />
                </button>
                <button 
                  onClick={handleLearnMore}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-lg font-medium"
                >
                  Schedule Demo
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>No credit card required</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 rounded-xl bg-white shadow-lg border border-gray-100"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default LandingPage;
