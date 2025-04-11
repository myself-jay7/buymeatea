'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FiCoffee, FiUser, FiHeart, FiDollarSign, FiSettings, 
  FiShield, FiRepeat, FiMessageSquare, FiSmartphone, 
  FiGift, FiZap, FiAward, FiPieChart, FiGlobe, FiTrendingUp 
} from 'react-icons/fi';

type FAQItem = {
  id: number;
  question: string;
  answer: React.ReactNode;
  category: 'creators' | 'supporters';
  icon: React.ReactNode;
};

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState<'creators' | 'supporters'>('creators');
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  // Floating icons data for the decorative background
  const floatingIcons = [
    { icon: <FiCoffee className="text-blue-100" size={24} />, position: 'top-10 left-1/4' },
    { icon: <FiZap className="text-yellow-100" size={20} />, position: 'top-1/3 right-20' },
    { icon: <FiAward className="text-purple-100" size={22} />, position: 'bottom-1/4 left-20' },
    { icon: <FiPieChart className="text-green-100" size={18} />, position: 'top-1/4 right-1/3' },
    { icon: <FiGlobe className="text-pink-100" size={26} />, position: 'bottom-20 left-1/3' },
    { icon: <FiTrendingUp className="text-indigo-100" size={20} />, position: 'top-40 right-10' },
  ];

  const faqData: FAQItem[] = [
    // For Creators (7 questions)
    {
      id: 1,
      question: 'How do I set up my creator page?',
      answer: (
        <div>
          <p>Sign up with your Google account, go to Dashboard → Profile, complete your profile, upload images, and set your username.</p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-800">Pro Tip:</p>
            <p>Use high-quality images and a compelling bio to attract more supporters!</p>
          </div>
        </div>
      ),
      category: 'creators',
      icon: <FiSettings className="text-blue-500" size={20} />
    },
    {
      id: 2,
      question: 'What cryptocurrencies can I accept?',
      answer: 'We support multiple cryptocurrencies via NowPayments including Bitcoin, Ethereum, USDT, and more. All donations go to the platform wallet first.',
      category: 'creators',
      icon: <FiDollarSign className="text-green-500" size={20} />
    },
    {
      id: 3,
      question: 'How do withdrawals work?',
      answer: (
        <div>
          <p>Submit your wallet address in the withdrawal section. Once verified by the admin, your crypto funds are manually transferred within 2-3 business days.</p>
          <div className="mt-2 flex items-center text-yellow-600">
            <FiShield className="mr-2" />
            <span className="text-sm">Verification helps prevent fraud and ensure security.</span>
          </div>
        </div>
      ),
      category: 'creators',
      icon: <FiRepeat className="text-purple-500" size={20} />
    },
    {
      id: 4,
      question: 'Can I customize my public profile?',
      answer: 'Yes! Add your profile image, banner, description, and social links to make your page engaging for supporters.',
      category: 'creators',
      icon: <FiUser className="text-pink-500" size={20} />
    },
    {
      id: 5,
      question: 'Are there any platform fees?',
      answer: 'We do not charge fees for receiving donations. However, NowPayments charges a small transaction fee. Manual withdrawal processing is also free.',
      category: 'creators',
      icon: <FiDollarSign className="text-red-500" size={20} />
    },
    {
      id: 6,
      question: 'Do I need to handle crypto taxes?',
      answer: "Yes, you're responsible for declaring your crypto income. We provide transaction records for easier tracking.",
      category: 'creators',
      icon: <FiShield className="text-orange-500" size={20} />
    },
    {
      id: 7,
      question: 'Can I share my page with others?',
      answer: 'Absolutely. You get a unique link like buymeatea.com/username that you can share anywhere or embed as a button on your site.',
      category: 'creators',
      icon: <FiGift className="text-teal-500" size={20} />
    },
  
    // For Supporters (7 questions)
    {
      id: 8,
      question: 'Do I need an account to donate?',
      answer: 'No account is required. Just click on a creator\'s page, choose a donation amount, and pay via your preferred crypto wallet.',
      category: 'supporters',
      icon: <FiUser className="text-blue-500" size={20} />
    },
    {
      id: 9,
      question: 'Can I support a creator monthly?',
      answer: (
        <div>
          <p>Recurring donations are coming soon! For now, all donations are one-time crypto transactions.</p>
          <div className="mt-2 flex items-center text-blue-600">
            <FiHeart className="mr-2" />
            <span className="text-sm">Sign up for our newsletter to be notified when this feature launches.</span>
          </div>
        </div>
      ),
      category: 'supporters',
      icon: <FiRepeat className="text-green-500" size={20} />
    },
    {
      id: 10,
      question: 'Is there a mobile version?',
      answer: 'Yes. The platform is fully responsive and works smoothly on all devices including mobiles and tablets.',
      category: 'supporters',
      icon: <FiSmartphone className="text-purple-500" size={20} />
    },
    {
      id: 11,
      question: 'Can I include a message with my donation?',
      answer: 'Yes, after choosing your donation amount, you can optionally include a short message of support.',
      category: 'supporters',
      icon: <FiMessageSquare className="text-pink-500" size={20} />
    },
    {
      id: 12,
      question: 'Are crypto payments secure?',
      answer: 'Yes, transactions are handled securely via NowPayments, and we never store your private keys or wallet info.',
      category: 'supporters',
      icon: <FiShield className="text-red-500" size={20} />
    },
    {
      id: 13,
      question: 'Can I request a refund?',
      answer: 'All donations are final due to the nature of crypto. You may contact the creator directly for any concerns.',
      category: 'supporters',
      icon: <FiDollarSign className="text-orange-500" size={20} />
    },
    {
      id: 14,
      question: 'What wallets can I use to donate?',
      answer: 'You can donate using any standard crypto wallet such as MetaMask, Trust Wallet, or centralized exchanges.',
      category: 'supporters',
      icon: <FiGift className="text-teal-500" size={20} />
    }
  ];

  const toggleItem = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const filteredFaqs = faqData.filter(item => item.category === activeTab);

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-12 overflow-hidden">
      {/* Decorative grid background using arbitrary Tailwind values */}
      <div 
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      >
        {floatingIcons.map((item, index) => (
          <div 
            key={index} 
            className={`absolute ${item.position}`}
            style={{
              animation: 'float 6s ease-in-out infinite',
              animationDelay: `${index * 0.5}s`
            }}
          >
            {item.icon}
          </div>
        ))}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-20"></div>
      </div>

      {/* Header with decorative elements */}
      <div className="text-center mb-16 relative">
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-100 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-yellow-100 rounded-full opacity-30 blur-xl"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center mb-6 bg-white/80 backdrop-blur-sm py-3 px-6 rounded-full shadow-sm">
            <FiCoffee className="text-yellow-500 mr-3" size={28} />
            <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
          </div><br />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto relative inline-block">
            Everything you need to know about Buy Me a Tea
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></span>
          </p>
        </div>
      </div>

      {/* Tabs with improved styling */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200 shadow-inner">
          <button
            className={`flex items-center py-3 px-8 rounded-lg transition-all ${activeTab === 'creators' ? 'bg-white shadow-md text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('creators')}
          >
            <FiUser className="mr-3" size={18} />
            <span className="font-medium">For Creators</span>
          </button>
          <button
            className={`flex items-center py-3 px-8 rounded-lg transition-all ${activeTab === 'supporters' ? 'bg-white shadow-md text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('supporters')}
          >
            <FiHeart className="mr-3" size={18} />
            <span className="font-medium">For Supporters</span>
          </button>
        </div>
      </div>

      {/* FAQ Items with enhanced styling */}
      <div className="relative z-10 space-y-5 max-w-4xl mx-auto">
        {filteredFaqs.map((item) => (
          <div 
            key={item.id} 
            className={`border rounded-xl overflow-hidden transition-all duration-300 ${expandedItem === item.id ? 'border-blue-200 shadow-lg bg-white/90 backdrop-blur-sm' : 'border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm'}`}
          >
            <button
              className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50/50 transition duration-200"
              onClick={() => toggleItem(item.id)}
              aria-expanded={expandedItem === item.id}
              aria-controls={`faq-${item.id}`}
            >
              <div className="flex items-start">
                <div className="mr-5 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mt-1">{item.question}</h3>
              </div>
              <svg
                className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${expandedItem === item.id ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedItem === item.id && (
              <div 
                id={`faq-${item.id}`} 
                className="px-6 pb-6 pt-0 text-gray-600 ml-16"
                style={{
                  animation: 'fadeIn 0.3s ease-out forwards'
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced CTA Section */}
      <div 
        className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-10 text-center relative overflow-hidden border border-gray-200 shadow-inner"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-200 rounded-full opacity-10"></div>
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-200 rounded-full opacity-10"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="mr-4 p-3 bg-white rounded-full shadow-md">
              <FiMessageSquare className="text-blue-500" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Need more help?</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Our friendly support team is ready to answer your questions. We typically respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-4 px-8 rounded-xl transition duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
};

export default FAQPage;