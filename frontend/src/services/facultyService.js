import api from './api';

export const getFaculty = async () => {
  const response = await api.get('/faculty');
  return response.data;
};

export const createFaculty = async (facultyData) => {
  const response = await api.post('/faculty', facultyData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateFaculty = async (id, facultyData) => {
  const response = await api.put(`/faculty/${id}`, facultyData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteFaculty = async (id) => {
  const response = await api.delete(`/faculty/${id}`);
  return response.data;
};
