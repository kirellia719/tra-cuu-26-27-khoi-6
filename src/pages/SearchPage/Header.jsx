import Logo from "../../assets/taynguyen_logo.png";
import Bg from "../../assets/header2.png";

export default function Header() {
    return (
        <header className="relative w-full overflow-hidden">

            {/* Background FULL */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${Bg})` }}
            ></div>

            {/* Overlay nhẹ */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between py-6 md:py-10">

                {/* Left */}
                <div className="flex items-center gap-4">

                    {/* Logo */}
                    <div className="rounded-full  w-12 h-12 md:w-16 md:h-16 flex items-center justify-center overflow-hidden">
                        <img
                            src={Logo}
                            alt="Logo Tây Nguyên School"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Text */}
                    <div>
                        <h1 className="text-lg md:text-2xl font-bold uppercase leading-tight text-blue-900">
                            Tra cứu điểm
                        </h1>

                        <p className="text-slate-700 text-xs md:text-base mt-1">
                            Kiểm tra, đánh giá năng lực đầu vào năm học 2026 - 2027
                        </p>
                    </div>
                </div>

                {/* Right */}
                <div className="hidden md:block text-l text-slate-700 font-semibold uppercase">
                    Trường THCS và THPT Tây Nguyên
                </div>
            </div>
        </header>
    );
}