"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import TestinomialSliderForLoginPopup from "@/components/TestinomialSliderForLoginPopup";
import AuthForm from "@/components/AuthForm";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginPopup({ isOpen, onClose }: LoginPopupProps) {


  // Sample situations for display
  //   const situations = [
  //     "Career Decisions",
  //     "Relationship Choices", 
  //     "Life Transitions",
  //     "Personal Growth",
  //     "Financial Planning"
  //   ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close popup
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#F1F1F1] bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-100 rounded-full shadow-lg hover:bg-gray-200 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] p-8 scrollbar-hide">
          {/* Header */}
          <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold font-gotham text-[#323232] mb-1">
              Clarity is now
            </h1>
            <h1 className="text-2xl md:text-3xl px-1 font-bold font-gotham text-[#54B0AF] mb-1">
              <span className=" text-[#ffffff] mb-1 bg-[#54B0AF] p-1 mr-1">One Step{" "}</span>
              <span className="text-[#323232]">away</span>!
            </h1>
            
            {/* Situations line - responsive */}
            {/* <div className="text-sm md:text-base text-[#424242] font-gotham mb-3">
              <div className="hidden md:block">
                {situations.join(" • ")}
              </div>
              <div className="md:hidden text-xs font-gotham font-medium">
                {situations.slice(0, 3).join(" • ")}...
              </div>
            </div> */}
            
            <p className="text-lg text-[#323232] font-gotham font-medium">
              Get Personalised Insights, Instantly
            </p>
          </div>

         <AuthForm />

          {/* ICF Framework Badge */}
          {/* <div className="text-center mt-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
              Created on ICF Framework
            </span>
          </div> */}

          {/* Testimonials */}
          <TestinomialSliderForLoginPopup />
        </div>
      </div>
    </div>
  );
}