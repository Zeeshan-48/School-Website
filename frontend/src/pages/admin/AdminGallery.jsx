import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GALLERY_CATEGORIES } from '../../data/gallery';
import {
  Image as ImageIcon,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Video,
  AlertCircle
} from 'lucide-react';

export const AdminGallery = () => {
  const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'sports',
    type: 'image',
    url: '',
    caption: ''
  });

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.caption && item.caption.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = categoryFilter === 'all' ? true : item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'sports',
      type: 'image',
      url: '',
      caption: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || 'sports',
      type: item.type || 'image',
      url: item.url || '',
      caption: item.caption || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingItem) {
      updateGalleryItem(editingItem.id, formData);
    } else {
      addGalleryItem(formData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteGalleryItem(id);
    setDeleteConfirmId(null);
  };

  return (
    <AdminLayout title="Gallery Media CMS">
      <div className="space-y-6">
        {/* Controls Toolbar */}
        <div className="glass-nav border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search photo/video title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none cursor-pointer"
            >
              {GALLERY_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <button
              onClick={handleOpenAddModal}
              className="bg-[#166534] hover:bg-emerald-500 text-white font-bold px-4 py-2 text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Media Item</span>
            </button>
          </div>
        </div>

        {/* Gallery Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-nav border border-gray-200 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-teal-500/60 transition-all"
            >
              <div>
                <div className="h-48 bg-surface relative overflow-hidden">
                  {item.url ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 font-semibold text-xs">
                      No Preview Available
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-black/70 text-teal-700 border border-teal-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-gray-900 text-base leading-snug font-poppins">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-slate-900/40 border-t border-gray-200 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-mono">ID: {item.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal: Add/Edit Gallery Item */}
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
                  {editingItem ? 'Edit Media Item' : 'Add New Media Item'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Annual Track & Field Sports Meet 2026"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none cursor-pointer"
                      >
                        <option value="sports">Sports Meet</option>
                        <option value="academics">STEM & Science</option>
                        <option value="events">Cultural & Events</option>
                        <option value="campus">Campus Life</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Media Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none cursor-pointer"
                      >
                        <option value="image">Photo Image</option>
                        <option value="video">Video Embed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Image / Media URL *</label>
                    <input
                      type="text"
                      required
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="Image URL or YouTube Embed URL"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Caption / Description</label>
                    <textarea
                      rows="3"
                      value={formData.caption}
                      onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                      placeholder="Describe the photo event or highlight..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
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
                      {editingItem ? 'Save Item' : 'Add to Gallery'}
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
                <h3 className="text-lg font-bold text-gray-900">Delete Media Item?</h3>
                <p className="text-xs text-gray-600">
                  This item will be removed from the gallery immediately.
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

export default AdminGallery;
