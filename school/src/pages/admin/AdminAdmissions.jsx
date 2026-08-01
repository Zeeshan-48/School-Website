import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
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
  const { admissions, updateAdmissionStatus, deleteAdmission } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

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

  const handleDelete = (id) => {
    deleteAdmission(id);
    setDeleteConfirmId(null);
    if (selectedApp?.id === id) setSelectedApp(null);
  };

  return (
    <AdminLayout title="Student Admission Applications">
      <div className="space-y-6">
        {/* Controls Toolbar */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student, parent, grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs .text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            {['All', 'Submitted', 'Under Review', 'Approved', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${statusFilter === status
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-700 hover:text-white'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List Table */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
          {filteredAdmissions.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <FileSpreadsheet className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm font-semibold">No applications found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-700 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-4">App ID & Student</th>
                    <th className="p-4">Grade Sought</th>
                    <th className="p-4">Parent Details</th>
                    <th className="p-4">Transport</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {filteredAdmissions.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-750/60 transition-colors">
                      <td className="p-4">
                        <div
                          onClick={() => setSelectedApp(app)}
                          className="cursor-pointer space-y-0.5"
                        >
                          <span className="font-extrabold text-sm text-white block hover:text-blue-400 transition-colors">
                            {app.studentName}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {app.id} ({app.gender})</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
                          {app.grade}
                        </span>
                      </td>
                      <td className="p-4 space-y-0.5">
                        <div className="font-semibold text-slate-200">{app.parentName}</div>
                        <div className="text-[10px] text-slate-400">{app.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${app.transportRequired === 'Yes' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
                          }`}>
                          {app.transportRequired === 'Yes' ? 'Bus Needed' : 'Self Transport'}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={app.status}
                          onChange={(e) => updateAdmissionStatus(app.id, e.target.value)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${app.status === 'Approved' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                              app.status === 'Under Review' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                                app.status === 'Rejected' ? 'bg-rose-950 text-rose-300 border-rose-800' :
                                  'bg-blue-950 text-blue-300 border-blue-800'
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
                            className="px-3 py-1.5 bg-slate-700 text-slate-200 hover:text-white rounded-xl font-bold transition-all"
                          >
                            View
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(app.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
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
                className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative"
              >
                <button
                  onClick={() => setSelectedApp(null)}
                  className="absolute right-6 top-6 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
                    Application Details (#{selectedApp.id})
                  </span>
                  <h3 className="text-2xl font-extrabold text-white font-poppins pt-2">
                    {selectedApp.studentName}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-900/80 rounded-2xl p-4 border border-slate-700/60 text-xs">
                  <div>
                    <span className="text-slate-400 block">Applying For:</span>
                    <span className="text-white font-bold text-sm">{selectedApp.grade}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Gender & DOB:</span>
                    <span className="text-white font-bold">{selectedApp.gender} ({selectedApp.dob || 'N/A'})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Parent / Guardian:</span>
                    <span className="text-white font-bold">{selectedApp.parentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Phone Number:</span>
                    <a href={`tel:${selectedApp.phone}`} className="text-blue-400 hover:underline font-bold">
                      {selectedApp.phone}
                    </a>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block">Email Address:</span>
                    <a href={`mailto:${selectedApp.email}`} className="text-blue-400 hover:underline font-bold">
                      {selectedApp.email}
                    </a>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block">Residential Address:</span>
                    <span className="text-slate-200 font-medium">{selectedApp.address || 'Not specified'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Transport Facility:</span>
                    <span className="text-emerald-400 font-bold">{selectedApp.transportRequired === 'Yes' ? 'Requested School Bus' : 'Self Transport'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Submitted On:</span>
                    <span className="text-slate-300 font-mono">{new Date(selectedApp.submittedAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Change Status:</span>
                    <select
                      value={selectedApp.status}
                      onChange={(e) => {
                        updateAdmissionStatus(selectedApp.id, e.target.value);
                        setSelectedApp({ ...selectedApp, status: e.target.value });
                      }}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setSelectedApp(null)}
                    className="bg-slate-700 text-slate-300 hover:text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer"
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
                className="bg-slate-800 border border-slate-700 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Delete Application?</h3>
                <p className="text-xs text-slate-300">
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
                    className="bg-slate-700 text-slate-300 hover:text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer"
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
