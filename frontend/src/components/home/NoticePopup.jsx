import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPopupNotice } from '../../services/noticeService';
import { X, Calendar, ChevronRight, AlertCircle, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

export const NoticePopup = () => {
  const [notices, setNotices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if user requested to hide popup today
    const lastDismissed = localStorage.getItem('noticePopupDismissedAt');
    if (lastDismissed) {
      const dismissedDate = new Date(parseInt(lastDismissed));
      const now = new Date();
      // If within 24 hours
      if (now - dismissedDate < 24 * 60 * 60 * 1000) {
        return; // Don't show
      }
    }

    const fetchPopup = async () => {
      try {
        const res = await getPopupNotice();
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setNotices(res.data);
          // Show after a slight delay for better UX
          setTimeout(() => setIsOpen(true), 1500);
        }
      } catch (error) {
        console.error('Failed to fetch popup notice', error);
      }
    };
    
    fetchPopup();
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('noticePopupDismissedAt', Date.now().toString());
    }
    setIsOpen(false);
  };

  if (!notices || notices.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 flex flex-col h-full overflow-hidden">
              <div className="flex items-center gap-3 mb-6 shrink-0">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Important Updates
                  </h2>
                  <p className="text-sm text-slate-500">Recent notices from the administration</p>
                </div>
              </div>

              <div className="overflow-y-auto pr-2 space-y-2 mb-4">
                {notices.map(notice => (
                  <Link 
                    key={notice.id}
                    to={`${ROUTES.NOTICES}#notice-${notice.id}`}
                    onClick={handleClose}
                    className="block p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex gap-1.5">
                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase rounded shadow-sm">
                          {notice.category}
                        </span>
                        {notice.priority !== 'Normal' && (
                          <span className={`px-1.5 py-0.5 text-white text-[9px] font-bold uppercase rounded shadow-sm ${notice.priority === 'Urgent' ? 'bg-red-500' : 'bg-amber-500'}`}>
                            {notice.priority}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(notice.publishDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {notice.title}
                    </h3>
                  </Link>
                ))}
              </div>

              <div className="shrink-0 pt-4 border-t border-slate-100">
                <Link 
                  to={ROUTES.NOTICES}
                  onClick={handleClose}
                  className="w-full mb-4 px-6 py-3 bg-emerald-600 text-white text-center font-semibold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  View All Notices
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <label className="flex items-center gap-2 cursor-pointer group justify-center">
                  <input 
                    type="checkbox" 
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors">
                    Don't show again today
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
