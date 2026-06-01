import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import Logo from '../../assets/taynguyen_logo.png';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await authService.login(username, password);

      const token = res.data.token;

      storageService.setAuth(token, rememberMe);

      navigate("/admin");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Đăng nhập thất bại"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">

        {/* Header Logo */}
        <div className="p-8 pb-0 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg shadow-red-100 shrink-0 mb-2">
            <img
              src={Logo}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold text-slate-800 uppercase text-center leading-tight">
            Trường THCS và THPT<br />
            <span className="text-blue-900">Tây Nguyên</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Hệ thống quản lý tuyển sinh</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-500 text-xs font-bold p-3 rounded-xl border border-red-100 animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 ml-1">Tài khoản</label>
            <div className="relative group">
              <User className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 ml-1">Mật khẩu</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-500 font-medium">Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Quên mật khẩu?</a>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;