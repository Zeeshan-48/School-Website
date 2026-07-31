import api from './api';

// --- ADMISSIONS ---

export const getAdmissions = async () => {
  const response = await api.get('/admissions');
  return response.data;
};

export const createAdmission = async (admissionData) => {
  const response = await api.post('/admissions', admissionData);
  return response.data;
};

export const updateAdmissionStatus = async (id, status) => {
  const response = await api.put(`/admissions/${id}/status`, { status });
  return response.data;
};

export const deleteAdmission = async (id) => {
  const response = await api.delete(`/admissions/${id}`);
  return response.data;
};

// --- INQUIRIES ---

export const getInquiries = async () => {
  const response = await api.get('/inquiries');
  return response.data;
};

export const createInquiry = async (inquiryData) => {
  const response = await api.post('/inquiries', inquiryData);
  return response.data;
};

export const updateInquiryStatus = async (id, status) => {
  const response = await api.put(`/inquiries/${id}/status`, { status });
  return response.data;
};

export const deleteInquiry = async (id) => {
  const response = await api.delete(`/inquiries/${id}`);
  return response.data;
};
