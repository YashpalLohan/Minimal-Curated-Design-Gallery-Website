import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DesignDetail from './DesignDetail';

const DesignCard = ({ design }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  // Shared media styling for both image and video
  const mediaStyles = {
    className: "h-full w-full object-cover transition-all duration-700",
    style: {
      scale: isHovered ? 1.1 : 1,
      filter: `brightness(${isHovered ? 1.1 : 1})`
    }
  };

  return (
    <>
      <motion.div
        className="group relative flex flex-col cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl w-full max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md"
        whileHover={{ y: -8 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetail(true)}
        title={`${design.title} by ${design.designer}`}
        tabIndex={0}
        role="button"
        aria-label={`Open details for ${design.title} by ${design.designer}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          {design.video ? (
            <motion.video
              src={design.video}
              autoPlay
              loop
              muted
              playsInline
              poster={design.image}
              title={`${design.title} by ${design.designer}`}
              {...mediaStyles}
            />
          ) : (
            <motion.img
              src={design.image}
              alt={design.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              title={`${design.title} by ${design.designer}`}
              {...mediaStyles}
            />
          )}
          {!imageLoaded && !design.video && (
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          )}

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              />
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col flex-1 p-4 sm:p-5 min-h-[120px]">
          <motion.h3
            className="text-lg sm:text-xl font-semibold text-gray-900 transition-colors group-hover:text-gray-800 break-words"
            animate={{ y: isHovered ? -2 : 0 }}
            title={design.title}
          >
            {design.title}
          </motion.h3>
          <p className="mt-1 text-xs sm:text-sm font-medium text-gray-600 break-words" title={`Designer: ${design.designer}`}>
            {design.designer}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {design.tags.map((tag) => (
              <motion.span
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-600 transition-colors group-hover:bg-gray-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {showDetail && (
        <DesignDetail
          design={design}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
};

export default DesignCard;