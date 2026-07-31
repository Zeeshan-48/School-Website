const Gallery = require('../models/Gallery');

exports.getAllGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createGalleryItem = async (req, res) => {
  try {
    const { title, category, type, caption } = req.body;
    let imagePath = '';
    
    // Check if an image was uploaded via Multer
    if (req.file) {
      imagePath = req.file.path; // Cloudinary URL
    } else if (req.body.url) {
      // Fallback to manually provided URL (AdminGallery uses 'url' field)
      imagePath = req.body.url;
    }

    if (!imagePath) {
      return res.status(400).json({ success: false, message: 'Image or URL is required' });
    }

    const newItem = await Gallery.create({ title, category, type, caption, imagePath });
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    // We could add logic to delete from Cloudinary here as well using cloudinary.uploader.destroy()
    await item.destroy();
    res.status(200).json({ success: true, message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
