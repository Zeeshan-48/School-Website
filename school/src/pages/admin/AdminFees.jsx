import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, Banknote, Bus, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { AdminLayout } from '../../components/admin/AdminLayout';

export default function AdminFees() {
  const { feeStructure, updateFeeStructure, busFee, updateBusFee } = useApp();

  // Local state for edits
  const [localFees, setLocalFees] = useState(feeStructure);
  const [localBusFee, setLocalBusFee] = useState(busFee);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  const handleFeeChange = (index, field, value) => {
    const numericValue = parseInt(value, 10);
    const updatedFees = [...localFees];
    updatedFees[index] = {
      ...updatedFees[index],
      [field]: isNaN(numericValue) ? 0 : numericValue
    };
    setLocalFees(updatedFees);
  };

  const handleBusFeeChange = (e) => {
    const numericValue = parseInt(e.target.value, 10);
    setLocalBusFee(isNaN(numericValue) ? 0 : numericValue);
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage(null);

    // Simulate network delay
    setTimeout(() => {
      // Save each grade structure
      localFees.forEach((fee, idx) => {
        updateFeeStructure(idx, fee);
      });
      // Save bus fee
      updateBusFee(localBusFee);

      setIsSaving(false);
      setSaveMessage('Fee structure updated successfully!');

      setTimeout(() => setSaveMessage(null), 3000);
    }, 800);
  };

  return (
    <AdminLayout title="Fee Structure CMS">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-[#166534] border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
              <Banknote className="w-3.5 h-3.5" />
              Fee Management
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-poppins">
              Academic & Transport Fees
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
              Update the tuition, annual charges, campus development fees, and transport costs. Changes made here will immediately reflect on the public Admissions page calculator.
            </p>
          </div>
        </div>

        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm font-bold flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {saveMessage}
          </motion.div>
        )}

        {/* Grade Fees Configuration */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Grade Fee Structure</h3>
              <p className="text-xs text-gray-500">Configure fees per academic level</p>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {localFees.map((fee, idx) => (
              <div key={fee.grade} className="space-y-4 .pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                <h4 className="font-extrabold text-gray-900 text-md">{fee.grade}</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Tuition Fee */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Tuition Fee (Per Term)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input
                        type="number"
                        value={fee.tuitionFeePerTerm}
                        onChange={(e) => handleFeeChange(idx, 'tuitionFeePerTerm', e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border .border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-gray-900 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Annual Charges */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Annual Charges</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input
                        type="number"
                        value={fee.annualCharges}
                        onChange={(e) => handleFeeChange(idx, 'annualCharges', e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border .border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-gray-900 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Development Fee */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Campus Dev. Fee</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input
                        type="number"
                        value={fee.developmentFee}
                        onChange={(e) => handleFeeChange(idx, 'developmentFee', e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border .border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-gray-900 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Terms Per Year */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Terms Per Year</label>
                    <input
                      type="number"
                      value={fee.termsPerYear}
                      onChange={(e) => handleFeeChange(idx, 'termsPerYear', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border .border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-gray-900 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transport Cost */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Transport Fee</h3>
              <p className="text-xs text-gray-500">Annual school bus service cost</p>
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-md space-y-1">
              <label className="text-xs font-bold text-gray-700">Annual Transport Cost</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                <input
                  type="number"
                  value={localBusFee}
                  onChange={handleBusFeeChange}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border .border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 text-sm font-semibold text-gray-900 transition-all outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#166534] hover:bg-green-800 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSaving ? 'Saving Changes...' : 'Save Fee Structure'}</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
