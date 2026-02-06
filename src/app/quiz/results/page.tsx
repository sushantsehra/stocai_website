"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RotateCcw, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import env from "@/utils/env";
import ScoreGauge from "@/components/quiz/ScoreGauge";
import IndexCard from "@/components/quiz/IndexCard";
import InsightsCard from "@/components/quiz/InsightsCard";
import ActionItems from "@/components/quiz/ActionItems";
import { categoryInfo, getPersona } from "@/components/quiz/assessmentData";

interface AssessmentResult {
    scores: {
        overall: number;
        categories: Record<string, number>;
    };
    persona: {
        title: string;
        description: string;
    };
}

function ResultsContent() {
    const searchParams = useSearchParams();
    const assessmentId = searchParams.get("id");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<AssessmentResult | null>(null);

    useEffect(() => {
        if (assessmentId) {
            fetchAssessmentData(assessmentId);
        } else {
            setError("No assessment ID provided");
            setLoading(false);
        }
    }, [assessmentId]);

    const fetchAssessmentData = async (id: string) => {
        try {
            const response = await fetch(`${env.apiUrl}/assessment/${id}`);

            if (!response.ok) {
                throw new Error("Assessment not found");
            }

            const result = await response.json();

            if (result.ok && result.assessment) {
                const assessment = result.assessment;
                setData({
                    scores: {
                        overall: assessment.overall_score,
                        categories: {
                            sbi: assessment.category_scores.sbi,
                            vsi: assessment.category_scores.vsi,
                            adi: assessment.category_scores.adi,
                            eii: assessment.category_scores.eii,
                            cpi: assessment.category_scores.cpi,
                            msi: assessment.category_scores.msi,
                        },
                    },
                    persona: {
                        title: assessment.persona_title,
                        description: assessment.persona_description || getPersona(assessment.overall_score).description,
                    },
                });
            } else {
                throw new Error("Invalid assessment data");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load assessment");
        } finally {
            setLoading(false);
        }
    };

    const getScoreLevel = (score: number) => {
        if (score >= 75) return { label: "Strong", color: "success" };
        if (score >= 50) return { label: "Moderate", color: "warning" };
        return { label: "Needs Focus", color: "destructive" };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-[#0B64F4] mx-auto mb-4" />
                    <p className="text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">Loading your results...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="p-8 max-w-md text-center bg-white shadow-xl rounded-3xl">
                    <h2 className="text-2xl font-bold text-red-500 mb-4 font-['Montserrat',sans-serif]">
                        Assessment Not Found
                    </h2>
                    <p className="text-gray-600 mb-6 font-['Plus_Jakarta_Sans',sans-serif]">
                        {error}. The assessment may have expired or the link is invalid.
                    </p>
                    <a
                        href="/quiz"
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#0B64F4] hover:bg-[#0B64F4]/90 text-white font-['Plus_Jakarta_Sans',sans-serif] font-medium rounded-xl transition-colors"
                    >
                        Take New Assessment
                    </a>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const { scores, persona } = data;
    const overallLevel = getScoreLevel(scores.overall);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-b from-[#0F182C] to-[#0B64F4] text-white py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-['Montserrat',sans-serif]">
                                Your Promotion Readiness Report
                            </h1>
                            <p className="text-white/90 text-xl font-['Plus_Jakarta_Sans',sans-serif]">{persona.title}</p>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <Link
                                href="/"
                                className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-['Plus_Jakarta_Sans',sans-serif] font-medium flex items-center gap-2 transition-colors"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Learn About BCL
                            </Link>

                            <Link
                                href="/quiz"
                                className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-['Plus_Jakarta_Sans',sans-serif] font-medium flex items-center gap-2 transition-colors"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Retake Assessment
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Score and Persona */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-1 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
                        <ScoreGauge score={scores.overall} />
                        <div className="mt-4 text-center">
                            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${overallLevel.color === 'success' ? 'bg-green-100 text-green-700' :
                                    overallLevel.color === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                }`}>
                                {overallLevel.label}
                            </span>
                        </div>
                    </div>

                    <div className="lg:col-span-2 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-semibold mb-4 font-['Montserrat',sans-serif] text-[#0B64F4]">Persona Summary</h2>
                        <p className="text-gray-600 leading-relaxed text-lg font-['Plus_Jakarta_Sans',sans-serif]">
                            {persona.description}
                        </p>
                        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-3xl font-bold text-[#0B64F4] font-['Montserrat',sans-serif]">{Math.round(scores.overall)}%</div>
                                <div className="text-sm text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">Overall Score</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-[#0B64F4] font-['Montserrat',sans-serif]">
                                    {Object.values(scores.categories).filter((s) => s >= 70).length}
                                </div>
                                <div className="text-sm text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">Strong Areas</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-red-500 font-['Montserrat',sans-serif]">
                                    {Object.values(scores.categories).filter((s) => s < 50).length}
                                </div>
                                <div className="text-sm text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">Focus Areas</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Index Breakdown */}
                <h2 className="text-2xl font-semibold mb-6 font-['Montserrat',sans-serif] text-[#0B64F4]">Index Breakdown</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {Object.entries(scores.categories).map(([key, score]) => {
                        const info = categoryInfo[key as keyof typeof categoryInfo];
                        const level = getScoreLevel(score);
                        return (
                            <IndexCard
                                key={key}
                                title={info.name}
                                icon={info.icon}
                                score={score}
                                level={level.label}
                                color={level.color}
                            />
                        );
                    })}
                </div>

                {/* Insights and Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InsightsCard scores={scores} />
                    <ActionItems scores={scores} />
                </div>
            </div>
        </div>
    );
}

export default function QuizResultsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-[#0B64F4]" />
            </div>
        }>
            <ResultsContent />
        </Suspense>
    );
}

// "use client";

// import { useEffect, useState, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { RotateCcw, ExternalLink, Loader2 } from "lucide-react";
// import Link from "next/link";
// import env from "@/utils/env";
// import ScoreGauge from "@/components/quiz/ScoreGauge";
// import IndexCard from "@/components/quiz/IndexCard";
// import InsightsCard from "@/components/quiz/InsightsCard";
// import ActionItems from "@/components/quiz/ActionItems";
// import { categoryInfo, getPersona } from "@/components/quiz/assessmentData";

// interface AssessmentResult {
//     scores: {
//         overall: number;
//         categories: Record<string, number>;
//     };
//     persona: {
//         title: string;
//         description: string;
//     };
// }

// function ResultsContent() {
//     const searchParams = useSearchParams();
//     const assessmentId = searchParams.get("id");

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [data, setData] = useState<AssessmentResult | null>(null);

//     useEffect(() => {
//         if (assessmentId) {
//             fetchAssessmentData(assessmentId);
//         } else {
//             setError("No assessment ID provided");
//             setLoading(false);
//         }
//     }, [assessmentId]);

//     const fetchAssessmentData = async (id: string) => {
//         try {
//             const response = await fetch(`${env.apiUrl}/assessment/${id}`);

//             if (!response.ok) {
//                 throw new Error("Assessment not found");
//             }

//             const result = await response.json();

//             if (result.ok && result.assessment) {
//                 const assessment = result.assessment;
//                 setData({
//                     scores: {
//                         overall: assessment.overall_score,
//                         categories: {
//                             sbi: assessment.category_scores.sbi,
//                             vsi: assessment.category_scores.vsi,
//                             adi: assessment.category_scores.adi,
//                             eii: assessment.category_scores.eii,
//                             cpi: assessment.category_scores.cpi,
//                             msi: assessment.category_scores.msi,
//                         },
//                     },
//                     persona: {
//                         title: assessment.persona_title,
//                         description: assessment.persona_description || getPersona(assessment.overall_score).description,
//                     },
//                 });
//             } else {
//                 throw new Error("Invalid assessment data");
//             }
//         } catch (err) {
//             setError(err instanceof Error ? err.message : "Failed to load assessment");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getScoreLevel = (score: number) => {
//         if (score >= 75) return { label: "Strong", color: "success" };
//         if (score >= 50) return { label: "Moderate", color: "warning" };
//         return { label: "Needs Focus", color: "destructive" };
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <Loader2 className="w-12 h-12 animate-spin text-[#0B64F4] mx-auto mb-4" />
//                     <p className="text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">Loading your results...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="p-8 max-w-md text-center bg-white shadow-xl rounded-3xl">
//                     <h2 className="text-2xl font-bold text-red-500 mb-4 font-['Montserrat',sans-serif]">
//                         Assessment Not Found
//                     </h2>
//                     <p className="text-gray-600 mb-6 font-['Plus_Jakarta_Sans',sans-serif]">
//                         {error}. The assessment may have expired or the link is invalid.
//                     </p>
//                     <a
//                         href="/quiz"
//                         className="inline-flex items-center justify-center px-6 py-3 bg-[#0B64F4] hover:bg-[#0B64F4]/90 text-white font-['Plus_Jakarta_Sans',sans-serif] font-medium rounded-xl transition-colors"
//                     >
//                         Take New Assessment
//                     </a>
//                 </div>
//             </div>
//         );
//     }

//     if (!data) return null;

//     const { scores, persona } = data;
//     const overallLevel = getScoreLevel(scores.overall);

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <div className="bg-gradient-to-b from-[#0F182C] to-[#0B64F4] text-white py-12">
//                 <div className="container mx-auto px-4 max-w-6xl">
//                     <div className="flex justify-between items-start flex-wrap gap-4">
//                         <div>
//                             <h1 className="text-3xl md:text-4xl font-bold mb-2 font-['Montserrat',sans-serif]">
//                                 Your Promotion Readiness Report
//                             </h1>
//                             <p className="text-white/90 text-xl font-['Plus_Jakarta_Sans',sans-serif]">{persona.title}</p>
//                         </div>
//                         <div className="flex gap-3 flex-wrap">
//                             {/* <a
//                                 href="/"
//                                 className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-['Plus_Jakarta_Sans',sans-serif] font-medium flex items-center gap-2 transition-colors"
//                             >
//                                 <ExternalLink className="h-4 w-4" />
//                                 Learn About BCL
//                             </a>
//                             <a
//                                 href="/quiz"
//                                 className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-['Plus_Jakarta_Sans',sans-serif] font-medium flex items-center gap-2 transition-colors"
//                             >
//                                 <RotateCcw className="h-4 w-4" />
//                                 Retake Assessment
//                             </a> */}
//                             <Link
//   href="/"
//   className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-['Plus_Jakarta_Sans',sans-serif] font-medium flex items-center gap-2 transition-colors"
// >
//   <ExternalLink className="h-4 w-4" />
//   Learn About BCL
// </Link>

// <Link
//   href="/quiz"
//   className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-['Plus_Jakarta_Sans',sans-serif] font-medium flex items-center gap-2 transition-colors"
// >
//   <RotateCcw className="h-4 w-4" />
//   Retake Assessment
// </Link>

//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Content */}
//             <div className="container mx-auto px-4 py-12 max-w-6xl">
//                 {/* Score and Persona */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//                     <div className="lg:col-span-1 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
//                         <ScoreGauge score={scores.overall} />
//                         <div className="mt-4 text-center">
//                             <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${overallLevel.color === 'success' ? 'bg-green-100 text-green-700' :
//                                     overallLevel.color === 'warning' ? 'bg-yellow-100 text-yellow-700' :
//                                         'bg-red-100 text-red-700'
//                                 }`}>
//                                 {overallLevel.label}
//                             </span>
//                         </div>
//                     </div>

//                     <div className="lg:col-span-2 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
//                         <h2 className="text-2xl font-semibold mb-4 font-['Montserrat',sans-serif] text-[#0B64F4]">Persona Summary</h2>
//                         <p className="text-gray-600 leading-relaxed text-lg font-['Plus_Jakarta_Sans',sans-serif]">
//                             {persona.description}
//                         </p>
//                         <div className="mt-6 grid grid-cols-3 gap-4 text-center">
//                             <div>
//                                 <div className="text-3xl font-bold text-[#0B64F4] font-['Montserrat',sans-serif]">{Math.round(scores.overall)}%</div>
//                                 <div className="text-sm text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">Overall Score</div>
//                             </div>
//                             <div>
//                                 <div className="text-3xl font-bold text-[#0B64F4] font-['Montserrat',sans-serif]">
//                                     {Object.values(scores.categories).filter((s) => s >= 70).length}
//                                 </div>
//                                 <div className="text-sm text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">Strong Areas</div>
//                             </div>
//                             <div>
//                                 <div className="text-3xl font-bold text-red-500 font-['Montserrat',sans-serif]">
//                                     {Object.values(scores.categories).filter((s) => s < 50).length}
//                                 </div>
//                                 <div className="text-sm text-gray-600 font-['Plus_Jakarta_Sans',sans-serif]">Focus Areas</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Index Breakdown */}
//                 <h2 className="text-2xl font-semibold mb-6 font-['Montserrat',sans-serif] text-[#0B64F4]">Index Breakdown</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                     {Object.entries(scores.categories).map(([key, score]) => {
//                         const info = categoryInfo[key as keyof typeof categoryInfo];
//                         const level = getScoreLevel(score);
//                         return (
//                             <IndexCard
//                                 key={key}
//                                 title={info.name}
//                                 icon={info.icon}
//                                 score={score}
//                                 level={level.label}
//                                 color={level.color}
//                             />
//                         );
//                     })}
//                 </div>

//                 {/* Insights and Actions */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     <InsightsCard scores={scores} />
//                     <ActionItems scores={scores} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default function QuizResultsPage() {
//     return (
//         <Suspense fallback={
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <Loader2 className="w-12 h-12 animate-spin text-[#0B64F4]" />
//             </div>
//         }>
//             <ResultsContent />
//         </Suspense>
//     );
// }
