import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getApplicants, updateApplicantStatus, deleteApplicant } from '../../services/careerService';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  UserCheck,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Briefcase,
  FileText,
  X,
  AlertCircle,
  Download
} from 'lucide-react';

export const AdminApplicants = () => {
  const [jobApplicants, setJobApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    fetchApplicantsData();
  }, []);

  const fetchApplicantsData = async () => {
    setIsLoading(true);
    try {
      const res = await getApplicants();
      if (res.success) {
        setJobApplicants(res.data);
      }
    } catch (error) {
      console.error('Error fetching applicants', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredApplicants = jobApplicants.filter(app => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' ? true : app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateApplicantStatus(id, newStatus);
      fetchApplicantsData();
      if (selectedApplicant?.id === id) {
        setSelectedApplicant({ ...selectedApplicant, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteApplicant(id);
      fetchApplicantsData();
      setDeleteConfirmId(null);
      if (selectedApplicant?.id === id) setSelectedApplicant(null);
    } catch (error) {
      console.error('Error deleting applicant', error);
    }
  };

  return (
    <AdminLayout title="Job Applicants Review">
      <div className="space-y-6">
        {/* Controls Toolbar */}
        <div className="glass-nav border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by applicant name, email, job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-gray-500 shrink-0 hidden sm:block" />
            {['All', 'Submitted', 'Shortlisted', 'Under Review', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  statusFilter === status
                    ? 'bg-amber-600 text-gray-900 shadow-sm'
                    : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Applicants List Table */}
        <div className="glass-nav border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
          {isLoading ? (
            <div className="flex justify-center py-20 text-gray-500">Loading applicants...</div>
          ) : filteredApplicants.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <UserCheck className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-gray-500 text-sm font-semibold">No job applicants found matching your search criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                    <th className="p-4">Candidate & ID</th>
                    <th className="p-4">Applied Job Title</th>
                    <th className="p-4">Experience</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplicants.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div
                          onClick={() => setSelectedApplicant(app)}
                          className="cursor-pointer space-y-0.5"
                        >
                          <span className="font-extrabold text-sm text-gray-900 block hover:text-amber-400 transition-colors">
                            {app.fullName}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">ID: {app.id}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-amber-700 bg-amber-50/80 border border-amber-200 px-2.5 py-1 rounded-lg">
                          {app.job?.title || 'Unknown Job'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-gray-600">
                          {app.experience}
                        </span>
                      </td>
                      <td className="p-4 space-y-0.5">
                        <div className="text-gray-700">{app.email}</div>
                        <div className="text-[10px] text-gray-500">{app.phone}</div>
                      </td>
                      <td className="p-4">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                            app.status === 'Shortlisted' ? 'bg-[#f0fdf4] text-[#15803d] border-green-200' :
                            app.status === 'Under Review' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            app.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedApplicant(app)}
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-xl font-bold transition-all"
                          >
                            Review
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(app.id)}
                            className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
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

        {/* Candidate Full Profile Modal */}
        <AnimatePresence>
          {selectedApplicant && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative"
              >
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="absolute right-6 top-6 text-gray-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Job Application Profile (#{selectedApplicant.id})
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-900 font-poppins pt-2">
                    {selectedApplicant.fullName}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-white rounded-2xl p-4 border border-gray-200 text-xs">
                  <div>
                    <span className="text-gray-500 block">Applied Role:</span>
                    <span className="text-gray-900 font-bold text-sm">{selectedApplicant.job?.title || 'Unknown Job'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Experience:</span>
                    <span className="text-gray-900 font-bold">{selectedApplicant.experience}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Email Address:</span>
                    <a href={`mailto:${selectedApplicant.email}`} className="text-amber-400 hover:underline font-bold">
                      {selectedApplicant.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Phone Number:</span>
                    <a href={`tel:${selectedApplicant.phone}`} className="text-amber-400 hover:underline font-bold">
                      {selectedApplicant.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Attached Resume:</span>
                    <a href={selectedApplicant.resumePath} target="_blank" rel="noopener noreferrer" className="text-[#166534] hover:underline font-bold flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      View Resume
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Applied Date:</span>
                    <span className="text-gray-600 font-mono">{new Date(selectedApplicant.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {selectedApplicant.coverLetter && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Cover Statement</h4>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-gray-200 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedApplicant.coverLetter}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Review Status:</span>
                    <select
                      value={selectedApplicant.status}
                      onChange={(e) => handleStatusChange(selectedApplicant.id, e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 font-bold"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setSelectedApplicant(null)}
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
                <h3 className="text-lg font-bold text-gray-900">Delete Applicant?</h3>
                <p className="text-xs text-gray-600">
                  Are you sure you want to remove this applicant record?
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

export default AdminApplicants;
