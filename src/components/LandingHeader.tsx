"use client";

import React, { useEffect, useState } from "react";
import bclLogo from "../assets/bcl.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getAppUrl, getSignupUrl } from "@/utils/env";
import { useUser } from "@/contexts/UserContext";
import { deleteAuthCookie, deleteUserCookie, setLogoutSignal } from "@/utils/cookies";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useUser();

    const navigateToSection = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      setMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

    const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (pathname !== "/") {
      router.push("/#waitlist");
      setMenuOpen(false);
      return;
    }

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

const handleLoginRedirect = () => {
  window.location.href = getSignupUrl("/");
};

  const handleContinueLearning = () => {
    setShowUserMenu(false);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setLogoutSignal();
    deleteAuthCookie("community_access_token");
    deleteUserCookie();
    setUser(null);
    setShowUserMenu(false);
    setMenuOpen(false);
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showUserMenu && !target.closest(".landing-user-menu")) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);


  return (
    <header className="w-full bg-white mt-2">
      <div className="max-w-full flex justify-between items-center pr-4">
        {/* Logo */}
        <Link href="/" className="ml-4">
          <Image
            src={bclLogo}
            alt="BCL Logo"
            width={180}
            height={50}
            className="object-contain w-[110px] h-auto sm:w-[130px] md:w-[150px] lg:w-[180px]"
          />
        </Link>

        <div className="flex lg:mr-24">
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-black/80 font-normal text-[14px] items-center mr-6">
            <button onClick={() => navigateToSection("true-section")} className="hover:text-[#0B64F4] font-jakarta cursor-pointer">
              About Us
            </button>
            <button onClick={() => navigateToSection("framework")} className="hover:text-[#0B64F4] font-jakarta cursor-pointer">
              Program
            </button>
            <button onClick={() => navigateToSection("faq")} className="hover:text-[#0B64F4] font-jakarta cursor-pointer">
              FAQ
            </button>
          </nav>

        <div className="flex items-center space-x-3 lg:space-x-4">
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <button
              onClick={scrollToWaitlist}
              className="bg-[#0B64F4] hover:bg-blue-700 text-white text-[14px] px-4 py-2 rounded-[12px] font-jakarta cursor-pointer font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Get Early Access
            </button>

            {user ? (
              <div className="landing-user-menu relative">
                <button
                  onClick={() => setShowUserMenu((current) => !current)}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-[#0B64F4] px-2 py-1 text-white transition hover:bg-blue-700"
                >
                  <Image
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}&background=ffffff&color=0B64F4&size=32&bold=true`}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="pr-2 text-[14px] font-bold font-jakarta">
                    {user.firstName}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-44 rounded-[14px] border border-slate-200 bg-white p-2 shadow-xl">
                    <div className="border-b border-slate-200 px-3 py-2">
                      <p className="font-jakarta text-sm font-semibold text-slate-900">
                        {user.firstName} {user.lastName}
                      </p>
                      {user.email ? (
                        <p className="mt-1 text-xs text-slate-500">{user.email}</p>
                      ) : null}
                    </div>
                    <Link
                      href={`${getAppUrl()}/`}
                      onClick={handleContinueLearning}
                      className="mt-2 block w-full cursor-pointer rounded-[10px] px-3 py-2 text-left font-jakarta text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Continue Your Learning
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full cursor-pointer rounded-[10px] px-3 py-2 text-left font-jakarta text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={handleLoginRedirect} 
                className="bg-gradient-to-l from-[#C5C5C5] to-[#FFFFFF] hover:bg-gray-200 text-[#3F3F3F] font-jakarta cursor-pointer text-[14px] px-4 py-2 rounded-[12px] font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              >
                Sign In / Login
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}

            <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex cursor-pointer flex-col justify-center items-center gap-[4px] rounded-[4px] shadow-3xl border border-gray-100 p-2"
          >
            <span className="w-5 h-[2.5px] bg-[#7A7777]"></span>
            <span className="w-5 h-[2.5px] bg-[#7A7777]"></span>
            <span className="w-5 h-[2.5px] bg-[#7A7777]"></span>
          </button>
          </div>
    
        </div>

        </div>

      {menuOpen && (
        <div className="md:hidden fixed top-20 right-14 bg-white rounded-[16px] shadow-xl p-2.5 w-[220px] z-[9999]">
          <div className="flex flex-col gap-2.5 text-[14px] font-medium">
            <button onClick={() => navigateToSection("true-section")} className="text-black/80 hover:text-[#0B64F4] font-jakarta">
              About Us
            </button>
            <button onClick={() => navigateToSection("framework")} className="text-black/80 hover:text-[#0B64F4] font-jakarta">
              Program
            </button>
            <button onClick={() => navigateToSection("faq")} className="text-black/80 hover:text-[#0B64F4] font-jakarta">
              FAQ
            </button>
            <hr />

            <button
              onClick={scrollToWaitlist}
              className="cursor-pointer bg-[#0B64F4] text-white py-2 rounded-[4px] font-jakarta font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Get Early Access
            </button>

            {user ? (
              <>
                <div className="flex items-center justify-center gap-3 rounded-[10px] bg-[#0B64F4] px-3 py-2 text-white">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}&background=ffffff&color=0B64F4&size=32&bold=true`}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="font-jakarta text-sm font-bold">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <Link
                  href={`${getAppUrl()}/`}
                  onClick={handleContinueLearning}
                  className="cursor-pointer rounded-[4px] bg-[#0B64F4] py-2 text-center font-jakarta font-bold text-white transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  Continue your learning
                </Link>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer rounded-[4px] bg-slate-100 py-2 font-jakarta font-bold text-slate-700 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => {setMenuOpen(false); handleLoginRedirect()}} 
                className="bg-gradient-to-l from-[#C5C5C5] to-[#FFFFFF] text-[#3F3F3F] py-2 rounded-[4px] font-jakarta font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              >
                Sign In / Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
