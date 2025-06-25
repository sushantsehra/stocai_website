"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

type NavItem = {
  label: string;
  href: string;
  sectionId?: string; // ID of the section to highlight
  externalLink?: boolean;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/#home", sectionId: "home" },
  { label: "Start Reflection", href: "https://mystocai.com/signUp?redirect=/chat", externalLink: true },
  { label: "History", href: "https://mystocai.com/signUp?redirect=/PastChats", externalLink: true },
  { label: "Features", href: "/#features", sectionId: "features" },
  { label: "How Stocai Works", href: "/#how-stocai-works", sectionId: "how-stocai-works" },
  { label: "Testimonials", href: "/#testimonials", sectionId: "testimonials" },
  { label: "FAQ'S", href: "/#faq", sectionId: "faq" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle navigation
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    // Handle external links
    if (item.externalLink) {
      // Let the default link behavior handle it
      return;
    }
    
    // Handle anchor links on the current page
    if (item.href.includes("#") && pathname === "/") {
      e.preventDefault();
      
      if (item.sectionId) {
        const targetElement = document.getElementById(item.sectionId);
        
        if (targetElement) {
          // Adjust scroll position to account for fixed header with banner
          const headerOffset = 100; // Increased to account for banner
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
      
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  // Setup section visibility detection using Intersection Observer
  useEffect(() => {
    if (pathname !== "/") return;

    // Custom event for section visibility changes
    const sectionVisibilityEvent = new CustomEvent("sectionVisibilityChange", {
      detail: { sectionId: "" }
    });

    // Create an intersection observer for each section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          // Check if this section corresponds to a nav item
          const matchingNavItem = navItems.find(item => item.sectionId === sectionId);
          
          if (matchingNavItem) {
            // Update the event detail with the current section ID
            sectionVisibilityEvent.detail.sectionId = sectionId;
            
            // Dispatch the event
            document.dispatchEvent(
              new CustomEvent("sectionVisibilityChange", {
                detail: { sectionId }
              })
            );
          }
        }
      });
    }, {
      root: null,
      rootMargin: "-100px 0px -50% 0px", // Adjust based on your header height
      threshold: 0.1
    });

    // Observe all sections that have IDs matching our nav items
    navItems.forEach(item => {
      if (item.sectionId) {
        const section = document.getElementById(item.sectionId);
        if (section) {
          observer.observe(section);
        }
      }
    });

    // Listen for section visibility changes
    const handleSectionVisibility = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { sectionId } = customEvent.detail;
      
      if (sectionId) {
        setActiveSection(sectionId);
      }
    };

    // Add event listener
    document.addEventListener("sectionVisibilityChange", handleSectionVisibility);

    // Cleanup
    return () => {
      observer.disconnect();
      document.removeEventListener("sectionVisibilityChange", handleSectionVisibility);
    };
  }, [pathname]);

  return (
    <nav className="flex justify-center items-center w-full">
      {/* Desktop Navigation - visible on lg screens and above */}
      <ul className="hidden lg:flex items-center justify-center">
        {navItems.map((item) => {
          const isActive = item.href.includes("#") && pathname === "/"
            ? activeSection === item.sectionId
            : pathname === item.href;
            
          return (
            <li key={item.href} className="">
              <Link
                href={item.href}
                onClick={(e) => handleNavigation(e, item)}
                className={`rounded-3xl font-gotham whitespace-nowrap ${
                  isActive
                    ? "bg-[#54B0AF] text-white font-bold py-2 px-4"
                    : "text-gray-700 hover:text-[#54B0AF] py-2 px-4"
                } transition-colors`}
                target={item.externalLink ? "_blank" : undefined}
                rel={item.externalLink ? "noopener noreferrer" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Login Button - Desktop */}
      <Link
        href="/login"
        className="hidden lg:block absolute right-4 bg-[#54B0AF] text-white py-2 px-7 rounded-full font-gotham font-medium whitespace-nowrap text-lg hover:opacity-90 transition-opacity"
      >
        Login
      </Link>

      {/* Hamburger Menu Button - visible on screens smaller than lg */}
      <button
        className="lg:hidden fixed top-[76px] right-4 z-50 p-2 cursor-pointer"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {!isMenuOpen ? (
          <GiHamburgerMenu className="h-6 w-6 cursor-pointer" />
        ) : (
          <IoMdClose className="h-6 w-6 cursor-pointer" />
        )}
      </button>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 flex flex-col items-center py-20 mt-[100px]">
          <ul className="flex flex-col items-center space-y-6">
            {navItems.map((item) => {
              const isActive = item.href.includes("#") && pathname === "/"
                ? activeSection === item.sectionId
                : pathname === item.href;
                
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavigation(e, item)}
                    className={`rounded-3xl font-gotham whitespace-nowrap text-lg ${
                      isActive
                        ? "bg-[#54B0AF] text-white font-bold py-2 px-6"
                        : "text-gray-700 hover:text-[#54B0AF] py-2 px-6"
                    } transition-colors`}
                    target={item.externalLink ? "_blank" : undefined}
                    rel={item.externalLink ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {/* Login Button - Mobile */}
            <li>
              <Link
                href="/login"
                className="bg-[#54B0AF] text-white font-medium py-2 px-44 rounded-full text-center font-gotham whitespace-nowrap text-lg hover:opacity-90 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
} 