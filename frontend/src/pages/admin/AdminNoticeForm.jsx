import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { createNotice, updateNotice } from '../../services/noticeService';

export const AdminNoticeForm = ({ notice, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      title: notice?.title || '',
      shortDescription: notice?.shortDescription || '',
      description: notice?.description || '',
      category: notice?.category || 'General',
      priority: notice?.priority || 'Normal',
      publishDate: notice?.publishDate ? new Date(notice.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      expiryDate: notice?.expiryDate ? new Date(notice.expiryDate).toISOString().split('T')[0] : '',
      showPopup: notice?.showPopup || false,
      featured: notice?.featured || false,
      status: notice?.status || 'Active',
    }
  });

  // Watch dates to validate expiry > publish
  const publishDate = watch('publishDate');
  const expiryDate = watch('expiryDate');



  const onSubmit = async (data) => {
    if (data.expiryDate && new Date(data.expiryDate) < new Date(data.publishDate)) {
      alert('Expiry Date cannot be earlier than Publish Date');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        // Only append if there's a value, except for booleans which should be strings
        if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
          formData.append(key, data[key]);
        }
      });



      if (notice) {
        await updateNotice(notice.id, formData);
      } else {
        await createNotice(formData);
      }

      onClose(true); // Close and refresh
    } catch (error) {
      alert(error.message || 'Failed to save notice');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onClose(false)}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-slate-800">
            {notice ? 'Edit Notice' : 'Add New Notice'}
          </h2>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Notice Title <span className="text-red-500">*</span></label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-4 py-2 bg-slate-50 border .border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Enter notice title"
                />
                {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Category</label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2 bg-slate-50 border .border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                >
                  <option value="General">General</option>
                  <option value="Admission">Admission</option>
                  <option value="Examination">Examination</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Event">Event</option>
                  <option value="Circular">Circular</option>
                  <option value="Result">Result</option>
                  <option value="Important">Important</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Priority</label>
                <select
                  {...register('priority')}
                  className="w-full px-4 py-2 bg-slate-50 border .border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                >
                  <option value="Normal">Normal</option>
                  <option value="Important">Important</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Short Description (Optional)</label>
                <textarea
                  {...register('shortDescription')}
                  rows={2}
                  className="w-full px-4 py-2 bg-slate-50 border .border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"
                  placeholder="Brief summary of the notice..."
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Notice Description <span className="text-red-500">*</span></label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={8}
                  className="w-full px-4 py-2 bg-slate-50 border .border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"
                  placeholder="Full description of the notice..."
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">Publish Settings</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Publish Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    {...register('publishDate', { required: true })}
                    className="w-full px-4 py-2 bg-slate-50 border .border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    {...register('expiryDate')}
                    className="w-full px-4 py-2 bg-slate-50 border .border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                  <p className="text-[10px] text-slate-400">Leave empty to never expire</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-sm font-medium text-slate-700">Status</label>
                <select
                  {...register('status')}
                  className="w-full px-4 py-2 bg-slate-50 border .border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                >
                  <option value="Active">Active (Visible)</option>
                  <option value="Inactive">Inactive (Hidden)</option>
                </select>
              </div>

              <div className="pt-4 space-y-3">
                <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                  <input type="checkbox" {...register('showPopup')} className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Show as Homepage Popup</p>
                    <p className="text-xs text-slate-500">Will automatically display to visitors</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                  <input type="checkbox" {...register('featured')} className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Feature Notice</p>
                    <p className="text-xs text-slate-500">Will be highlighted on the notices page</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : 'Save Notice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
