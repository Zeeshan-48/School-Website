import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notices'; // adjust base url if needed based on existing services

// --- PUBLIC APIs ---

export const getPublicNotices = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/public`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getNoticeBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getPopupNotice = async () => {
  try {
    const response = await axios.get(`${API_URL}/popup`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// --- ADMIN APIs ---

export const getAllNotices = async (params = {}) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getNoticeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createNotice = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateNotice = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteNotice = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const bulkActionNotices = async (action, ids) => {
  try {
    const response = await axios.post(`${API_URL}/bulk-action`, { action, ids });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
