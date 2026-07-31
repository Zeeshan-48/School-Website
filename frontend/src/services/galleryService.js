import api from './api';

export const getGalleryItems = async () => {
  const response = await api.get('/gallery');
  return response.data;
};

export const createGalleryItem = async (formData) => {
  // formData because it could contain a file
  const response = await api.post('/gallery', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteGalleryItem = async (id) => {
  const response = await api.delete(`/gallery/${id}`);
  return response.data;
};
