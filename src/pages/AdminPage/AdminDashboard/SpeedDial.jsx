import { useState, useRef, useEffect } from 'react';
import { Plus, Download, FileUser } from 'lucide-react';

const SpeedDial = ({ onAddClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dialRef.current && !dialRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dialRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <div className={`flex flex-col items-center mb-4 space-y-4 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}>
        <button className="w-12 h-12 bg-white text-emerald-600 rounded-full shadow-lg border border-slate-100 flex items-center justify-center hover:scale-110 transition-all">
          <Download size={20} />
        </button>
        <button
          onClick={() => { onAddClick(); setIsOpen(false); }}
          className="w-12 h-12 bg-white text-blue-600 rounded-full shadow-lg border border-slate-100 flex items-center justify-center hover:scale-110 transition-all"
        >
          <FileUser size={20} />
        </button>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-rose-500 rotate-45" : "bg-[#366dc9]"}`}
      >
        <Plus size={32} color="white" />
      </button>
    </div>
  );
};

export default SpeedDial;