import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { ROUTES } from '../../utils/routes';
import api from '../../services/api';
import { ShieldCheck, Lock, User, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import schoolLogo from '../../assets/logo.png';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useApp();

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success) {
        adminLogin(response.data.token); // Store token and update state
        navigate(ROUTES.ADMIN_DASHBOARD);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home Button */}
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-xs font-semibold mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Website</span>
        </Link>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-nav border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl"
        >
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-[#f0fdf4] border border-green-200 shadow-inner mb-2">
              <ShieldCheck className="w-8 h-8 text-[#166534]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              School Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Sign in to manage Career, Faculty, Admissions, Gallery & Inquiries.
            </p>
          </div>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 mb-6 text-rose-700 text-xs font-medium flex items-center gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="username"
                  required
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="admin or admin@school.com"
                  className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#166534] hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authenticate & Open CMS</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Hint Box */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-[11px] text-gray-500">
              Demo Credentials: <span className="text-[#166534] font-mono font-bold">admin</span> / <span className="text-[#166534] font-mono font-bold">admin123</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
