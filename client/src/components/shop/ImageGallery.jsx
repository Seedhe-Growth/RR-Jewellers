import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(images[0]?.url || 'https://via.placeholder.com/600x800?text=Saira+Ornaments');
  const [zoom, setZoom] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar lg:max-h-[600px]">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setMainImage(img.url)}
            className={`flex-shrink-0 w-20 h-24 rounded-luxury overflow-hidden border-2 transition-all ${mainImage === img.url ? 'border-brand-gold' : 'border-transparent'}`}
          >
            <img src={img.url} alt="Thumbnail" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-grow">
        <div 
          className="relative aspect-[3/4] rounded-luxury overflow-hidden bg-brand-beige/20 cursor-zoom-in"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <img 
            src={mainImage} 
            alt="Product" 
            className={`w-full h-full object-cover transition-transform duration-200 ${zoom ? 'scale-150' : 'scale-100'}`}
            style={zoom ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
