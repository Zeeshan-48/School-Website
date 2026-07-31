import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  MapPin,
  Clock,
  GraduationCap,
  AlertCircle
} from 'lucide-react';

export const AdminCareers = () => {
  const { careers, addCareer, updateCareer, deleteCareer } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    department: 'Senior Secondary Wing',
    type: 'Full-Time',
    experience: '',
    qualification: '',
    salary: '',
    location: 'Main Campus',
    description: '',
    responsibilities: ''
  });

  const filteredCareers = careers.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.qualification.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      department: 'Senior Secondary Wing',
      type: 'Full-Time',
      experience: '',
      qualification: '',
      salary: '',
      location: 'Main Campus',
      description: '',
      responsibilities: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || '',
      department: job.department || 'Senior Secondary Wing',
      type: job.type || 'Full-Time',
      experience: job.experience || '',
      qualification: job.qualification || '',
      salary: job.salary || '',
      location: job.location || 'Main Campus',
      description: job.description || '',
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : (job.responsibilities || '')
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      responsibilities: formData.responsibilities
        ? formData.responsibilities.split('\n').filter(line => line.trim().length > 0)
        : []
    };

    if (editingJob) {
      updateCareer(editingJob.id, formattedData);
    } else {
      addCareer(formattedData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteCareer(id);
    setDeleteConfirmId(null);
  };

  return (
    <AdminLayout title="Career Job Openings CMS">
      <div className="space-y-6">
        {/* Controls Toolbar */}
        <div className="glass-nav border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search job title, department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            onClick={handleOpenAddModal}
            className="bg-[#166534] hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Job Opening</span>
          </button>
        </div>

        {/* Job Cards List */}
        <div className="space-y-4">
          {filteredCareers.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-nav border border-gray-200 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-amber-500/60 transition-all"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-amber-50 text-amber-700 text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full border border-amber-200">
                    {job.department}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 bg-surface px-3 py-0.5 rounded-full border border-gray-200 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    {job.type}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 bg-surface px-3 py-0.5 rounded-full border border-gray-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    {job.location}
                  </span>
                </div>

                <h3 className="font-extrabold text-gray-900 text-xl font-poppins">
                  {job.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1 font-mono">
                  <span><strong>Req:</strong> {job.qualification}</span>
                  <span>•</span>
                  <span><strong>Exp:</strong> {job.experience}</span>
                  {job.salary && (
                    <>
                      <span>•</span>
                      <span className="text-[#166534] font-bold"><strong>Salary:</strong> {job.salary}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleOpenEditModal(job)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(job.id)}
                  className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal: Add/Edit Job Opening */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative my-8"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-6 top-6 text-gray-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-extrabold text-gray-900 font-poppins">
                  {editingJob ? 'Edit Job Opening' : 'Create New Job Opening'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Job Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. PGT Physics Educator"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Department</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        placeholder="e.g. Senior Secondary Wing"
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Employment Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none cursor-pointer"
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract / Visiting">Contract / Visiting</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Qualifications *</label>
                      <input
                        type="text"
                        required
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        placeholder="e.g. M.Sc + B.Ed"
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Experience Required</label>
                      <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder="e.g. 3-5 Years in CBSE School"
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Salary Package</label>
                      <input
                        type="text"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        placeholder="e.g. Competitive & Performance Bonus"
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Campus Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Main Campus"
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Job Description *</label>
                    <textarea
                      rows="3"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief role summary..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Key Responsibilities (one per line)</label>
                    <textarea
                      rows="4"
                      value={formData.responsibilities}
                      onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                      placeholder="Deliver engaging lectures&#10;Prepare study modules&#10;Conduct lab experiments"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#166534] hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow-lg"
                    >
                      {editingJob ? 'Save Job Opening' : 'Publish Job Opening'}
                    </button>
                  </div>
                </form>
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
                <h3 className="text-lg font-bold text-gray-900">Delete Job Opening?</h3>
                <p className="text-xs text-gray-600">
                  This job vacancy will be removed from the careers page.
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

export default AdminCareers;
