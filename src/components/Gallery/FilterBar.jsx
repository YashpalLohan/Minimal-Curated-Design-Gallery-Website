import { motion } from 'framer-motion';

const FilterBar = ({ types, activeType, onTypeChange }) => {
  return (
    <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
      {types.map((type) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTypeChange(type)}
          className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
            activeType === type
              ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
          }`}
        >
          {type}
          {activeType === type && (
            <motion.div
              layoutId="activeType"
              className="absolute inset-0 rounded-full border-2 border-gray-900"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterBar; 