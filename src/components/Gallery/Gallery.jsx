import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { designs, designTypes } from '../../data/designs';
import DesignCard from './DesignCard';
import FilterBar from './FilterBar';

const Gallery = () => {
  const [activeType, setActiveType] = useState('All');

  const filteredDesigns = useMemo(() => {
    if (activeType === 'All') return designs;
    return designs.filter((design) => design.type === activeType);
  }, [activeType]);

  return (
    <div id="gallery" className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.h1 
          className="mb-4 text-center text-4xl font-bold text-gray-900 sm:text-5xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Curated Design Gallery
        </motion.h1>
        <motion.p 
          className="mb-12 text-center text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover inspiring digital designs from talented creators
        </motion.p>
        
        <FilterBar
          types={designTypes}
          activeType={activeType}
          onTypeChange={setActiveType}
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDesigns.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <DesignCard design={design} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;