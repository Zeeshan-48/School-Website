import React, { useState } from 'react';
import { getFallbackUrl } from '../../utils/images';

export const LazyImage = ({ 
  src, 
  alt, 
  className = "", 
  fallbackKeywords = ['indian', 'school'], 
  aspectRatio = "aspect-video"
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback to loremflickr if Unsplash Source fails (503)
      setImgSrc(getFallbackUrl(fallbackKeywords));
    }
  };

  return (
    <div className={`relative overflow-hidden bg-gray-200/50 ${aspectRatio} ${className}`}>
      {/* Skeleton / Blur placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-green-900/10 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-green-600/30 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
