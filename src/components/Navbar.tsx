"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useUser } from "@/contexts/UserContext";
import { getAppUrl, getSignupUrl } from "@/utils/env";
import { deleteUserCookie } from "@/utils/cookies";

type NavItem = {
  label: string;
  href: string;
  sectionId?: string; // ID of the section to highlight
  externalLink?: boolean;
  loggedInLabel?: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/#home", sectionId: "home" },
  { label: "My Space", loggedInLabel: "My Space", href: `${getAppUrl()}/workspace`, externalLink: true },
  { label: "Features", href: "/#features", sectionId: "features" },
  { label: "How Stocai Works", href: "/#how-stocai-works", sectionId: "how-stocai-works" },
  { label: "Testimonials", href: "/#testimonials", sectionId: "testimonials" },
  { label: "FAQ'S", href: "/#faq", sectionId: "faq" },
  { label: "Blog", href: "/blog" },
  { label: "Quiz", href: `${getAppUrl()}/psy-quiz`,externalLink: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    deleteUserCookie();
    setUser(null);
    setShowUserMenu(false);
    router.push('/');
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
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

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showUserMenu && !target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

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
              >
                {user && item.loggedInLabel ? item.loggedInLabel : item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Login Button or User Avatar - Desktop }
      <div className="hidden lg:block absolute right-4">
        {user ? (
          <div className="relative user-menu-container">
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 bg-[#54B0AF] hover:bg-[#459190] transition-colors rounded-full p-1 pr-3"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}&background=459190&color=fff&size=32`}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white font-gotham font-medium text-sm">
                {user.firstName}
              </span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                <div className="py-2">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            href={getSignupUrl()}
            className="bg-[#54B0AF] text-white py-2 px-7 rounded-full font-gotham font-medium whitespace-nowrap text-lg hover:opacity-90 transition-opacity"
          >
            Login
          </Link>
        )}
      </div>*/}

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
                    {user && item.loggedInLabel ? item.loggedInLabel : item.label}
                  </Link>
                </li>
              );
            })}
            {/* Login Button or User Info - Mobile */}
            <li>
              {user ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-3 bg-[#54B0AF] text-white py-3 px-6 rounded-full">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}&background=459190&color=fff&size=32`}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-center">
                      <p className="font-gotham font-medium text-sm">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs opacity-90">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-red-500 text-white font-medium py-2 px-8 rounded-full text-center font-gotham text-sm hover:bg-red-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href={getSignupUrl()}
                  className="bg-[#54B0AF] text-white font-medium py-2 px-44 rounded-full text-center font-gotham whitespace-nowrap text-lg hover:opacity-90 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
} 