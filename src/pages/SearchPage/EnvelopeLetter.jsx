import { useRef, } from 'react';
import { Heart, PartyPopper } from 'lucide-react';

const candidataMock = {
    id: '123456',
    fullName: 'Nguyễn Văn A',
    birthDate: '01/01/2000',
}

export default function EnvelopeLetter({ candidate = candidataMock }) {
    const letterRef = useRef(null);

    return (
        <div
            ref={letterRef}
        >
            {/* Gold Decorative Gilded Overlay */}
            <div className="absolute inset-2 border border-amber-500/30 rounded pointer-events-none" />
            <div className="absolute inset-3 border border-amber-500/10 rounded pointer-events-none" />

            {/* Letter Headings */}
            <div className="px-0 pt-8 pb-4 text-center">
                {/* Elegant Vintage Corner Flourishes */}
                <div className="flex justify-between items-center max-w-[200px] mx-auto text-amber-500/70 mb-2 no-print">
                    <span className="text-sm">⚜</span>
                    <span className="w-16 h-[1px] bg-amber-500/30"></span>
                    <span className="text-xl">✦</span>
                    <span className="w-16 h-[1px] bg-amber-500/30"></span>
                    <span className="text-sm">⚜</span>
                </div>

                {/* Cursive cursive text "Thư chúc mừng" */}
                <h3
                    className="font-cursive text-3xl text-[#0b3c73] font-medium leading-none mb-1 tracking-wide filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
                    id="letter-cursive-head"
                >
                    Chúc mừng!
                </h3>

                {/* Heart shape with symmetric flourishes */}
                <div className="flex items-center justify-center space-x-3 mb-3">
                    <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-red-400"></span>
                    <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                    <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-red-400"></span>
                </div>
                <span className="mb-5 inline-flex items-center gap-1.5 md:gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full font-bold text-xs md:text-sm shadow-sm tracking-wide transition-all duration-200 ease-out bg-emerald-600 text-white hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
                    TRÚNG TUYỂN
                    <PartyPopper size={16} />
                </span>

                {/* Candidate Custom Header Information Box */}
                <div className="bg-[#fcf9ed] border border-amber-200/50 rounded-lg p-3.5 max-w-lg mx-auto text-left mb-6 text-sm text-slate-800 space-y-1.5 shadow-xs">
                    <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                        <span className="text-slate-500 font-medium">Thí sinh:</span>
                        <span className="font-display font-bold text-[#0d4c92]">{candidate.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                        <span className="text-slate-500 font-medium">Số báo danh (SBD):</span>
                        <span className="font-bold text-slate-800 bg-slate-100/80 px-2 py-0.5 rounded">{candidate.sbd}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                        <span className="text-slate-500 font-medium">Ngày sinh:</span>
                        <span>{candidate.dob}</span>
                    </div>

                </div>

                {/* The welcome text as requested by user */}
                <div
                    className="text-slate-800 text-base leading-relaxed max-w-2xl mx-auto px-2 tracking-normal"
                >
                    <div>
                        <div className="text-center font-bold text-slate-700 mb-3">
                            {/* <ClockCheck className="inline-block w-5 h-5 text-[#0d4c92] mb-1 mr-1" /> */}
                            Phụ huynh vui lòng hoàn thành thủ tục nhập học:
                        </div>
                        <div className="flex justify-between mt-1 mb-2 text-base text-slate-700">
                            <span>Từ: </span>
                            <span className="font-medium text-[#0d4c92]">07h30 ngày 04/06/2026</span>
                        </div>
                        <div className="flex justify-between text-base text-slate-700">
                            <span>Đến: </span>
                            <span className="font-medium text-[#0d4c92]">16h00 ngày 07/06/2026</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
