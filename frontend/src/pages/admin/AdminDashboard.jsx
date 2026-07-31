import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { ROUTES } from '../../utils/routes';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  MessageSquare,
  FileSpreadsheet,
  Users,
  Briefcase,
  UserCheck,
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const AdminDashboard = () => {
  const { inquiries, admissions, jobApplicants, faculty, careers, galleryItems } = useApp();

  const newInquiries = inquiries.filter(i => i.status === 'New');
  const pendingAdmissions = admissions.filter(a => a.status === 'Submitted');
  const pendingApplicants = (jobApplicants || []).filter(a => a.status === 'Submitted');

  const stats = [
    {
      title: 'Inquiry Messages',
      count: inquiries.length,
      badge: `${newInquiries.length} New`,
      badgeColor: 'bg-emerald-100 text-black border border-emerald-200',
      icon: MessageSquare,
      path: ROUTES.ADMIN_INQUIRIES,
      iconColor: 'text-black bg-emerald-50 border-emerald-200',
      hoverBorder: 'hover:border-emerald-300 hover:shadow-emerald-100',
      hoverText: 'group-hover:text-black',
      hoverBtn: 'group-hover:bg-emerald-600 group-hover:border-emerald-600'
    },
    {
      title: 'Admission Applications',
      count: admissions.length,
      badge: `${pendingAdmissions.length} Pending`,
      badgeColor: 'bg-emerald-100 text-black border border-emerald-200',
      icon: FileSpreadsheet,
      path: ROUTES.ADMIN_ADMISSIONS,
      iconColor: 'text-black bg-emerald-50 border-emerald-200',
      hoverBorder: 'hover:border-emerald-300 hover:shadow-emerald-100',
      hoverText: 'group-hover:text-black',
      hoverBtn: 'group-hover:bg-emerald-600 group-hover:border-emerald-600'
    },
    {
      title: 'Job Applicants',
      count: (jobApplicants || []).length,
      badge: `${pendingApplicants.length} New Candidates`,
      badgeColor: 'bg-emerald-100 text-black border border-emerald-200',
      icon: UserCheck,
      path: ROUTES.ADMIN_APPLICANTS,
      iconColor: 'text-black bg-emerald-50 border-emerald-200',
      hoverBorder: 'hover:border-emerald-300 hover:shadow-emerald-100',
      hoverText: 'group-hover:text-black',
      hoverBtn: 'group-hover:bg-emerald-600 group-hover:border-emerald-600'
    },
    {
      title: 'Faculty Members',
      count: faculty.length,
      badge: 'Active Staff',
      badgeColor: 'bg-emerald-100 text-black border border-emerald-200',
      icon: Users,
      path: ROUTES.ADMIN_FACULTY,
      iconColor: 'text-black bg-emerald-50 border-emerald-200',
      hoverBorder: 'hover:border-emerald-300 hover:shadow-emerald-100',
      hoverText: 'group-hover:text-black',
      hoverBtn: 'group-hover:bg-emerald-600 group-hover:border-emerald-600'
    },
    {
      title: 'Job Openings',
      count: careers.length,
      badge: 'Careers CMS',
      badgeColor: 'bg-emerald-100 text-black border border-emerald-200',
      icon: Briefcase,
      path: ROUTES.ADMIN_CAREERS,
      iconColor: 'text-black bg-emerald-50 border-emerald-200',
      hoverBorder: 'hover:border-emerald-300 hover:shadow-emerald-100',
      hoverText: 'group-hover:text-black',
      hoverBtn: 'group-hover:bg-emerald-600 group-hover:border-emerald-600'
    },
    {
      title: 'Gallery Media',
      count: galleryItems.length,
      badge: 'Media Assets',
      badgeColor: 'bg-emerald-100 text-black border border-emerald-200',
      icon: ImageIcon,
      path: ROUTES.ADMIN_GALLERY,
      iconColor: 'text-black bg-emerald-50 border-emerald-200',
      hoverBorder: 'hover:border-emerald-300 hover:shadow-emerald-100',
      hoverText: 'group-hover:text-black',
      hoverBtn: 'group-hover:bg-emerald-600 group-hover:border-emerald-600'
    }
  ];

  return (
    <AdminLayout title="Dashboard & Metrics Overview">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r' from-green-50 via-white to-green-50 border border-green-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-[#166534] text-xs font-bold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Live Content Management System
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-poppins">
              Welcome to your School Admin Desk
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Manage your dynamic website pages (**Faculty**, **Career**, **Admissions**, **Gallery**), review **Job Applicants**, and respond to parent inquiry messages.
            </p>
          </div>
          <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none">
            <TrendingUp className="w-64 h-64 text-[#166534]" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`transition-all bg-white border-gray-200 border rounded-3xl p-6 shadow-lg flex flex-col justify-between group cursor-pointer ${item.hoverBorder}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl border shadow-inner group-hover:scale-110 transition-transform ${item.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-3xl sm:text-4xl font-extrabold text-black font-poppins mt-1">
                    {item.count}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                  <span className={`text-xs font-semibold text-black transition-colors ${item.hoverText}`}>
                    Manage Module
                  </span>
                  <Link
                    to={item.path}
                    className={`w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 group-hover:text-white transition-all ${item.hoverBtn}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
