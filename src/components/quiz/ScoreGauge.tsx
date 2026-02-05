"use client";

interface ScoreGaugeProps {
    score: number;
}

const ScoreGauge = ({ score }: ScoreGaugeProps) => {
    const normalizedScore = Math.min(100, Math.max(0, score));
    const circumference = 2 * Math.PI * 80;
    const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

    const getScoreColor = (score: number) => {
        if (score >= 75) return "#22c55e";
        if (score >= 50) return "#eab308";
        return "#ef4444";
    };

    return (
        <div className="relative flex items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
                <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                />
                <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke={getScoreColor(normalizedScore)}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-bold text-[#0B64F4] font-['Montserrat',sans-serif]">
                    {Math.round(normalizedScore)}
                </span>
                <span className="text-gray-500 text-sm font-['Plus_Jakarta_Sans',sans-serif]">out of 100</span>
            </div>
        </div>
    );
};

export default ScoreGauge;
