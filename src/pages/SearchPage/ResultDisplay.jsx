import { XCircle, PartyPopper, UserRoundCheck, ChartColumn } from "lucide-react";
import { motion } from "motion/react";

export default function ResultDisplay({ result }) {

    const currentDate = new Date(result.updatedAt || new Date()).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const renderScore = (original, review) => {
        if (review != null) {
            return (
                <div className="flex items-center justify-end gap-2">
                    <span className="text-slate-400 line-through text-sm">
                        {original.toFixed(2)}
                    </span>

                    <span className="text-blue-700 font-bold text-base md:text-lg">
                        {review.toFixed(2)}
                    </span>
                </div>
            );
        }

        return (
            <span className="text-blue-700 font-bold text-base md:text-lg">
                {original.toFixed(2)}
            </span>
        );
    };

    const scores = {
        math: result.math,
        mathReview: result.mathReview,
        literature: result.literature,
        literatureReview: result.literatureReview,
        english: result.english,
        englishReview: result.englishReview,
        bonusPoint: result.bonusPoint || 0,
    };

    // Render Kết quả
    const renderResultRow = () => {
        return (
            <div className="flex flex-col sm:flex-row p-2 sm:pb-3 sm:items-center">
                <span className="sm:w-1/3 text-slate-500 text-xs md:text-sm">
                    Kết quả:
                </span>

                <div className="sm:w-2/3 flex items-center gap-2">
                    {result.isPass === true ? (
                        renderStatusBadge()
                    ) : result.isPass === false ? (
                        renderStatusBadge()
                    ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-xs font-semibold">
                            Chưa công bố
                        </span>
                    )}
                </div>
            </div>
        );
    };
    // 🎯 STATUS (chỉ dùng khi đã công bố)
    const renderStatusBadge = () => {
        const status = result.isPass;

        if (status === true) {
            return (
                <span className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full font-bold text-xs md:text-sm shadow-sm tracking-wide transition-all duration-200 ease-out bg-emerald-600 text-white hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
                    TRÚNG TUYỂN
                    <PartyPopper size={16} />
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs shadow-sm tracking-wide bg-rose-100 text-rose-600 border border-rose-200">
                KHÔNG TRÚNG TUYỂN
                <XCircle size={16} />
            </span>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mx-auto px-4"
        >
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">

                {/* HEADER */}
                <div className="border-b border-slate-200 px-4 md:px-8 py-2 md:py-4 flex flex-col sm:flex-row justify-between items-center gap-1 md:gap-2">
                    <span className="flex justify-between items-center gap-2 text-slate-800 uppercase tracking-widest text-[14px] md:text-sm font-bold text-center">
                        Kết quả tra cứu
                    </span>
                    <span className="text-slate-700 text-[11px] md:text-sm font-medium">
                        Cập nhật: {currentDate}
                    </span>
                </div>

                <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">

                    {/* INFO */}
                    <div className="space-y-3 md:space-y-4 relative overflow-hidden bg-slate-50/30 p-4 rounded-lg border border-slate-100">
                        <h2 className="text-base md:text-lg font-bold text-slate-800 mb-3 md:mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#3680e6] rounded-full flex items-center justify-center text-white shadow-md shadow-blue-600/20">
                                <UserRoundCheck size={16} />
                            </span>
                            Thông tin thí sinh
                        </h2>

                        <div className="flex flex-col sm:flex-row border-b border-slate-100 m-0 p-2 sm:items-center">
                            <span className="sm:w-1/3 text-slate-500 text-xs md:text-sm ">Họ và tên:</span>
                            <span className="sm:w-2/3 font-bold text-slate-900 uppercase text-sm md:text-base">{result.name}</span>
                        </div>

                        {result.dob && (
                            <div className="flex flex-col sm:flex-row border-b border-slate-100 m-0 p-2 sm:items-center">
                                <span className="sm:w-1/3 text-slate-500 text-xs md:text-sm ">Ngày sinh:</span>
                                <span className="sm:w-2/3 font-medium text-slate-700 text-sm md:text-base">{result.dob}</span>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row border-b border-slate-100 m-0 p-2 sm:items-center">
                            <span className="sm:w-1/3 text-slate-500 text-xs md:text-sm ">Số báo danh:</span>
                            <span className="sm:w-2/3 font-medium text-slate-700 text-sm md:text-base">{result.sbd}</span>
                        </div>

                        {/* 🔥 KẾT QUẢ */}
                        {renderResultRow()}
                    </div>

                    {/* SCORE */}
                    <div className="mt-2 md:mt-0 p-4 rounded-lg border border-slate-200">
                        <h2 className="text-base md:text-lg font-bold text-slate-800 mb-3 md:mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#2ca75f] rounded-full flex items-center justify-center text-white shadow-md shadow-blue-600/20">
                                <ChartColumn size={16} />
                            </span>
                            Bảng điểm
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[240px]">
                                <tbody className="text-slate-700 font-medium">

                                    <tr className="border-b border-slate-50">
                                        <td className="py-2 px-3 sm:px-4 text-xs md:text-base">
                                            <div className="flex items-center gap-2">
                                                Toán
                                                <span className="bg-amber-100 text-amber-700 text-[10px] md:text-[12px] px-2 rounded-full font-bold border border-amber-200">x2</span>
                                            </div>
                                        </td>
                                        <td className="py-2 px-3 sm:px-4 text-right">
                                            {renderScore(scores.math, scores.mathReview)}
                                        </td>
                                    </tr>

                                    <tr className="border-b border-slate-50 bg-slate-50/50">
                                        <td className="py-2 px-3 sm:px-4 text-xs md:text-base">Ngữ Văn</td>
                                        <td className="py-2 px-3 sm:px-4 text-right">
                                            {renderScore(scores.literature, scores.literatureReview)}
                                        </td>
                                    </tr>

                                    <tr className="border-b border-slate-50">
                                        <td className="py-2 px-3 sm:px-4 text-xs md:text-base">Tiếng Anh</td>
                                        <td className="py-2 px-3 sm:px-4 text-right">
                                            {renderScore(scores.english, scores.englishReview)}
                                        </td>
                                    </tr>

                                    {scores.bonusPoint > 0 && (
                                        <tr className="bg-slate-50/50">
                                            <td className="py-2 px-3 sm:px-4 italic text-slate-500 text-[11px] md:text-sm">Khuyến khích</td>
                                            <td className="py-2 px-3 sm:px-4 text-right text-slate-500 font-bold text-xs md:text-sm">
                                                + {scores.bonusPoint.toFixed(2)}
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 pt-3 border-t-2 border-dashed border-slate-200 flex justify-between items-center px-1 md:px-2">
                            <span className="text-slate-600 font-bold text-xs md:text-base uppercase tracking-tight">
                                Tổng cộng:
                            </span>
                            <span className="text-xl md:text-3xl font-black text-blue-800 tracking-tighter">
                                {result.totalScore?.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}