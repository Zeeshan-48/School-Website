import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFaculty, createFaculty, updateFaculty as updateFacultyApi, deleteFaculty as deleteFacultyApi } from '../../services/facultyService';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { FACULTY_DEPARTMENTS } from '../../data/faculty';
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Award,
  GraduationCap,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const AdminFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const fetchFacultyData = async () => {
    setIsLoading(true);
    try {
      const res = await getFaculty();
      if (res.success) {
        setFaculty(res.data);
      }
    } catch (error) {
      console.error('Error fetching faculty', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: 'stem',
    qualification: '',
    experience: '',
    bio: '',
    image: '',
    awards: '',
    subjects: ''
  });

  const filteredFaculty = faculty.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.qualification.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = departmentFilter === 'all' ? true : m.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setSelectedFile(null);
    setFormData({
      name: '',
      designation: '',
      department: 'stem',
      qualification: '',
      experience: '',
      bio: '',
      image: '',
      awards: '',
      subjects: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member) => {
    setEditingMember(member);
    setSelectedFile(null);
    setFormData({
      name: member.name || '',
      designation: member.designation || '',
      department: member.department || 'stem',
      qualification: member.qualification || '',
      experience: member.experience || '',
      bio: member.bio || '',
      image: member.image || '',
      awards: member.awards || '',
      subjects: Array.isArray(member.subjects) ? member.subjects.join(', ') : (member.subjects || '')
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subjectsArray = formData.subjects ? (typeof formData.subjects === 'string' ? formData.subjects.split(',').map(s => s.trim()) : formData.subjects) : [];

    const submissionData = new FormData();
    submissionData.append('name', formData.name);
    submissionData.append('designation', formData.designation);
    submissionData.append('department', formData.department);
    submissionData.append('qualification', formData.qualification);
    submissionData.append('experience', formData.experience);
    submissionData.append('bio', formData.bio);
    submissionData.append('awards', formData.awards);
    submissionData.append('subjects', JSON.stringify(subjectsArray));
    
    if (selectedFile) {
      submissionData.append('image', selectedFile);
    } else if (formData.image) {
      submissionData.append('image', formData.image);
    }

    try {
      if (editingMember) {
        await updateFacultyApi(editingMember.id, submissionData);
      } else {
        await createFaculty(submissionData);
      }
      fetchFacultyData();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving faculty member', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFacultyApi(id);
      fetchFacultyData();
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Error deleting faculty member', error);
    }
  };

  return (
    <AdminLayout title="Faculty CMS Manager">
      <div className="space-y-6">
        {/* Controls Toolbar */}
        <div className="glass-nav border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search faculty by name, qualification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs .text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Department Filter & Add Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none cursor-pointer"
            >
              {FACULTY_DEPARTMENTS.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>

            <button
              onClick={handleOpenAddModal}
              className="bg-[#166534] hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Faculty Member</span>
            </button>
          </div>
        </div>

        {/* Faculty Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20 text-gray-500">Loading faculty...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredFaculty.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-nav border border-gray-200 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative group hover:border-purple-500/60 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-gray-300 shadow-md shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center font-bold text-purple-700 shrink-0">
                        {member.name.charAt(0)}
                      </div>
                    )}

                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                        {member.department}
                      </span>
                      <h3 className="font-bold text-gray-900 text-base leading-tight pt-1">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#166534]">
                        {member.designation}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-600 font-inter bg-slate-50 p-3 rounded-2xl border border-gray-100">
                    <p className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span>{member.qualification}</span>
                    </p>
                    {member.experience && (
                      <p className="text-[11px] text-gray-500">
                        <strong>Experience:</strong> {member.experience}
                      </p>
                    )}
                    {member.awards && (
                      <p className="flex items-center gap-1.5 text-[11px] text-amber-700 pt-1 font-semibold">
                        <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{member.awards}</span>
                      </p>
                    )}
                  </div>

                  {member.bio && (
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed italic">
                      "{member.bio}"
                    </p>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-gray-200 mt-4 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono">ID: {member.id}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(member)}
                      className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(member.id)}
                      className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal: Add/Edit Faculty Member */}
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
                  className="absolute right-6 top-6 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-extrabold text-gray-900 font-poppins">
                  {editingMember ? 'Edit Faculty Member' : 'Add New Faculty Member'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Sunita Sharma"
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Designation *</label>
                      <input
                        type="text"
                        required
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        placeholder="e.g. Senior Physics Lecturer"
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Department</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none cursor-pointer"
                      >
                        <option value="leadership">Leadership & Administration</option>
                        <option value="stem">Science & STEM</option>
                        <option value="humanities">Languages & Humanities</option>
                        <option value="sports">Sports & Fine Arts</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Experience</label>
                      <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder="e.g. 10+ Years in CBSE"
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Qualifications *</label>
                    <input
                      type="text"
                      required
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      placeholder="e.g. Ph.D. in Physics (IIT Delhi), B.Ed"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Awards / Honors</label>
                    <input
                      type="text"
                      value={formData.awards}
                      onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                      placeholder="e.g. National Best Teacher Award 2024"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Subjects Taught (comma separated)</label>
                    <input
                      type="text"
                      value={formData.subjects}
                      onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                      placeholder="e.g. Physics, Robotics, Calculus"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Short Biography</label>
                    <textarea
                      rows="3"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Brief overview of teaching philosophy and achievements..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
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
                      {editingMember ? 'Save Changes' : 'Create Faculty Member'}
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
                <h3 className="text-lg font-bold text-gray-900">Delete Faculty Member?</h3>
                <p className="text-xs text-gray-600">
                  This member will be removed from the public website immediately.
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

export default AdminFaculty;
