"use client";

import { useState } from "react";
import { TrendingUp, Users, Target, Zap, Eye, MessageSquare, Rocket, ArrowRight } from "lucide-react";

export default function QuizHomePage() {
    const [activeIndex, setActiveIndex] = useState(0);

    const promotionIndices = [
        {
            id: 0,
            emoji: "👥",
            icon: Users,
            title: "Stakeholder Bet Index",
            description: "Do decision-makers see you as a low-risk bet for next level?"
        },
        {
            id: 1,
            emoji: "📢",
            icon: Eye,
            title: "Visibility Signal Index",
            description: "Are you sending leadership-coded updates in rooms that matter?"
        },
        {
            id: 2,
            emoji: "🤝",
            icon: Users,
            title: "Advocacy Depth Index",
            description: "Do you have sponsors beyond your manager making clear asks?"
        },
        {
            id: 3,
            emoji: "🎯",
            icon: Target,
            title: "Execution→Impact Index",
            description: "Do you tie work to business KPIs in numbers (₹, %, risk, time)?"
        },
        {
            id: 4,
            emoji: "💬",
            icon: MessageSquare,
            title: "Communication & Presence Index",
            description: "Clear asks, handles pushback with executive presence"
        },
        {
            id: 5,
            emoji: "🚀",
            icon: Rocket,
            title: "Momentum Signals Index",
            description: "Recent scope expansion, promo chats, high-viz tasks (last 60–90 days)"
        }
    ];

    const features = [
        {
            icon: <TrendingUp className="h-8 w-8" />,
            title: "Data-Driven Insights",
            description: "Get objective scores across 6 critical promotion indicators"
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Stakeholder Intelligence",
            description: "Understand how decision-makers perceive your readiness"
        },
        {
            icon: <Target className="h-8 w-8" />,
            title: "Actionable Roadmap",
            description: "Receive personalized action items to accelerate your timeline"
        },
        {
            icon: <Zap className="h-8 w-8" />,
            title: "Quick Assessment",
            description: "Complete in 10 minutes and get instant results"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute top-4 left-4 md:top-4 md:left-8">
                    <img src="/bcl-logo.png" alt="BCL Logo" className="h-32 w-auto" />
                </div>
                <div className="bg-white text-foreground mt-32 py-12 px-4">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#0B64F4] font-['Montserrat',sans-serif]">
                            Will You Get Promoted?
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-black font-['Plus_Jakarta_Sans',sans-serif]">
                            Find out where you stand with our comprehensive promotion readiness assessment
                        </p>
                        <a
                            href="/quiz/assessment"
                            className="inline-flex items-center justify-center w-full sm:w-[50%] bg-gradient-to-r from-[#024BAB] to-[#3C83F6] hover:opacity-90 rounded-[10px] md:rounded-[12px] text-white lg:text-[20px] lg:min-h-[72px] font-semibold py-3 md:py-4 transition-all font-['Plus_Jakarta_Sans',sans-serif]"
                        >
                            Start Your Assessment
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                        <p className="mt-4 text-sm text-black font-['Plus_Jakarta_Sans',sans-serif]">
                            Takes 10 minutes · Get instant results
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
                {/* Icon */}
                <div className="flex justify-center mb-6 lg:mb-7">
                    <div className="w-14 h-14 lg:w-[64px] lg:h-[64px] bg-[#0B64F4] rounded-[16px] flex items-center justify-center">
                        <TrendingUp className="text-white w-9 h-9" />
                    </div>
                </div>

                {/* Subheading */}
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-center mb-8 text-black">
                    Why Take This Assessment?
                </h3>

                {/* Highlighted Quote / Main Value Prop */}
                <div className="bg-[#0B64F4] relative z-10 text-white text-center rounded-[16px] px-6 py-6 lg:py-8 max-w-[896px] mx-auto translate-y-6">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-['Plus_Jakarta_Sans',sans-serif] font-bold leading-normal">
                        Our assessment evaluates you across 6 research-backed indices that predict promotion success
                    </p>
                </div>

                {/* Features Grid Section */}
                <div className="bg-[#F5F5F5] py-12 lg:py-16 rounded-[31.5px] px-6 md:px-12 pt-16">
                    {/* Features Grid (Row Layout) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                        {features.map((feature, i) => (
                            <div key={i} className="bg-white rounded-[16px] p-6 shadow-md text-center">
                                {/* Icon */}
                                <div className="flex justify-center mb-4">
                                    <div className="bg-[#0B64F41A] w-12 h-12 flex items-center justify-center rounded-full">
                                        <div className="text-[#0B64F4] [&>svg]:w-6 [&>svg]:h-6">{feature.icon}</div>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <h4 className="text-base sm:text-lg font-bold font-['Plus_Jakarta_Sans',sans-serif] text-black mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-sm text-gray-600 font-['Plus_Jakarta_Sans',sans-serif] font-normal">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Assessment Pillars - Tabbed UI */}
            <div className="bg-white py-12 px-2 sm:px-4 mb-16">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0B64F4] font-['Montserrat',sans-serif]">
                        The 6 Promotion Indices
                    </h2>
                </div>

                {/* Tabs Container */}
                <div className="rounded-[17px] shadow-lg overflow-hidden border border-gray-200 max-w-5xl mx-auto">
                    {/* Tab Buttons */}
                    <div className="relative z-20 flex justify-center overflow-x-auto gap-2 p-3 bg-gray-100">
                        {promotionIndices.map((index, i) => {
                            const IconComponent = index.icon;
                            return (
                                <button
                                    key={index.id}
                                    onClick={() => setActiveIndex(i)}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-all duration-300 ease-in-out whitespace-nowrap ${activeIndex === i
                                        ? "bg-[#0B64F4] text-white rounded-[8px] shadow-md"
                                        : "bg-white text-gray-700 rounded-[8px] hover:bg-gray-50 border border-gray-200"
                                        }`}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span className="hidden sm:inline">{index.title.split(' ')[0]}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab Content */}
                    <div className="relative z-10 p-8 sm:p-10 bg-white">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl md:text-3xl font-bold text-black font-['Montserrat',sans-serif] mb-3">
                                {promotionIndices[activeIndex].title}
                            </h3>
                            <p className="text-lg text-gray-700 font-['Plus_Jakarta_Sans',sans-serif]">
                                {promotionIndices[activeIndex].description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center px-4 pb-12">
                <div className="p-12 shadow-lg bg-gradient-to-b from-[#0F182C] to-[#0B63F0] text-white rounded-[24px] max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 font-['Montserrat',sans-serif]">
                        Ready to Discover Your Promotion Readiness?
                    </h2>
                    <p className="text-xl mb-8 text-white/90 font-['Plus_Jakarta_Sans',sans-serif]">
                        Get your personalized score and actionable insights in minutes
                    </p>
                    <a
                        href="/quiz/assessment"
                        className="inline-flex items-center justify-center bg-[radial-gradient(circle_at_center,_#FFFFFF_0%,_#ADADAD_200%)] text-black font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg sm:text-xl md:text-[24px] px-8 sm:px-10 py-6 sm:py-7 h-auto rounded-xl shadow-xl hover:opacity-90 transition"
                    >
                        Begin Assessment Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </div>
        </div>
    );
}
