import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAdmissions, updateAdmissionStatus, deleteAdmission } from '../../services/admissionService';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  FileSpreadsheet,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  User,
  X,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  Bus
} from 'lucide-react';

export const AdminAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    fetchAdmissionsData();
  }, []);

  const fetchAdmissionsData = async () => {
    setIsLoading(true);
    try {
      const res = await getAdmissions();
      if (res.success) {
        setAdmissions(res.data);
      }
    } catch (error) {
      console.error('Error fetching admissions', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAdmissions = admissions.filter(app => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      app.grade.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' ? true : app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAdmissionStatus(id, newStatus);
      fetchAdmissionsData();
      if (selectedApp?.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAdmission(id);
      fetchAdmissionsData();
      setDeleteConfirmId(null);
      if (selectedApp?.id === id) setSelectedApp(null);
    } catch (error) {
      console.error('Error deleting admission', error);
    }
  };

  return (
    <AdminLayout title="Student Admission Applications">
      <div className="space-y-6">
        {/* Controls Toolbar */}
        <div className="glass-nav border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student, parent, grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs .text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-gray-500 shrink-0 hidden sm:block" />
            {['All', 'Submitted', 'Under Review', 'Approved', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${statusFilter === status
                  ? 'bg-blue-600 text-gray-900 shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-900'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List Table */}
        <div className="glass-nav border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
          {isLoading ? (
            <div className="flex justify-center py-20 text-gray-500">Loading admissions...</div>
          ) : filteredAdmissions.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <FileSpreadsheet className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-gray-500 text-sm font-semibold">No applications found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                    <th className="p-4">App ID & Student</th>
                    <th className="p-4">Grade Sought</th>
                    <th className="p-4">Parent Details</th>
                    <th className="p-4">Transport</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAdmissions.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div
                          onClick={() => setSelectedApp(app)}
                          className="cursor-pointer space-y-0.5"
                        >
                          <span className="font-extrabold text-sm text-gray-900 block hover:text-blue-700 transition-colors">
                            {app.studentName}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">ID: {app.id}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-gray-900 bg-surface px-2.5 py-1 rounded-lg border border-gray-200">
                          {app.grade}
                        </span>
                      </td>
                      <td className="p-4 space-y-0.5">
                        <div className="font-semibold text-gray-700">{app.parentName}</div>
                        <div className="text-[10px] text-gray-500">{app.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${app.transportRequired === 'Yes' ? 'bg-green-100 text-[#15803d]' : 'bg-gray-100 text-gray-500'
                          }`}>
                          {app.transportRequired === 'Yes' ? 'Bus Needed' : 'Self Transport'}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${app.status === 'Approved' ? 'bg-[#f0fdf4] text-[#15803d] border-green-200' :
                            app.status === 'Under Review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              app.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-xl font-bold transition-all"
                          >
                            View
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(app.id)}
                            aria-label="Delete application"
                            className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Application Details Modal */}
        <AnimatePresence>
          {selectedApp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative"
              >
                <button
                  onClick={() => setSelectedApp(null)}
                  className="absolute right-6 top-6 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Application Details (#{selectedApp.id})
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-900 font-poppins pt-2">
                    {selectedApp.studentName}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-white rounded-2xl p-4 border border-gray-200 text-xs">
                  <div>
                    <span className="text-gray-500 block">Applying For:</span>
                    <span className="text-gray-900 font-bold text-sm">{selectedApp.grade}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block">Parent / Guardian:</span>
                    <span className="text-gray-900 font-bold">{selectedApp.parentName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Phone Number:</span>
                    <a href={`tel:${selectedApp.phone}`} className="text-blue-700 hover:underline font-bold">
                      {selectedApp.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Residential Address:</span>
                    <span className="text-gray-700 font-medium">{selectedApp.address || 'Not specified'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500 block">Email Address:</span>
                    <a href={`mailto:${selectedApp.email}`} className="text-blue-700 hover:underline font-bold">
                      {selectedApp.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Transport Facility:</span>
                    <span className="text-[#166534] font-bold">{selectedApp.transportRequired === 'Yes' ? 'Requested School Bus' : 'Self Transport'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Submitted On:</span>
                    <span className="text-gray-600 font-mono">{new Date(selectedApp.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Change Status:</span>
                    <select
                      value={selectedApp.status}
                      onChange={(e) => handleStatusChange(selectedApp.id, e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 font-bold"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setSelectedApp(null)}
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
                <h3 className="text-lg font-bold text-gray-900">Delete Application?</h3>
                <p className="text-xs text-gray-600">
                  Are you sure you want to delete this admission record?
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

export default AdminAdmissions;
