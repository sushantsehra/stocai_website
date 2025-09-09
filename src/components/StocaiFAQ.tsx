"use client"

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const StocaiFAQ = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      question: "Is this really effective for serious career or life decisions?",
      answer: "Yes. Stocai is designed for high-stakes situations: whether it’s making a career move, planning retirement steps, or navigating complex relationships. Our structured prompts cut through noise and help you act with confidence."
    },
    {
      id: 2,
      question: "How much time does a session take?",
      answer: "Each session is self-paced. You can take as much time as you need. However, most users get clarity in under 15 minutes, and complete conversations take 25-30 minutes. Sessions are designed to fit into a break or between meetings so you can move forward without losing momentum at work or home."
    },
    {
      id: 3,
      question: "How is this different from therapy, coaching, or advice from friends?",
      answer: "We don’t tell you what to do. Instead, coaching guides you through proven question frameworks that help you surface your own clarity and next step. It’s faster and more focused than journaling, and more structured than chatting with friends."
    },
    {
      id: 4,
      question: "Is my information private and secure?",
      answer: "Absolutely. Sessions are private by default. Nothing is shared with third-party apps or service providers. All your data remains with Stocai."
    },
    {
      id: 5,
      question: "Do I need to be 'tech-savvy' to use this?",
      answer: "Not at all. If you can answer a few questions on your phone or laptop, you can use Stocai. No setup, no app download - just click and go."
    },
    {
      id: 6,
      question: "Do I need to commit or pay to try Stocai?",
      answer: "No. Your first session is completely free during beta. No credit card required. If you find value, you can create an account to save sessions or continue exploring."
    }
  ];

  const toggleAccordion = (id: number) =>  {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div id="stocai-faqs" className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-teal-400 to-transparent rounded-full opacity-100 blur-3xl"></div>
      <div className="absolute top-48 -right-5 w-28 h-28 bg-gradient-to-bl from-teal-400 to-transparent rounded-full opacity-100 blur-3xl"></div>
      <div className="absolute bottom-60 -left-10 w-56 h-56 bg-gradient-to-tr from-teal-400 to-transparent rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-56 bg-gradient-to-tr from-teal-300 to-transparent rounded-full opacity-50 blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-light text-[#54B0AF] font-bold font-gotham mb-6 leading-tight">
            <span className="text-[#54B0AF] font-bold font-gotham">Not Therapy. Not Journaling.</span>
            <br/>
            <span className="text-[#54B0AF] font-bold font-gotham">Stocai brings you Real Coaching.</span>
          </h1>
          <p className="text-[#323232] text-base sm:text-lg lg:text-xl max-w-md mx-auto">
            Here are some FAQs you may want to refer to.
          </p>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="bg-[#F2F2F2] backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-white/50 overflow-hidden transition-all duration-300 hover:shadow-md font-gotham"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                >
                  <span className="text-[#323232] text-sm sm:text-base lg:text-lg font-medium pr-4 leading-relaxed group-hover:text-teal-700 transition-colors font-gotham">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full group-hover:bg-teal-200 transition-colors font-gotham">
                    {openAccordion === faq.id ? (
                      <Minus className="w-3 h-3 sm:w-6 sm:h-6 text-teal-600" />
                    ) : (
                      <Plus className="w-3 h-3 sm:w-6 sm:h-6 text-teal-600" />
                    )}
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordion === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 sm:px-8 pb-5 sm:pb-6">
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-[#484848] text-sm sm:text-base leading-relaxed mt-3 font-gotham">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StocaiFAQ;