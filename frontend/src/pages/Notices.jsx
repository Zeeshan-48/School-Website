import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/common/PageHeader';
import { SectionTitle } from '../components/common/SectionTitle';
import { getPublicNotices } from '../services/noticeService';
import aboutBannerImg from '../assets/about_img.png';
import { Megaphone, Search, Calendar, ChevronRight, AlertCircle, Clock, Star } from 'lucide-react';
import { ROUTES } from '../utils/routes';

export const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const location = useLocation();

  // Filters
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        const data = await getPublicNotices({ page, limit, search: searchTerm, category, priority });
        setNotices(data.data || []);
        setTotalItems(data.total || 0);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      fetchNotices();
    }, 500);

    return () => clearTimeout(timer);
  }, [page, limit, searchTerm, category, priority]);

  // Scroll to hash
  useEffect(() => {
    if (!isLoading && notices.length > 0 && location.hash) {
      if (location.hash.startsWith('#notice-')) {
        const element = document.querySelector(location.hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('ring-4', 'ring-emerald-400', 'ring-offset-2');
            setTimeout(() => {
              element.classList.remove('ring-4', 'ring-emerald-400', 'ring-offset-2');
            }, 3000);
          }, 300);
        }
      }
    }
  }, [isLoading, notices, location.hash]);

  const categories = ['General', 'Admission', 'Examination', 'Holiday', 'Event', 'Circular', 'Result', 'Important'];
  const priorities = ['Normal', 'Important', 'Urgent'];

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        icon={Megaphone}
        badge="Stay Updated"
        title="School Notices & Announcements"
        subtitle="Important information, circulars, and updates from the administration."
        bgImage={aboutBannerImg}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border .border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="w-full md:w-auto px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 .focus:border-emerald-500 outline-none transition-all"
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={priority}
              onChange={(e) => { setPriority(e.target.value); setPage(1); }}
              className="w-full md:w-auto px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 .focus:border-emerald-500 outline-none transition-all"
            >
              <option value="">All Priorities</option>
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Notices Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-200 h-80 animate-pulse flex flex-col">
                <div className="h-40 bg-slate-200 rounded-t-2xl"></div>
                <div className="p-6 .flex-grow flex flex-col justify-between">
                  <div>
                    <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <Megaphone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No notices found</h3>
            <p className="text-slate-500">We couldn't find any notices matching your criteria.</p>
            {(searchTerm || category || priority) && (
              <button
                onClick={() => { setSearchTerm(''); setCategory(''); setPriority(''); }}
                className="mt-6 px-6 py-2 bg-emerald-50 text-emerald-700 font-medium rounded-full hover:bg-emerald-100 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.map((notice, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={notice.id}
                  id={`notice-${notice.id}`}
                  className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 flex flex-col"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${notice.priority === 'Urgent' ? 'bg-red-500' : notice.priority === 'Important' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                  <div className="p-6 sm:p-8 .flex-grow flex flex-col pl-8 sm:pl-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase rounded shadow-sm">
                          {notice.category}
                        </span>
                        {notice.priority !== 'Normal' && (
                          <span className={`px-2.5 py-1 text-white text-xs font-bold uppercase rounded shadow-sm ${notice.priority === 'Urgent' ? 'bg-red-500' : 'bg-amber-500'}`}>
                            {notice.priority}
                          </span>
                        )}
                        {notice.featured && (
                          <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-bold uppercase rounded shadow-sm flex items-center gap-1">
                            <Star className="w-3 h-3" /> Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium whitespace-nowrap ml-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        {new Date(notice.publishDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {notice.title}
                    </h3>

                    <p className="text-slate-600 mb-6 line-clamp-3 text-sm">
                      {notice.shortDescription || notice.description.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...'}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <Link
                        to={`${ROUTES.NOTICES}/${notice.slug}`}
                        className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group/btn"
                      >
                        Read Full Notice
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalItems > limit && (
              <div className="mt-12 flex justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg font-medium hover:bg-slate-50 disabled:opacity-50 transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-2 px-4">
                  <span className="text-sm font-medium text-slate-600">Page {page} of {Math.ceil(totalItems / limit)}</span>
                </div>
                <button
                  disabled={page * limit >= totalItems}
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg font-medium hover:bg-slate-50 disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notices;
