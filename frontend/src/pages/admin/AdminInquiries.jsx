import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../../services/admissionService';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  MessageSquare,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  User,
  X,
  Send,
  AlertCircle
} from 'lucide-react';

export const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    fetchInquiriesData();
  }, []);

  const fetchInquiriesData = async () => {
    setIsLoading(true);
    try {
      const res = await getInquiries();
      if (res.success) {
        setInquiries(res.data);
      }
    } catch (error) {
      console.error('Error fetching inquiries', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      inq.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' ? true : inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateInquiryStatus(id, newStatus);
      fetchInquiriesData();
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInquiry(id);
      fetchInquiriesData();
      setDeleteConfirmId(null);
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch (error) {
      console.error('Error deleting inquiry', error);
    }
  };

  return (
    <AdminLayout title="Parent Inquiry Messages">
      <div className="space-y-6">
        {/* Controls Toolbar */}
        <div className="glass-nav border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs .text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-gray-500 shrink-0 hidden sm:block" />
            {['All', 'New', 'Responded'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${statusFilter === status
                  ? 'bg-[#166534] text-gray-900 shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-900'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Messages List Table / Grid */}
        <div className="glass-nav border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
          {isLoading ? (
            <div className="flex justify-center py-20 text-gray-500">Loading inquiries...</div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <MessageSquare className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-gray-500 text-sm font-semibold">No inquiries found matching your filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-green-50 transition-colors ${inq.status === 'New' ? 'bg-white/40 border-l-4 border-l-emerald-500' : ''
                    }`}
                >
                  <div
                    onClick={() => setSelectedInquiry(inq)}
                    className="flex-1 space-y-1.5 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-sm text-gray-900">{inq.fullName}</span>
                      <span className="text-xs text-gray-500 font-mono">({inq.email})</span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${inq.status === 'New'
                        ? 'bg-green-100 text-[#166534] border border-green-200'
                        : 'bg-gray-100 text-gray-600'
                        }`}>
                        {inq.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-[#166534]">
                      <span>Subject: {inq.subject}</span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 max-w-3xl leading-relaxed">
                      "{inq.message}"
                    </p>

                    <div className="text-[10px] text-gray-500 pt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        Received: {new Date(inq.createdAt).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-500" />
                        {inq.phone}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pt-2 sm:pt-0">
                    {inq.status === 'New' ? (
                      <button
                        onClick={() => handleStatusChange(inq.id, 'Responded')}
                        className="px-3 py-1.5 bg-emerald-600/20 text-[#166534] border border-green-200 hover:bg-[#15803d] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Responded</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(inq.id, 'New')}
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        Mark Unread
                      </button>
                    )}

                    <button
                      onClick={() => setDeleteConfirmId(inq.id)}
                      className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal: View Full Inquiry Detail */}
        <AnimatePresence>
          {selectedInquiry && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative"
              >
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="absolute right-6 top-6 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#166534] bg-[#f0fdf4] px-3 py-1 rounded-full border border-green-200">
                    {selectedInquiry.subject}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 font-poppins pt-2">
                    Inquiry Details
                  </h3>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-200 space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">From Name:</span>
                    <span className="text-gray-900 font-bold">{selectedInquiry.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email Address:</span>
                    <a href={`mailto:${selectedInquiry.email}`} className="text-[#166534] hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone Number:</span>
                    <a href={`tel:${selectedInquiry.phone}`} className="text-[#166534] hover:underline">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Submitted At:</span>
                    <span className="text-gray-600">{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Message Content</h4>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-gray-200 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedInquiry.message}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=RE: ${selectedInquiry.subject}`}
                    className="bg-[#166534] hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Delete Confirmation */}
        <AnimatePresence>
          {deleteConfirmId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-gray-200 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Delete Inquiry?</h3>
                <p className="text-xs text-gray-600">
                  This action cannot be undone. Are you sure you want to remove this message?
                </p>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleDelete(deleteConfirmId)}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer"
                  >
                    Confirm Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminInquiries;
