import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ZoomIn, ArrowRight, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/gallery';
import { Button } from '../common/Button';

export const GalleryPreview = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-20 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-sm font-bold mb-4"
          >
            <Image className="w-4 h-4 text-blue-600" />
            <span>Campus Life & Moments</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Life at Apex in <span className="bg-linear-to-r from-blue-700 to-sky-600 bg-clip-text text-transparent">Pictures & Memories</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-600 text-lg"
          >
            A glimpse into our vibrant cultural festivals, athletic victories, science exhibitions, and daily campus joy.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {GALLERY_ITEMS.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImage(item)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer bg-slate-100 border border-slate-200 shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={item.url}
                alt={item.title}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"; }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                {item.category}
              </div>

              {/* Zoom Icon on Hover */}
              <div className="absolute top-4 right-4 p-2 bg-white/30 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-5 h-5" />
              </div>

              {/* Title & Caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button to="/gallery" variant="primary" size="lg" icon={ArrowRight}>
            View Full Photo & Video Gallery
          </Button>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative h-96 sm:h-\[480px\]">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 bg-white">
                <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full mb-2">
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-slate-600">
                  {selectedImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryPreview;
