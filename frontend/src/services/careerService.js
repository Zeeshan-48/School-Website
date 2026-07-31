import api from './api';

// --- CAREERS (JOBS) ---

export const getCareers = async () => {
  const response = await api.get('/careers/jobs');
  return response.data;
};

export const createCareer = async (careerData) => {
  const response = await api.post('/careers/jobs', careerData);
  return response.data;
};

export const updateCareer = async (id, careerData) => {
  const response = await api.put(`/careers/jobs/${id}`, careerData);
  return response.data;
};

export const deleteCareer = async (id) => {
  const response = await api.delete(`/careers/jobs/${id}`);
  return response.data;
};

// --- APPLICANTS ---

export const getApplicants = async () => {
  const response = await api.get('/careers/applicants');
  return response.data;
};

export const createApplicant = async (formData) => {
  const response = await api.post('/careers/applicants', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateApplicantStatus = async (id, status) => {
  const response = await api.put(`/careers/applicants/${id}/status`, { status });
  return response.data;
};

export const deleteApplicant = async (id) => {
  const response = await api.delete(`/careers/applicants/${id}`);
  return response.data;
};
