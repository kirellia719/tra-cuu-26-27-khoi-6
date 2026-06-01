/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function SearchArea({ onSearch, error, isLoading }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <section className="w-full max-w-4xl mx-auto mt-2 md:mt-8 px-4">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-8"
            >
                <label className="block text-slate-700 font-semibold mb-2 md:mb-3 text-sm md:text-base">
                    Nhập số báo danh hoặc CCCD
                </label>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 md:gap-4"
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Nhập SBD/CCCD..."
                        className="flex-1 px-4 py-3 md:px-5 md:py-4 border-2 border-slate-200 rounded-lg text-base md:text-lg focus:border-blue-500 focus:outline-none transition-colors"
                        id="search-input"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#2452c9]
           hover:brightness-110
           text-white font-semibold 
           px-6 py-3 md:px-10 md:py-4 
           rounded-lg text-base md:text-lg 
           flex items-center justify-center gap-2
           shadow-sm hover:shadow-md
           transition-all duration-200
           active:scale-95
           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
           disabled:opacity-50 disabled:pointer-events-none
           cursor-pointer"
                        id="search-button"
                    >
                        <Search size={18} strokeWidth={2.5} />
                        <span>TRA CỨU</span>
                    </button>
                </form>



                <p className="text-sm text-slate-400 mt-3 italic">
                    * Lưu ý: Thí sinh vui lòng nhập đúng định dạng số để có kết quả chính xác nhất.
                </p>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-rose-600 text-sm font-medium pt-3 italic"
                    >
                        * {error}
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}