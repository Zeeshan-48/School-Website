import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import api from '../../services/api';
import { ROUTES } from '../../utils/routes';
import {
  LayoutDashboard,
  MessageSquare,
  FileSpreadsheet,
  Users,
  Briefcase,
  UserCheck,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  CreditCard,
  Menu,
  X,
  ShieldCheck,
  Bell
} from 'lucide-react';

export const AdminLayout = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdminAuthenticated, adminLogout } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    unreadInquiriesCount: 0,
    pendingAdmissionsCount: 0,
    pendingApplicantsCount: 0
  });

  useEffect(() => {
    if (isAdminAuthenticated) {
      const fetchStats = async () => {
        try {
          const res = await api.get('/dashboard/stats');
          if (res.data.success) {
            setStats({
              unreadInquiriesCount: res.data.data.newInquiries || 0,
              pendingAdmissionsCount: res.data.data.pendingAdmissions || 0,
              pendingApplicantsCount: res.data.data.newApplicants || 0
            });
          }
        } catch (error) {
          console.error('Failed to fetch sidebar stats', error);
        }
      };
      fetchStats();
    }
  }, [isAdminAuthenticated, location.pathname]);

  if (!isAdminAuthenticated) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  const navItems = [
    {
      name: 'Dashboard Overview',
      path: ROUTES.ADMIN_DASHBOARD,
      icon: LayoutDashboard
    },
    {
      name: 'Inquiry Messages',
      path: ROUTES.ADMIN_INQUIRIES,
      icon: MessageSquare,
      badge: stats.unreadInquiriesCount > 0 ? stats.unreadInquiriesCount : null,
      badgeColor: 'bg-emerald-500 text-white'
    },
    {
      name: 'Admissions Applications',
      path: ROUTES.ADMIN_ADMISSIONS,
      icon: FileSpreadsheet,
      badge: stats.pendingAdmissionsCount > 0 ? stats.pendingAdmissionsCount : null,
      badgeColor: 'bg-blue-500 text-white'
    },
    {
      name: 'Job Applicants',
      path: ROUTES.ADMIN_APPLICANTS,
      icon: UserCheck,
      badge: stats.pendingApplicantsCount > 0 ? stats.pendingApplicantsCount : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      name: 'Faculty CMS',
      path: ROUTES.ADMIN_FACULTY,
      icon: Users
    },
    {
      name: 'Careers CMS',
      path: ROUTES.ADMIN_CAREERS,
      icon: Briefcase
    },
    {
      name: 'Gallery CMS',
      path: ROUTES.ADMIN_GALLERY,
      icon: ImageIcon
    },
    {
      name: 'Fee Structure',
      path: ROUTES.ADMIN_FEES,
      icon: CreditCard
    }
  ];

  const handleLogout = () => {
    adminLogout();
    navigate(ROUTES.ADMIN_LOGIN);
  };

  return (
    <div className="min-h-screen bg-surface text-gray-800 flex flex-col lg:flex-row font-sans antialiased">
      {/* Mobile Top Header */}
      <div className="lg:hidden glass-nav border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#f0fdf4] border border-green-200 text-[#166534]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm text-gray-900">Apex Admin Panel</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#f0fdf4] border border-green-200 text-[#166534] shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-poppins font-extrabold text-base text-gray-900 leading-tight">
              School Admin
            </h2>
            <p className="text-[11px] text-gray-500">CMS & Operations</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#166534] text-white shadow-md shadow-green-900/20'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>


      </aside>

      {/* Backdrop overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="hidden lg:flex glass-card border-b border-gray-200 px-8 py-4 items-center justify-between backdrop-blur-md sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
            <p className="text-xs text-gray-500 mt-0.5">Manage live content and customer inquiries in real time.</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={ROUTES.HOME}
              target="_blank"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#f0fdf4] border border-green-200 text-[#15803d] hover:bg-green-100 transition-all shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </Link>

            <div className="h-6 w-px bg-gray-200 mx-1" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#166534] flex items-center justify-center font-extrabold text-xs text-white shadow-inner">
                AD
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-gray-900">Administrator</span>
                <span className="block text-[10px] text-[#166534] font-mono">Online</span>
              </div>
            </div>

            <div className="h-6 w-px bg-gray-200 mx-1" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
