import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminNoticeForm } from './AdminNoticeForm';
import { getAllNotices, deleteNotice, bulkActionNotices } from '../../services/noticeService';
import {
  Search, Filter, Plus, Edit2, Trash2, CheckCircle2,
  XCircle, Megaphone, Star, AlertCircle, Eye
} from 'lucide-react';

export const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // UI States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null); // null = Add, object = Edit
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchNotices = async () => {
    setIsLoading(true);
    try {
      const data = await getAllNotices({
        page,
        limit,
        search: searchTerm,
        category: categoryFilter,
        status: statusFilter
      });
      setNotices(data.data || []);
      setTotalItems(data.total || 0);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [page, limit, searchTerm, categoryFilter, statusFilter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await deleteNotice(id);
        fetchNotices();
      } catch (error) {
        alert('Failed to delete notice.');
      }
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedIds.length === 0) return alert('No notices selected');
    if (!window.confirm(`Are you sure you want to ${action} selected notices?`)) return;

    try {
      await bulkActionNotices(action, selectedIds);
      setSelectedIds([]);
      fetchNotices();
    } catch (error) {
      alert(`Failed to execute bulk action: ${action}`);
    }
  };

  const openAddForm = () => {
    setSelectedNotice(null);
    setIsFormOpen(true);
  };

  const openEditForm = (notice) => {
    setSelectedNotice(notice);
    setIsFormOpen(true);
  };

  const handleCloseForm = (shouldRefresh) => {
    setIsFormOpen(false);
    setSelectedNotice(null);
    if (shouldRefresh) fetchNotices();
  };

  const toggleSelection = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === notices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(notices.map(n => n.id));
    }
  };

  return (
    <AdminLayout title="Notice Management" icon={Megaphone}>
      {!isFormOpen ? (
        <div className="space-y-6">
          {/* Top Actions & Filters */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="relative .flex-grow .lg:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search notices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full lg:w-64 pl-9 pr-4 py-2 border .border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-3 pr-8 py-2 border .border-slate-200 rounded-lg text-sm bg-white text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="">All Categories</option>
                <option value="General">General</option>
                <option value="Admission">Admission</option>
                <option value="Examination">Examination</option>
                <option value="Holiday">Holiday</option>
                <option value="Event">Event</option>
                <option value="Circular">Circular</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 .focus:border-emerald-500"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={openAddForm}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Notice
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-lg items-center">
              <span className="text-sm font-medium text-emerald-800 mr-2">{selectedIds.length} selected</span>
              <button onClick={() => handleBulkAction('delete')} className="px-3 py-1.5 bg-white text-red-600 text-xs font-medium rounded border border-red-200 hover:bg-red-50">Delete</button>
              <button onClick={() => handleBulkAction('activate')} className="px-3 py-1.5 bg-white text-emerald-700 text-xs font-medium rounded border border-emerald-200 hover:bg-emerald-50">Activate</button>
              <button onClick={() => handleBulkAction('deactivate')} className="px-3 py-1.5 bg-white text-slate-700 text-xs font-medium rounded border border-slate-200 hover:bg-slate-50">Deactivate</button>
              <button onClick={() => handleBulkAction('enablePopup')} className="px-3 py-1.5 bg-white text-blue-700 text-xs font-medium rounded border border-blue-200 hover:bg-blue-50">Enable Popup</button>
              <button onClick={() => handleBulkAction('feature')} className="px-3 py-1.5 bg-white text-amber-700 text-xs font-medium rounded border border-amber-200 hover:bg-amber-50">Feature</button>
            </motion.div>
          )}

          {/* Data Grid */}
          <div className="bg-white/50 border border-slate-200 rounded-xl shadow-sm overflow-hidden p-6">
            <div className="mb-4 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notices.length > 0 && selectedIds.length === notices.length} 
                  onChange={selectAll} 
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4" 
                />
                Select All
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full py-20 text-center text-slate-500">Loading notices...</div>
              ) : notices.length === 0 ? (
                <div className="col-span-full py-20 text-center text-slate-500">No notices found.</div>
              ) : (
                notices.map(notice => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={notice.id} 
                    className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between ${
                      selectedIds.includes(notice.id) ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="absolute top-4 right-4 z-10">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(notice.id)} 
                        onChange={() => toggleSelection(notice.id)} 
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer" 
                      />
                    </div>
                    
                    <div className="space-y-4 pr-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            {notice.category}
                          </span>
                          {notice.showPopup && <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-[10px] font-bold uppercase border border-purple-100">Popup</span>}
                          {notice.featured && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-[10px] font-bold uppercase border border-amber-100">Featured</span>}
                        </div>
                        <h3 className="font-bold text-slate-900 text-base leading-tight line-clamp-2">{notice.title}</h3>
                        <p className="text-[11px] font-medium text-slate-500 mt-1">Priority: {notice.priority}</p>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="flex justify-between">
                          <span className="text-slate-400">Published:</span>
                          <span className="font-medium text-slate-700">{new Date(notice.publishDate).toLocaleDateString()}</span>
                        </p>
                        {notice.expiryDate && (
                          <p className="flex justify-between">
                            <span className="text-slate-400">Expires:</span>
                            <span className="font-medium text-slate-700">{new Date(notice.expiryDate).toLocaleDateString()}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${notice.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                        {notice.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {notice.status}
                      </span>
                      
                      <div className="flex items-center gap-1.5 relative z-10">
                        <button onClick={() => openEditForm(notice)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(notice.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
              <p>Showing {notices.length} of {totalItems} entries</p>
              <div className="flex gap-2">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white bg-slate-50 disabled:opacity-50 font-medium cursor-pointer">Prev</button>
                <button disabled={page * limit >= totalItems} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white bg-slate-50 disabled:opacity-50 font-medium cursor-pointer">Next</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AdminNoticeForm
          notice={selectedNotice}
          onClose={handleCloseForm}
        />
      )}
    </AdminLayout>
  );
};

export default AdminNotices;
