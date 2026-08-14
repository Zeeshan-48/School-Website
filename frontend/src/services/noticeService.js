import api from './api';

// --- PUBLIC APIs ---

export const getPublicNotices = async (params = {}) => {
  try {
    const response = await api.get(`/notices/public`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getNoticeBySlug = async (slug) => {
  try {
    const response = await api.get(`/notices/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getPopupNotice = async () => {
  try {
    const response = await api.get(`/notices/popup`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// --- ADMIN APIs ---

export const getAllNotices = async (params = {}) => {
  try {
    const response = await api.get('/notices', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getNoticeById = async (id) => {
  try {
    const response = await api.get(`/notices/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createNotice = async (formData) => {
  try {
    const response = await api.post('/notices', formData, {
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
    const response = await api.put(`/notices/${id}`, formData, {
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
    const response = await api.delete(`/notices/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const bulkActionNotices = async (action, ids) => {
  try {
    const response = await api.post(`/notices/bulk-action`, { action, ids });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
