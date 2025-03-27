'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type FAQItem = {
  id: number;
  question: string;
  answer: React.ReactNode;
  category: 'creators' | 'supporters';
};

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState<'creators' | 'supporters'>('creators');
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    // For Creators (7 questions)
    {
      id: 1,
      question: 'How do I set up my creator page?',
      answer: 'Sign up, complete your profile, and customize your page in Dashboard → Settings. Add a bio, profile picture, and set your coffee price.',
      category: 'creators'
    },
    {
      id: 2,
      question: 'What payment methods can I accept?',
      answer: 'You can accept all major credit cards, Apple Pay, Google Pay, and PayPal. We handle all payment processing for you.',
      category: 'creators'
    },
    {
      id: 3,
      question: 'How do withdrawals work?',
      answer: 'Withdraw anytime via PayPal or bank transfer (select countries). Minimum $5 balance required. Funds arrive in 3-5 business days.',
      category: 'creators'
    },
    {
      id: 4,
      question: 'Can I offer membership tiers?',
      answer: 'Yes! Create up to 3 membership levels with monthly pricing and exclusive benefits for your supporters.',
      category: 'creators'
    },
    {
      id: 5,
      question: 'What percentage do you take?',
      answer: 'We take 5% only when you withdraw. Payment processors charge 2.9% + $0.30 per transaction.',
      category: 'creators'
    },
    {
      id: 6,
      question: 'How do taxes work?',
      answer: 'Youre responsible for reporting income. We provide annual statements but dont withhold taxes.',
      category: 'creators'
    },
    {
      id: 7,
      question: 'Can I embed my page on my website?',
      answer: 'Yes! Use our widget or simple link. Many creators add a "Buy Me a Coffee" button to their sites.',
      category: 'creators'
    },

    // For Supporters (7 questions)
    {
      id: 8,
      question: 'Do I need an account to support?',
      answer: 'No! You can buy coffees without signing up. Just enter payment details and an optional message.',
      category: 'supporters'
    },
    {
      id: 9,
      question: 'Can I make recurring payments?',
      answer: 'Yes, if the creator offers memberships. Youll be charged monthly until you cancel.',
      category: 'supporters'
    },
    {
      id: 10,
      question: 'Is there a mobile app?',
      answer: 'Our website works perfectly on mobile browsers. Creators have apps to manage their pages.',
      category: 'supporters'
    },
    {
      id: 11,
      question: 'How do I cancel a membership?',
      answer: 'Go to your email receipt and click "Manage Membership". You can cancel anytime.',
      category: 'supporters'
    },
    {
      id: 12,
      question: 'Are payments secure?',
      answer: 'Absolutely. We use bank-level encryption and never store your full payment details.',
      category: 'supporters'
    },
    {
      id: 13,
      question: 'Can I get a refund?',
      answer: 'Refunds are at the creators discretion. Contact them directly via their page.',
      category: 'supporters'
    },
    {
      id: 14,
      question: 'What payment methods can I use?',
      answer: 'Credit/debit cards, Apple Pay, Google Pay, and PayPal in most countries.',
      category: 'supporters'
    }
  ];

  const toggleItem = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const filteredFaqs = faqData.filter(item => item.category === activeTab);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about Buy Me a Coffee
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`py-3 px-6 font-medium text-sm ${activeTab === 'creators' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('creators')}
        >
          For Creators
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm ${activeTab === 'supporters' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('supporters')}
        >
          For Supporters
        </button>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition duration-150"
              onClick={() => toggleItem(item.id)}
              aria-expanded={expandedItem === item.id}
              aria-controls={`faq-${item.id}`}
            >
              <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${expandedItem === item.id ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedItem === item.id && (
              <div id={`faq-${item.id}`} className="p-6 pt-0 text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need more help?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our support team is ready to answer your questions.
        </p>
        <Link 
          href="/contact" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default FAQPage;