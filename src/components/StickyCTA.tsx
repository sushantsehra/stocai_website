"use client";

import React, { useState, useEffect } from "react";

const StickyCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Listen for modal open/close events
  useEffect(() => {
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    window.addEventListener('waitlist-modal-opened', handleModalOpen);
    window.addEventListener('waitlist-modal-closed', handleModalClose);

    return () => {
      window.removeEventListener('waitlist-modal-opened', handleModalOpen);
      window.removeEventListener('waitlist-modal-closed', handleModalClose);
    };
  }, []);

  // Check DOM for modal presence (backup method)
  useEffect(() => {
    const checkModalPresence = () => {
      const modalElement = document.querySelector('[data-waitlist-modal]');
      setIsModalOpen(!!modalElement);
    };

    checkModalPresence();

    const observer = new MutationObserver(() => {
      checkModalPresence();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // Hide when modal is open
  if (isModalOpen) {
    return null;
  }

  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed -bottom-1 left-0 w-full z-[9999] bg-[#1B294B] text-white">
      <div className="max-w-7xl mx-auto py-4 flex items-center justify-center gap-3">
        <button
          onClick={scrollToWaitlist}
          className="bg-[#0B64F4] hover:bg-blue-700 text-white text-sm sm:text-base px-4 sm:px-6 py-2 rounded-[12px] font-jakarta cursor-pointer font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 shrink-0"
        >
          Get Early Access
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;