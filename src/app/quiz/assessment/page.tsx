"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import EmailGateModal from "@/components/quiz/EmailGateModal";
import { AssessmentData } from "@/components/quiz/assessmentData";

const assessmentQuestions = [
    {
        category: "sbi",
        title: "Stakeholder Bet Index",
        questions: [
            {
                id: "sbi1",
                text: "Decision-makers actively seek your input on strategic decisions",
                weight: 1.5
            },
            {
                id: "sbi2",
                text: "You're invited to meetings above your current level",
                weight: 1.3
            },
            {
                id: "sbi3",
                text: "Leadership references your work in key discussions",
                weight: 1.2
            },
        ]
    },
    {
        category: "vsi",
        title: "Visibility Signal Index",
        questions: [
            {
                id: "vsi1",
                text: "You regularly share updates in high-visibility channels",
                weight: 1.4
            },
            {
                id: "vsi2",
                text: "Your achievements are known beyond your immediate team",
                weight: 1.3
            },
            {
                id: "vsi3",
                text: "You present in forums attended by senior leadership",
                weight: 1.3
            },
        ]
    },
    {
        category: "adi",
        title: "Advocacy Depth Index",
        questions: [
            {
                id: "adi1",
                text: "You have sponsors beyond your direct manager",
                weight: 1.5
            },
            {
                id: "adi2",
                text: "Senior leaders advocate for your career progression",
                weight: 1.4
            },
            {
                id: "adi3",
                text: "You make clear, specific asks for support",
                weight: 1.1
            },
        ]
    },
    {
        category: "eii",
        title: "Execution→Impact Index",
        questions: [
            {
                id: "eii1",
                text: "You quantify your work in business metrics (₹, %, time saved)",
                weight: 1.5
            },
            {
                id: "eii2",
                text: "Your projects directly tie to company KPIs",
                weight: 1.4
            },
            {
                id: "eii3",
                text: "You track and communicate ROI of your initiatives",
                weight: 1.2
            },
        ]
    },
    {
        category: "cpi",
        title: "Communication & Presence Index",
        questions: [
            {
                id: "cpi1",
                text: "You make clear, concise asks in meetings",
                weight: 1.2
            },
            {
                id: "cpi2",
                text: "You handle pushback professionally and confidently",
                weight: 1.3
            },
            {
                id: "cpi3",
                text: "Your communication style matches senior leadership",
                weight: 1.3
            },
        ]
    },
    {
        category: "msi",
        title: "Momentum Signals Index",
        questions: [
            {
                id: "msi1",
                text: "Your scope has expanded in the last 60-90 days",
                weight: 1.4
            },
            {
                id: "msi2",
                text: "You've had conversations about promotion timeline",
                weight: 1.3
            },
            {
                id: "msi3",
                text: "You've been assigned high-visibility projects recently",
                weight: 1.3
            },
        ]
    },
];

const options = [
    { value: "1", label: "Strongly Disagree" },
    { value: "2", label: "Disagree" },
    { value: "3", label: "Neutral" },
    { value: "4", label: "Agree" },
    { value: "5", label: "Strongly Agree" },
];

export default function AssessmentPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [pendingData, setPendingData] = useState<AssessmentData | null>(null);

    const currentCategory = assessmentQuestions[currentStep];
    const progress = ((currentStep + 1) / assessmentQuestions.length) * 100;

    const handleAnswer = (questionId: string, value: string) => {
        setAnswers({ ...answers, [questionId]: parseInt(value) });
    };

    const allQuestionsAnswered = currentCategory.questions.every(
        q => answers[q.id] !== undefined
    );

    const handleNext = () => {
        if (currentStep < assessmentQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Calculate all assessment data
            const scores = calculateScores();
            const persona = getPersona(scores.overall);
            const insights = getInsights(scores);
            const actionItems = getActionItems(scores);

            const assessmentData: AssessmentData = {
                scores,
                persona,
                insights,
                actionItems,
            };

            // Store and show modal
            setPendingData(assessmentData);
            setShowEmailModal(true);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const calculateScores = () => {
        const categoryScores: Record<string, number> = {};

        assessmentQuestions.forEach(category => {
            let totalScore = 0;
            let totalWeight = 0;

            category.questions.forEach(question => {
                const answer = answers[question.id] || 0;
                totalScore += answer * question.weight;
                totalWeight += 5 * question.weight; // Max score per question is 5
            });

            categoryScores[category.category] = (totalScore / totalWeight) * 100;
        });

        const overallScore = Object.values(categoryScores).reduce((a, b) => a + b, 0) / 6;

        return { overall: overallScore, categories: categoryScores };
    };

    const getPersona = (score: number) => {
        if (score >= 80) return {
            title: "Promotion-Ready Professional",
            description: "You're demonstrating strong signals across key promotion indicators. Your stakeholders see you as a low-risk bet for the next level."
        };
        if (score >= 60) return {
            title: "Rising Performer",
            description: "You're on the right track with solid foundations. Focus on strengthening specific areas to accelerate your promotion timeline."
        };
        if (score >= 40) return {
            title: "Developing Talent",
            description: "You have growth potential. Strategic improvements in key areas will significantly enhance your promotion readiness."
        };
        return {
            title: "Building Foundations",
            description: "Focus on establishing core competencies. Consistent effort in targeted areas will create momentum toward promotion."
        };
    };

    const getInsights = (scores: { overall: number; categories: Record<string, number> }) => {
        const insights = [];
        const categories = scores.categories;
        const categoryNames: Record<string, string> = {
            sbi: "Stakeholder Bet",
            vsi: "Visibility Signal",
            adi: "Advocacy Depth",
            eii: "Execution→Impact",
            cpi: "Communication & Presence",
            msi: "Momentum Signals",
        };

        const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);
        const strongest = sortedCategories[0];
        const weakest = sortedCategories[sortedCategories.length - 1];

        insights.push({
            title: "Your Superpower",
            description: `${categoryNames[strongest[0]]} is your strongest area at ${Math.round(strongest[1])}%. This is a key differentiator that you should continue to leverage.`
        });

        if (weakest[1] < 50) {
            insights.push({
                title: "Critical Focus Area",
                description: `${categoryNames[weakest[0]]} needs immediate attention at ${Math.round(weakest[1])}%. This could be a blocker for promotion discussions.`
            });
        }

        if (categories.msi && categories.msi > 60 && categories.vsi && categories.vsi > 60) {
            insights.push({
                title: "Promotion Window",
                description: "Your momentum and visibility scores suggest you're in an active promotion window. Now is the time to have explicit conversations with your manager."
            });
        }

        return insights;
    };

    const getActionItems = (scores: { overall: number; categories: Record<string, number> }) => {
        const actions = [];
        const categories = scores.categories;

        if (categories.sbi && categories.sbi < 60) {
            actions.push({
                title: "Build Executive Relationships",
                description: "Schedule 1-on-1 coffee chats with 2-3 senior leaders this quarter",
                priority: "high"
            });
        }

        if (categories.vsi && categories.vsi < 60) {
            actions.push({
                title: "Increase Visibility",
                description: "Share weekly updates in company-wide channels highlighting business impact",
                priority: "high"
            });
        }

        if (categories.adi && categories.adi < 60) {
            actions.push({
                title: "Secure Sponsors",
                description: "Identify and make specific asks to 2 potential sponsors outside your reporting line",
                priority: "high"
            });
        }

        if (categories.eii && categories.eii < 60) {
            actions.push({
                title: "Quantify Your Impact",
                description: "Document all projects with business metrics (₹, %, time saved) for the last quarter",
                priority: "medium"
            });
        }

        if (categories.cpi && categories.cpi < 60) {
            actions.push({
                title: "Refine Communication",
                description: "Practice concise, executive-level communication. Record and review your next presentation",
                priority: "medium"
            });
        }

        if (categories.msi && categories.msi < 60) {
            actions.push({
                title: "Create Momentum",
                description: "Volunteer for a high-visibility project launching in the next 60 days",
                priority: "high"
            });
        }

        actions.push({
            title: "Schedule Promotion Discussion",
            description: "Have an explicit conversation with your manager about promotion timeline and requirements",
            priority: "high"
        });

        return actions.slice(0, 6);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <div className="container max-w-6xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-4xl font-bold font-['Montserrat',sans-serif] text-black">Promotion Readiness Assessment</h1>
                        <span className="text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">
                            Step {currentStep + 1} of {assessmentQuestions.length}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-[#0B64F4] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="p-10 bg-white/90 backdrop-blur-sm shadow-2xl rounded-[24px] border border-gray-100">
                    <div className="mb-8">
                        <h2 className="text-3xl font-semibold mb-2 text-[#0B64F4] font-['Montserrat',sans-serif]">
                            {currentCategory.title}
                        </h2>
                        <p className="text-lg text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">
                            Rate each statement based on your current situation
                        </p>
                    </div>

                    <div className="space-y-8">
                    {currentCategory.questions.map((question, index) => (
                        <div key={question.id} className="space-y-4">
                        <label className="text-xl font-medium font-['Plus_Jakarta_Sans',sans-serif] text-black block">
                            {index + 1}. {question.text}
                        </label>

                        {/* OPTIONS ROW */}
                        <div className="flex flex-wrap gap-6 md:gap-12">
                            {options.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center gap-3 cursor-pointer"
                            >
                                <input
                                type="radio"
                                name={question.id}
                                value={option.value}
                                checked={answers[question.id] === parseInt(option.value)}
                                onChange={(e) => handleAnswer(question.id, e.target.value)}
                                className="w-5 h-5 text-[#0B64F4] border-gray-300 focus:ring-[#0B64F4] cursor-pointer"
                                />
                                <span className="font-normal text-lg font-['Plus_Jakarta_Sans',sans-serif] text-gray-700">
                                {option.label}
                                </span>
                            </label>
                            ))}
                        </div>
                        </div>
                    ))}
                    </div>

                    <div className="flex justify-between mt-10">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-['Plus_Jakarta_Sans',sans-serif] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!allQuestionsAnswered}
                            className="px-6 py-3 rounded-xl bg-[#0B64F4] hover:bg-[#0B64F4]/90 text-white font-['Plus_Jakarta_Sans',sans-serif] font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 cursor-pointer"
                        >
                            {currentStep === assessmentQuestions.length - 1 ? "View Results" : "Next"}
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Email Gate Modal */}
            {pendingData && (
                <EmailGateModal
                    isOpen={showEmailModal}
                    onClose={() => setShowEmailModal(false)}
                    assessmentData={pendingData}
                />
            )}
        </div>
    );
}
