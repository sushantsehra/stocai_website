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
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
      // Add class to prevent scrolling
      document.body.classList.add('popup-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('popup-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('popup-open');
    };
  }, [isOpen]);

  // Handle ESC key to close popup
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex justify-center items-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // 80% opacity black background
      }}
    >
      {/* Backdrop - clickable area to close */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-label="Close popup"
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden z-10 animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-gray-100 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-200 group"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] p-8 scrollbar-hide">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold font-gotham text-[#323232] mb-1">
              Clarity is now
            </h1>
            <h1 className="text-2xl md:text-3xl px-1 font-bold font-gotham text-[#54B0AF] mb-1">
              <span className="text-[#ffffff] mb-1 bg-[#54B0AF] p-1 mr-1">One Step{" "}</span>
              <span className="text-[#323232]">away</span>!
            </h1>
            
            <p className="text-lg text-[#323232] font-gotham font-medium">
              Get Personalised Insights, Instantly
            </p>
          </div>

          <AuthForm />

          {/* ICF Framework Badge */}
          <div className="text-center mt-6">
            <span className="inline-block bg-gray-100 text-[#54B0AF] font-gotham text-xs font-semibold px-3 py-1 rounded-full">
              Created on ICF Framework
            </span>
          </div>

          {/* Testimonials */}
          <TestinomialSliderForLoginPopup />
        </div>
      </div>
    </div>
  );
}