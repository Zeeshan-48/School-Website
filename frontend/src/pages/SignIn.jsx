import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, ShieldCheck, UserCheck, School, KeyRound, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';

export const SignIn = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#F0FDF4]/40 min-h-screen pb-20">
      {/* Page Header */}
      <PageHeader
        icon={School}
        title="Staff Login"
        subtitle="Authorized portal exclusively for teachers, administrators, and staff members of Apex International School."
        badge="Staff Portal"
      />

      {/* Main Content Area with Generous Spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12">

          {/* Left Side: Brand Banner */}
          <div className="md:col-span-5 h-0.5bg-gradient-to-br from-[#166534] via-[#14532d] to-slate-900 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Glow Background Effect */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-lime-400/10 blur-2xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-500/30 text-lime-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-xs">
                <ShieldCheck className="w-4 h-4 text-lime-400" />
                <span>Restricted Access</span>
              </div>

              <h3 className="font-poppins text-2xl font-bold mb-3 leading-tight">
                Faculty & Management Workspace
              </h3>

              <p className="font-inter text-emerald-100/80 text-sm leading-relaxed mb-6">
                Access your teacher gradebook, student attendance logs, curriculum planners, and administrative tools.
              </p>

              <div className="space-y-3 pt-4 border-t border-emerald-800/60 text-xs text-emerald-100 font-inter">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Student Attendance & Marks Register</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Digital Lesson Plan & Syllabus Tracker</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Administrative & Leave Management</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200 font-inter">
              <span>IT Support Helpdesk?</span>
              <Link to={ROUTES.CONTACT} className="text-lime-300 hover:text-white font-bold underline transition-colors">
                Contact Admin
              </Link>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="md:col-span-7 p-8 sm:p-10 bg-white flex flex-col justify-center">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 bg-[#F0FDF4] text-[#166534] rounded-2xl flex items-center justify-center mx-auto border border-green-200 shadow-sm">
                  <UserCheck className="w-8 h-8" />
                </div>
                <h3 className="font-poppins text-2xl font-bold text-slate-900">Welcome Back!</h3>
                <p className="font-inter text-slate-600 text-sm max-w-sm mx-auto">
                  Staff sign in successful. Redirecting to your Faculty Dashboard...
                </p>
                <div className="pt-4">
                  <Button onClick={() => setIsSubmitted(false)} variant="outline" size="sm">
                    Back to Sign In Form
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div>
                <div className="mb-8 border-b border-slate-100 pb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-green-200 text-[#166534] text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
                    <School className="w-3.5 h-3.5 text-[#166534]" />
                    <span>Authorized Personnel Only</span>
                  </div>
                  <h2 className="font-poppins text-3xl font-extrabold text-slate-900 tracking-tight">Staff Login</h2>
                  <p className="font-inter text-xs text-slate-500 mt-1">Please enter your official employee credentials</p>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="user-id-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-inter">
                      Employee ID / Official Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="user-id-input"
                        required
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="e.g. EMP-1042 or staff@apexschool.edu"
                        className="w-full pl-10 pr-4 py-3 .bg-slate-50 border .border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] focus:border-transparent focus:bg-white transition-all font-inter"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5 font-inter">
                      <label htmlFor="password-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Password
                      </label>
                      <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset request sent to IT helpdesk."); }} className="text-xs text-[#166534] font-bold hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        id="password-input"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-3 .bg-slate-50 border .border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] focus:border-transparent focus:bg-white transition-all font-inter"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 font-inter">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium">
                      <input
                        type="checkbox"
                        id="remember-me-checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded text-[#166534] focus:ring-[#166534] w-4 h-4 border-slate-300"
                      />
                      <span>Keep me signed in on this device</span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="submit-signin-button"
                      className="w-full py-3.5 px-6 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer font-inter"
                    >
                      <span>Sign In to Staff Portal</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>

                {/* Demo Notice */}
                <div className="mt-6 p-3.5 rounded-xl bg-[#F0FDF4] border border-green-200 text-xs text-slate-600 flex items-start gap-2.5 font-inter">
                  <KeyRound className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#166534]">Staff Credentials Demo:</span> Enter your Employee ID (e.g. `EMP-1042`) and password to access the portal.
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
