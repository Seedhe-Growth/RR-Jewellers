import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto max-h-[600px] no-scrollbar">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`relative min-w-[80px] lg:min-w-0 w-20 lg:w-24 aspect-[4/5] bg-white/5 border transition-all duration-300 ${
              activeIdx === idx ? 'border-primary' : 'border-transparent hover:border-white/20'
            }`}
          >
            <img 
              src={img.url} 
              alt={`Thumbnail ${idx}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-grow aspect-[4/5] bg-white/3 relative overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={images[activeIdx].url}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover cursor-zoom-in"
          />
        </AnimatePresence>
        
        {/* Decorative elements */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-white/20 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-white/20 pointer-events-none" />
      </div>
    </div>
  );
};

export default ImageGallery;
