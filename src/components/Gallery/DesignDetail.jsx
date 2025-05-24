import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DesignDetail = ({ design, onClose }) => {
  const closeBtnRef = useRef(null);
  const modalRef = useRef(null);

  // Focus the close button when modal opens
  useEffect(() => {
    closeBtnRef.current?.focus();

    // Trap focus inside modal
    const handleTab = (e) => {
      const focusableEls = modalRef.current.querySelectorAll(
        'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    // Close on ESC
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else {
        handleTab(e);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={`Details for ${design.title}`}
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-3xl sm:max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          {/* Close button */}
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Responsive media */}
          <div className="w-full bg-gray-100 flex-shrink-0 flex items-center justify-center" style={{ minHeight: '200px' }}>
            {design.video ? (
              <video
                src={design.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-[40vh] object-contain"
                poster={design.image}
                aria-label={design.title}
              />
            ) : (
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-auto max-h-[40vh] object-contain"
              />
            )}
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto p-4 sm:p-8 flex-1 min-h-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 break-words">{design.title}</h2>
            <div className="mb-2">
              <span className="text-lg font-medium text-gray-700">{design.designer}</span>
              {design.designerInfo && (
                <p className="text-gray-500 text-sm mt-1 break-words">{design.designerInfo}</p>
              )}
            </div>
            <p className="mb-4 text-gray-700 break-words">{design.description}</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {design.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={design.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => {
                if (!design.link.startsWith('http')) {
                  e.preventDefault();
                  alert('Invalid link: ' + design.link);
                }
              }}
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              aria-label={`View original design: ${design.title}`}
            >
              View Original Work
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DesignDetail;