"use client";

import React, { useState, useEffect } from "react";

const PromotableStickyCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Method 1: Listen for modal events
  useEffect(() => {
    const handleModalOpen = () => {
      console.log("Modal opened event received");
      setIsModalOpen(true);
    };
    const handleModalClose = () => {
      console.log("Modal closed event received");
      setIsModalOpen(false);
    };

    window.addEventListener('waitlist-modal-opened', handleModalOpen);
    window.addEventListener('waitlist-modal-closed', handleModalClose);

    return () => {
      window.removeEventListener('waitlist-modal-opened', handleModalOpen);
      window.removeEventListener('waitlist-modal-closed', handleModalClose);
    };
  }, []);

  // Method 2: Check DOM for modal presence (backup method)
  useEffect(() => {
    const checkModalPresence = () => {
      const modalElement = document.querySelector('[data-waitlist-modal]');
      setIsModalOpen(!!modalElement);
    };

    // Check initially
    checkModalPresence();

    // Check periodically
    const observer = new MutationObserver(() => {
      checkModalPresence();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // Hide sticky CTA when modal is open
  if (isModalOpen) {
    console.log("Hiding sticky CTA because modal is open");
    return null;
  }

  return (
    <div className="fixed -bottom-1 left-0 w-full z-[9999] bg-[#1B294B] text-white py-3">
      <div className="max-w-7xl mx-auto px-4">
        {!isExpanded ? (
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="bg-[#0B64F4] hover:bg-blue-700 text-white text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-[12px] font-jakarta cursor-pointer font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 shrink-0"
            >
              Get Early Access
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row justify-center items-center">
            <div className="flex flex-row px-4 md:px-0 items-center justify-center w-full sm:w-auto md:min-w-lg lg:min-w-3xl lg:max-w-3xl bg-[#F5F5F5] rounded-[20px] h-[43.49372482299805px] md:h-[60px] shadow-lg overflow-hidden">
              <input
                id="sticky-waitlist-email"
                type="email"
                placeholder="Enter email address"
                className="w-full sm:w-[65%] px-4 py-3 text-black font-medium outline-none text-sm sm:text-base lg:text-[18px] bg-transparent"
                required
                autoFocus
              />
              <button
                data-waitlist-cta
                data-waitlist-email-input="sticky-waitlist-email"
                data-waitlist-source="sticky_cta"
                className="hidden sm:block w-full ml-4 sm:ml-0 sm:w-[30%] bg-gradient-to-r from-[#024BAB] to-[#3C83F6] hover:bg-blue-700 rounded-[10px] md:rounded-[12px] text-white lg:text-[18px] min-h-[48px] font-bold cursor-pointer py-1 md:py-3 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              >
                Request Access
              </button>
            </div>
            
            <button
              data-waitlist-cta
              data-waitlist-email-input="sticky-waitlist-email"
              data-waitlist-source="sticky_cta"
              className="block sm:hidden w-[60%] bg-gradient-to-r from-[#ADADAD] to-[#FFFFFF] hover:bg-blue-700 rounded-[9.36px] md:rounded-[12px] text-[18.71px] text-black lg:text-[20px] min-h-[49.900848388671875px] cursor-pointer font-bold font-jakarta p-3.5 md:py-3 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Request Access
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotableStickyCTA;