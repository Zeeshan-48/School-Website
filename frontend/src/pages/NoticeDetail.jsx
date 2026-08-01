import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getNoticeBySlug, getPublicNotices } from '../services/noticeService';
import { ArrowLeft, Calendar, Megaphone } from 'lucide-react';
import { ROUTES } from '../utils/routes';
import { Link } from 'react-router-dom';

export const NoticeDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [latestNotices, setLatestNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNoticeData = async () => {
      setIsLoading(true);
      try {
        const [noticeRes, latestRes] = await Promise.all([
          getNoticeBySlug(slug),
          getPublicNotices({ limit: 5, sortBy: 'publishDate', sortDesc: 'true' })
        ]);
        setNotice(noticeRes.data);
        
        // Filter out current notice from latest
        const filteredLatest = (latestRes.data || []).filter(n => n.id !== noticeRes.data.id).slice(0, 4);
        setLatestNotices(filteredLatest);
        
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Failed to fetch notice details:', error);
        navigate(ROUTES.NOTICES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNoticeData();
  }, [slug, navigate]);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!notice) return null;

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => navigate(ROUTES.NOTICES)}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Notices
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >

              
              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-bold uppercase rounded shadow-sm">
                    {notice.category}
                  </span>
                  {notice.priority !== 'Normal' && (
                    <span className={`px-3 py-1 text-white text-sm font-bold uppercase rounded shadow-sm ${notice.priority === 'Urgent' ? 'bg-red-500' : 'bg-amber-500'}`}>
                      {notice.priority}
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium ml-auto">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    Published: {new Date(notice.publishDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
                  {notice.title}
                </h1>

                {/* React-Quill output uses standard HTML, so we use dangerouslySetInnerHTML */}
                <div 
                  className="prose prose-slate prose-lg max-w-none text-slate-700 whitespace-pre-wrap"
                >
                  {notice.description}
                </div>


              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-emerald-600" />
                Latest Notices
              </h3>
              
              {latestNotices.length > 0 ? (
                <div className="space-y-6">
                  {latestNotices.map((latest) => (
                    <Link 
                      key={latest.id} 
                      to={`${ROUTES.NOTICES}/${latest.slug}`}
                      className="group block"
                    >
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        {new Date(latest.publishDate).toLocaleDateString()}
                      </div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {latest.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No other recent notices available.</p>
              )}

              <div className="mt-8 pt-6 border-t border-slate-200">
                <Link 
                  to={ROUTES.NOTICES}
                  className="w-full py-2.5 px-4 bg-emerald-50 text-emerald-700 font-medium rounded-xl hover:bg-emerald-100 transition-colors flex justify-center items-center gap-2"
                >
                  View All Notices
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
