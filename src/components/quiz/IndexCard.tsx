"use client";

interface IndexCardProps {
    title: string;
    icon: string;
    score: number;
    level: string;
    color: string;
}

const IndexCard = ({ title, icon, score, level }: IndexCardProps) => {
    const getProgressColor = (score: number) => {
        if (score >= 75) return "bg-green-500";
        if (score >= 50) return "bg-yellow-500";
        return "bg-red-500";
    };

    const getBadgeColor = (level: string) => {
        if (level === "Strong") return "bg-green-100 text-green-700";
        if (level === "Moderate") return "bg-yellow-100 text-yellow-700";
        return "bg-red-100 text-red-700";
    };

    return (
        <div className="p-5 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{icon}</span>
                <h3 className="font-semibold text-gray-900 font-['Montserrat',sans-serif]">{title}</h3>
            </div>

            <div className="flex items-center justify-between mb-3">
                <span className="text-3xl font-bold text-[#0B64F4] font-['Montserrat',sans-serif]">
                    {Math.round(score)}%
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium font-['Plus_Jakarta_Sans',sans-serif] ${getBadgeColor(level)}`}>
                    {level}
                </span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full ${getProgressColor(score)} transition-all duration-500`}
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    );
};

export default IndexCard;
