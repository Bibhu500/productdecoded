import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Brain, Target, Users, Zap } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/dashboard');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Root Cause Analysis
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your problem-solving skills with our interactive platform. Learn and practice RCA techniques used by industry leaders.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-blue-600" />}
              title="Interactive Learning"
              description="Practice RCA through real-world scenarios and interactive case studies"
            />
            <FeatureCard
              icon={<Target className="w-8 h-8 text-blue-600" />}
              title="Structured Approach"
              description="Learn systematic methods to identify and solve complex problems"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-blue-600" />}
              title="Collaborative Environment"
              description="Work with peers and experts to enhance your problem-solving skills"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <BenefitItem text="Improve decision-making capabilities" />
            <BenefitItem text="Prevent recurring problems" />
            <BenefitItem text="Enhance team collaboration" />
            <BenefitItem text="Develop analytical thinking" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Problem-Solving Skills?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already enhanced their RCA capabilities with our platform.
            </p>
            <button 
              onClick={handleGetStarted}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto"
            >
              Start Free Trial <Zap size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Styled Components
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

const BenefitItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
    <CheckCircle className="w-6 h-6 text-green-500" />
    <span className="text-gray-700">{text}</span>
  </div>
);

export default LandingPage;
