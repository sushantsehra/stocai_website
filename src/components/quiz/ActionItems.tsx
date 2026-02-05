"use client";

import { CheckCircle2 } from "lucide-react";

interface ActionItemsProps {
    scores: {
        overall: number;
        categories: Record<string, number>;
    };
}

const ActionItems = ({ scores }: ActionItemsProps) => {
    const getActionItems = () => {
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

        actions.push({
            title: "Create Promotion Doc",
            description: "Start a promotion packet documenting impact, metrics, and stakeholder feedback",
            priority: "medium"
        });

        return actions.slice(0, 6);
    };

    const actions = getActionItems();

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="h-6 w-6 text-[#0B64F4]" />
                <h2 className="text-2xl font-semibold font-['Montserrat',sans-serif] text-[#0B64F4]">Action Plan</h2>
            </div>
            <div className="space-y-4">
                {actions.map((action, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-[#0B64F4] focus:ring-[#0B64F4]" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold font-['Montserrat',sans-serif] text-black">{action.title}</h3>
                                <span className={`text-xs px-2 py-0.5 rounded font-['Plus_Jakarta_Sans',sans-serif] ${action.priority === 'high'
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-yellow-100 text-yellow-600'
                                    }`}>
                                    {action.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">{action.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActionItems;
