// Assessment questions data and scoring logic

export const assessmentQuestions = [
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
                text: "Your projects show clear ROI or strategic value",
                weight: 1.4
            },
            {
                id: "eii3",
                text: "You proactively identify and solve business problems",
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
                text: "You communicate concisely at executive level",
                weight: 1.3
            },
            {
                id: "cpi2",
                text: "Your presence commands attention in meetings",
                weight: 1.2
            },
            {
                id: "cpi3",
                text: "You adapt communication style to your audience",
                weight: 1.1
            },
        ]
    },
    {
        category: "msi",
        title: "Momentum Signals Index",
        questions: [
            {
                id: "msi1",
                text: "You're involved in high-visibility strategic projects",
                weight: 1.5
            },
            {
                id: "msi2",
                text: "Your scope of responsibility is expanding",
                weight: 1.4
            },
            {
                id: "msi3",
                text: "You're being prepared for next-level challenges",
                weight: 1.3
            },
        ]
    },
];

export const answerOptions = [
    { value: "1", label: "Strongly Disagree" },
    { value: "2", label: "Disagree" },
    { value: "3", label: "Neutral" },
    { value: "4", label: "Agree" },
    { value: "5", label: "Strongly Agree" },
];

export const categoryInfo = {
    sbi: { name: "Stakeholder Bet", icon: "👥", color: "text-blue-600" },
    vsi: { name: "Visibility Signal", icon: "📢", color: "text-purple-600" },
    adi: { name: "Advocacy Depth", icon: "🤝", color: "text-teal-600" },
    eii: { name: "Execution→Impact", icon: "🎯", color: "text-green-600" },
    cpi: { name: "Communication & Presence", icon: "💬", color: "text-orange-600" },
    msi: { name: "Momentum Signals", icon: "🚀", color: "text-red-600" },
};

export interface AssessmentData {
    scores: {
        overall: number;
        categories: Record<string, number>;
    };
    persona: {
        title: string;
        description: string;
    };
    insights: Array<{ title: string; description: string }>;
    actionItems: Array<{ title: string; description: string; priority: string }>;
}

export const calculateScores = (answers: Record<string, number>) => {
    const categoryScores: Record<string, number> = {};

    assessmentQuestions.forEach(category => {
        let totalScore = 0;
        let totalWeight = 0;

        category.questions.forEach(question => {
            const answer = answers[question.id] || 0;
            totalScore += answer * question.weight;
            totalWeight += 5 * question.weight;
        });

        categoryScores[category.category] = (totalScore / totalWeight) * 100;
    });

    const overallScore = Object.values(categoryScores).reduce((a, b) => a + b, 0) / 6;

    return { overall: overallScore, categories: categoryScores };
};

export const getPersona = (score: number) => {
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

export const getInsights = (scores: { overall: number; categories: Record<string, number> }) => {
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

export const getActionItems = (scores: { overall: number; categories: Record<string, number> }) => {
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
