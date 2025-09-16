'use client';

import { useState } from 'react';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import google from "@/assets/google.jpeg"

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Form data states (UI only)
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [signinData, setSigninData] = useState({
    email: '',
    password: ''
  });

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
    password: ''
  });

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleForgotPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate loading for demo
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Form submitted successfully!');
    }, 2000);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulate Google login
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Google login successful!');
    }, 1500);
  };

  return (
    <div className="font-sans flex items-center justify-center w-full text-gray-900 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="w-full h-full bg-white"></div>
  
      </div>

      <div className="flex flex-row w-full">
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col w-full items-center justify-center relative z-10">
            
            {/* Header Section */}
            <div className="items-center w-full h-full flex flex-col justify-center flex-1">
              <div className="relative w-full text-center font-medium text-2xl tracking-[0] leading-[normal]">
                
                {/* Dynamic Headers */}
                {isLogin ? (
                  forgotPassword ? (
                    <>
                      <h3 className="font-medium text-xl font-gotham text-center">
                        Don&apos;t Worry we will handle it
                      </h3>
                      <h2 className="font-bold text-[#323232] text-4xl text-center mb-4">
                        Reset your password
                      </h2>
                    </>
                  ) : (
                    <>
                      <h3 className="font-medium font-gotham text-xl text-center">
                        Welcome Back
                      </h3>
                      <h2 className="font-bold font-gotham text-[#323232] text-3xl text-center mb-2">
                        Get back to it
                      </h2>
                    </>
                  )
                ) : (
                  <>
                    <h3 className="font-medium font-gotham text-xl text-center">
                      Let&apos;s get started
                    </h3>
                    <h2 className="font-bold font-gotham text-[#323232] text-4xl text-center mb-4">
                      Create new account
                    </h2>
                  </>
                )}

                {/* Success/Error Messages */}
                {successMessage && (
                  <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-4">
                    <FaCheckCircle className="mr-2" /> {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4">
                    <FaExclamationCircle className="mr-2" /> {errorMessage}
                  </div>
                )}

                {/* Google Login Button */}
                {!forgotPassword && (
                  <div className="flex justify-center space-x-4 mt-6">
                    <button
                      onClick={handleGoogleLogin}
                      disabled={loading}
                      className="flex items-center justify-center w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50"
                    >
                      {/* <FaGoogle className="mr-3 text-red-500" /> */}
                        <Image
                        src={google}
                        alt="google-logo"
                        width={25}
                        height={25}
                        className="object-cover mr-3"
                        />
                      <span className="font-medium font-gotham text-[#323232]">
                        Continue with Google
                      </span>
                    </button>
                  </div>
                )}

                {/* OR Divider */}
                {!forgotPassword && (
                  <div className="relative text-center text-[#323232] my-6">
                    <div className="absolute inset-0 flex items-center">
                    </div>
                    <span className="font-medium text-[#323232] font-gotham text-[20px] bg-white px-4">
                      OR
                    </span>
                  </div>
                )}

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                  {!isLogin ? (
                    /* Signup Form */
                    <>
                      <div className="flex items-center pt-3 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name *"
                          value={signupData.fullName}
                          onChange={handleSignupChange}
                          required
                          className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500"
                        />
                      </div>

                      <div className="flex items-center pt-0 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email *"
                          value={signupData.email}
                          onChange={handleSignupChange}
                          required
                          className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500"
                        />
                      </div>

                      <div className="flex items-center pt-0 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
                        <input
                          type="password"
                          name="password"
                          placeholder="Password *"
                          value={signupData.password}
                          onChange={handleSignupChange}
                          required
                          className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500"
                        />
                      </div>

                      <div className="pt-6">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex items-center justify-center w-full px-6 py-5 bg-[#54b0af] rounded-2xl overflow-hidden hover:bg-[#4a9998] transition-colors disabled:opacity-50"
                        >
                          {loading ? (
                            <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          ) : (
                            <span className="font-medium font-gotham text-white text-xl">
                              Create Account
                            </span>
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Login/Forgot Password Forms */
                    <>
                      {forgotPassword ? (
                        /* Forgot Password Form */
                        <>
                          <div className="flex items-center pt-3 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
                            <input
                              type="email"
                              name="email"
                              placeholder="Email *"
                              value={forgotPasswordData.email}
                              onChange={handleForgotPasswordChange}
                              required
                              className="relative w-full p-4 font-medium text-lg tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500"
                            />
                          </div>

                          <div className="flex items-center pt-0 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
                            <input
                              type="password"
                              name="password"
                              placeholder="New Password *"
                              value={forgotPasswordData.password}
                              onChange={handleForgotPasswordChange}
                              required
                              className="relative w-full p-4 font-medium text-lg tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500"
                            />
                          </div>

                          <div className="pt-6">
                            <button
                              type="submit"
                              disabled={loading}
                              className="flex items-center justify-center w-full px-6 py-5 bg-[#54b0af] rounded-2xl overflow-hidden hover:bg-[#4a9998] transition-colors disabled:opacity-50"
                            >
                              {loading ? (
                                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              ) : (
                                <span className="font-medium font-gotham text-white text-xl">
                                  Send OTP
                                </span>
                              )}
                            </button>
                          </div>
                        </>
                      ) : (
                        /* Login Form */
                        <>
                          <div className="flex items-center pt-3 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
                            <input
                              type="email"
                              name="email"
                              placeholder="Email *"
                              value={signinData.email}
                              onChange={handleSigninChange}
                              required
                              className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500"
                            />
                          </div>

                          <div className="flex items-center pt-0 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
                            <input
                              type="password"
                              name="password"
                              placeholder="Password *"
                              value={signinData.password}
                              onChange={handleSigninChange}
                              required
                              className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500"
                            />
                          </div>

                          <div className="pt-6">
                            <button
                              type="submit"
                              disabled={loading}
                              className="flex items-center justify-center w-full px-6 py-4 bg-[#54b0af] rounded-2xl overflow-hidden hover:bg-[#4a9998] transition-colors disabled:opacity-50"
                            >
                              {loading ? (
                                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              ) : (
                                <span className="font-medium text-white text-xl">
                                  Login
                                </span>
                              )}
                            </button>
                          </div>
                        </>
                      )}

                      {/* Forgot Password Toggle */}
                      <button
                        type="button"
                        onClick={() => setForgotPassword(!forgotPassword)}
                        className="text-[#54b0af] hover:text-[#4a9998] text-sm font-medium w-full text-center mt-2 transition-colors"
                      >
                        {forgotPassword ? (
                          <span className="flex items-center font-gotham justify-center">
                            <FiArrowLeft className="mr-2" /> Back to Login
                          </span>
                        ) : (
                          "Forgot Password?"
                        )}
                      </button>
                    </>
                  )}
                </form>

                {/* Toggle Login/Signup */}
                <div className="mt-6">
                  <p className="w-full text-center font-medium text-lg tracking-[0] leading-[30px]">
                    <span className="text-gray-500">
                      {isLogin ? "Don't have an account?" : "Already a member?"}
                    </span>{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setErrorMessage('');
                        setSuccessMessage('');
                        setForgotPassword(false);
                      }}
                      className="text-[#54b0af] hover:text-[#4a9998] font-semibold transition-colors"
                    >
                      {isLogin ? "Sign Up" : "Login"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;