"use client";

import { Lightbulb } from "lucide-react";

interface InsightsCardProps {
    scores: {
        overall: number;
        categories: Record<string, number>;
    };
}

const InsightsCard = ({ scores }: InsightsCardProps) => {
    const getInsights = () => {
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

        if (categories.sbi && categories.sbi < 50 && scores.overall > 60) {
            insights.push({
                title: "Stakeholder Gap",
                description: "While you have strong fundamentals, building executive relationships is crucial. Schedule 1-on-1s with decision-makers to increase your stakeholder bet."
            });
        }

        return insights;
    };

    const insights = getInsights();

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="h-6 w-6 text-[#0B64F4]" />
                <h2 className="text-2xl font-semibold font-['Montserrat',sans-serif] text-[#0B64F4]">Key Insights</h2>
            </div>
            <div className="space-y-6">
                {insights.map((insight, index) => (
                    <div key={index} className="border-l-4 border-[#0B64F4] pl-4">
                        <h3 className="font-semibold text-lg mb-2 font-['Montserrat',sans-serif] text-black">{insight.title}</h3>
                        <p className="text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">{insight.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InsightsCard;
