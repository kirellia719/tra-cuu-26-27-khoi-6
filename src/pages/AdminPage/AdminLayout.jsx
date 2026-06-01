import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Settings, LogOut, Bell, Menu, X, ChevronRight
} from 'lucide-react';

// Import các trang con của Admin
import AdminDashboard from "./AdminDashboard"
import AdminSetting from './AdminSetting';

import Logo from '../../assets/taynguyen_logo.png';
import { storageService } from '../services/storageService';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Hiển thị Title dựa trên URL hiện tại
  const getHeaderTitle = () => {
    if (location.pathname === '/admin/setting') return 'CÀI ĐẶT HỆ THỐNG';
    return 'DANH SÁCH THÍ SINH';
  };

  const handleLogout = () => {
    storageService.clearAuth();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-700">
      {/* Overlay cho Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-red-100 shrink-0">
              <img
                src={Logo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xs font-bold">Trường THCS và THPT</h1>
              <p className="text-sm font-bold text-blue-900 uppercase">Tây Nguyên</p>
            </div>
          </div>
          <button className="lg:hidden text-slate-400" onClick={() => setSidebarOpen(false)}><X size={24} /></button>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <NavItem
            to="/admin"
            icon={<LayoutDashboard size={20} />}
            label="Thí sinh"
            active={location.pathname === '/admin'}
          />
          <NavItem
            to="/admin/setting"
            icon={<Settings size={20} />}
            label="Cài đặt"
            active={location.pathname === '/admin/setting'}
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold text-sm cursor-pointer"
          >
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sm:p-2 shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-slate-600" onClick={() => setSidebarOpen(true)}><Menu size={24} /></button>
            <h2 className="text-sm lg:text-base font-bold text-blue-900 tracking-wide uppercase">
              {getHeaderTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 relative hover:bg-slate-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none">Quản trị viên</p>
                <p className="text-[10px] text-green-500 font-bold mt-1 uppercase">Online</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100 transition-transform hover:scale-105">
                <img src={Logo} className="" alt="" />
              </div>
            </div>
          </div>
        </header>

        {/* Khu vực nội dung thay đổi theo Router con */}
        <div className="flex-1 overflow-y-auto p-0 bg-blue-50">
          <Routes>
            {/* path="/" tương ứng với /admin */}
            <Route path="/*" element={<AdminDashboard />} />
            {/* path="setting" tương ứng với /admin/setting */}
            <Route path="setting" element={<AdminSetting />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// Component NavItem
const NavItem = ({ to, icon, label, active, isExpandable }) => (
  <Link
    to={to || "#"}
    className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${active
      ? 'bg-[#439bf7] text-white shadow-lg shadow-blue-100 active:scale-95'
      : 'text-slate-500 hover:bg-slate-100'
      }`}
  >
    <div className="flex items-center gap-3">
      <span className={active ? 'text-white' : 'text-slate-400'}>{icon}</span>
      <span className="font-bold text-[13px]">{label}</span>
    </div>
    {isExpandable && (
      <ChevronRight size={14} className={active ? 'text-white' : 'text-slate-300'} />
    )}
  </Link>
);

export default AdminLayout;