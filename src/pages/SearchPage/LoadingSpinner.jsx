import { motion } from "motion/react";

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-4 border-slate-200 border-t-brand-primary rounded-full"
            />
            <p className="text-slate-500 font-medium animate-pulse">
                Đang tra cứu...
            </p>
        </div>
    );
}