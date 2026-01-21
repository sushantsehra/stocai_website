"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { useUser } from "@/contexts/UserContext";
import { getAppUrl, getSignupUrl } from "@/utils/env";
import { deleteUserCookie, setLogoutSignal } from "@/utils/cookies";
import Image from 'next/image';


type NavItem = {
  label: string;
  href: string;
  sectionId?: string; // ID of the section to highlight
  externalLink?: boolean;
  loggedInLabel?: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/#home", sectionId: "home" },
  { label: "My Space", loggedInLabel: "My Space", href: `${getAppUrl()}/`, externalLink: true },
  // { label: "Features", href: "/#features", sectionId: "features" },
  // { label: "How Stocai Works", href: "/#how-stocai-works", sectionId: "how-stocai-works" },
  // { label: "Testimonials", href: "/#testimonials", sectionId: "testimonials" },
  // { label: "FAQ'S", href: "/#faq", sectionId: "faq" },
  // { label: "Blog", href: "/blog" },
  // { label: "Quiz", href: `${getAppUrl()}/quiz`, externalLink: true },
  // { label: "History", href: "https://clarity.mystocai.com/PastChats" }, 
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Resources dropdown states
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Resources dropdown handlers
  const handleResourcesOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    setResourcesOpen(!resourcesOpen);
  };

  const handleResourcesClose = () => {
    setResourcesOpen(false);
  };

  const handleResourcesNavigate = (path: string) => {
    setTimeout(() => {
      router.push(path);
      handleResourcesClose();
      setIsMenuOpen(false);
    }, 0);
  };

  const handleLogout = () => {
    // Set logout signal for cross-domain logout
    setLogoutSignal();
    
    // Clear current app data
    localStorage.removeItem('user');
    deleteUserCookie();
    setUser(null);
    setShowUserMenu(false);
    
    // Redirect to home page
    router.push('/');
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showUserMenu && !target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }

      // Close resources dropdown
      if (
        resourcesOpen &&
        resourcesRef.current &&
        !resourcesRef.current.contains(event.target as Node)
      ) {
        setResourcesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu, resourcesOpen]);

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
      rootMargin: "-100px 0px -50% 0px", 
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

  // Resources Dropdown Component
  const ResourcesDropdown = () => {
    const isResourcesActive =
      pathname === "/blog" || pathname === "/quiz";

    return (
      <div className="relative" ref={resourcesRef}>
        {/* Desktop Resources Dropdown */}
        <div className="hidden lg:block">
          <button
            onClick={handleResourcesOpen}
            className={`py-2 px-4 flex items-center gap-1 transition-colors duration-300 whitespace-nowrap rounded-3xl font-gotham ${
              isResourcesActive
                ? "bg-[#54B0AF] text-white font-bold"
                : "text-gray-700 hover:text-[#54B0AF]"
            }`}
          >
            Resources
            <FaChevronDown
              className={`text-sm transition-transform duration-200 ${
                resourcesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Desktop Dropdown Menu */}
          {resourcesOpen && (
            <div
              className="absolute left-0 top-full mt-1 min-w-[160px] bg-white rounded-lg shadow-lg z-[60] border border-gray-200"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="py-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResourcesNavigate("/blog");
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`py-2 px-4 w-full text-left block font-gotham font-normal transition-colors duration-300 whitespace-nowrap hover:text-[#54B0AF] ${
                    pathname === "/blog"
                      ? "text-[#54B0AF] font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {/* Inner Voice */}
                  Blog
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResourcesNavigate("https://clarity.mystocai.com/psy-quiz");
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`py-2 px-4 w-full text-left block font-gotham transition-colors duration-300 whitespace-nowrap hover:text-[#54B0AF] ${
                    pathname === "/quiz"
                      ? "bg-[#54B0AF] text-white font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Quiz
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Resources Dropdown */}
        <div className="block lg:hidden w-full">
          <button
            onClick={() => setResourcesOpen(!resourcesOpen)}
            className={`px-4 w-full flex items-center justify-start transition-colors duration-300 rounded-3xl font-gotham text-lg ${
              isResourcesActive
                ? "bg-[#54B0AF] text-white font-bold"
                : "text-gray-700 hover:text-[#54B0AF]"
            }`}
          >
            Resources&nbsp;
            <FaChevronDown
              className={`text-sm transition-transform duration-200 ${
                resourcesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {resourcesOpen && (
            <div className="mt-2 w-full bg-white rounded-lg shadow-lg z-50 border border-gray-200">
              <div className="py-2">
                <button
                  onClick={() => handleResourcesNavigate("/blog")}
                  className={`py-2 px-6 w-full text-left block transition-colors duration-300 whitespace-nowrap font-gotham ${
                    pathname === "/blog"
                      ? "bg-[#54B0AF] text-white font-bold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {/* Inner Voice */}
                  Blog
                </button>
                <button
                  onClick={() => handleResourcesNavigate("https://clarity.mystocai.com/psy-quiz")}
                  className={`py-2 px-6 w-full text-left block transition-colors duration-300 whitespace-nowrap font-gotham ${
                    pathname === "/quiz"
                      ? "bg-[#54B0AF] text-white font-bold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

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
        
        {/* Resources Dropdown */}
        <li>
          <ResourcesDropdown />
        </li>
      </ul>

      {/* Login Button or User Avatar - Desktop */}
      <div className="hidden lg:block absolute right-4">
        {user ? (
          <div className="relative user-menu-container">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center font-gotham space-x-2 bg-[#54B0AF] hover:bg-[#459190] transition-colors rounded-full p-1 font-bold"
            >
              <Image
                // src={`https://ui-avatars.com/api/?name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}&background=459190&color=fff&size=32`}
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(`${user.firstName.charAt(0)}`)}&background=54B0AF&bold=true&color=fff&size=32&font-size=0.7`}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-8 h-8 rounded-full"
              />
              {/* <span className="text-white font-gotham font-medium text-sm">
                {user.firstName}
              </span> */}
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 p-1 w-36 bg-white rounded-b-md shadow-xl z-50">
                <div className="py-2 px-4 text-center border-b border-gray-400">
                  <p className="text-base font-gotham font-semibold text-[#323232]">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div className="py-1">
                  <button
                  onClick={handleLogout}
                  className="w-full py-2 text-center text-base font-gotham font-semibold text-[#323232] hover:bg-gray-100 transition-colors"
                >
                  Logout
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
      </div>

      {/* Hamburger Menu Button - visible on screens smaller than lg */}
      <button
        className="lg:hidden fixed right-4 z-50 p-2 cursor-pointer"
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
        <div className="lg:hidden fixed inset-0 bg-white z-40 flex flex-col items-center py-20 mt-[30px]">
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
            
            {/* Resources Dropdown Mobile */}
            <li className="w-full max-w-xs flex justify-center">
              <ResourcesDropdown />
            </li>
            
            {/* Login Button or User Info - Mobile */}
            <li>
              {user ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-3 font-gotham font-bold bg-[#54B0AF] text-white py-2 px-4 rounded-full">
<Image
  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
    `${user.firstName[0]}${user.lastName[0]}`
  )}&background=54B0AF&color=fff&size=32`}
  alt={`${user.firstName} ${user.lastName}`}
  width={32}
  height={32}
  className="rounded-full font-gotham font-bold"
/>

                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-red-500 text-white font-medium py-2 px-8 rounded-full text-center font-gotham text-sm hover:bg-red-600 transition-colors"
                  >
                    Logout
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