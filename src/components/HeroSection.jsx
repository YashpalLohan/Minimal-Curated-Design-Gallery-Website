import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const images = [
    "https://images.unsplash.com/photo-1573739376627-96eba718354b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1671561038611-a28b56ade01a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1688535868681-6e95fd55a075?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const HeroSection = () => {
    const bgRef = useRef(null);
    const [slide, setSlide] = useState(0);

    // Set only the photo as background, no gradient
    useEffect(() => {
        if (bgRef.current) {
            bgRef.current.style.background = `url(${images[slide]})`;
            bgRef.current.style.backgroundSize = 'cover';
            bgRef.current.style.backgroundPosition = 'center';
        }
    }, [slide]);

    // Auto-advance slide every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setSlide((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // Manual dot click
    const handleDotClick = (idx) => setSlide(idx);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
            {/* Animated background image only */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 transition-all duration-1000"
                style={{
                    opacity: 1,
                    transition: 'background 1s linear'
                }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
            <div className="container mx-auto px-4 relative z-20 text-center py-32">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in-down">
                    Showcase Your Creative Vision
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto opacity-0 animate-fade-in-down delay-200">
                    Transform your ideas into stunning visual stories
                </p>
                <p className="text-lg mb-12 max-w-2xl mx-auto opacity-0 animate-fade-in-down delay-400">
                    Join thousands of creators who trust GalleryCurate to present their work to the world.
                </p>
                <button
                    onClick={() => {
                        const gallery = document.getElementById('gallery');
                        if (gallery) {
                            gallery.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="bg-blue-600 text-white px-10 py-4 rounded-md hover:bg-blue-700 inline-flex items-center text-lg mb-16 transform transition-transform duration-300 hover:scale-105 opacity-0 animate-fade-in-down delay-700 shadow-lg"
                >
                    Explore Gallery
                    <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" />
                    </svg>
                </button>
                <div className="flex justify-center space-x-2 mb-8">
                    {images.map((_, idx) => (
                        <span
                            key={idx}
                            onClick={() => handleDotClick(idx)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300
                                ${slide === idx ? 'bg-white animate-pulse scale-125 shadow-lg' : 'bg-gray-400'}
                            `}
                        ></span>
                    ))}
                </div>
            </div>
            {/* Tailwind custom keyframes */}
            <style>
                {`
                @keyframes fade-in-down {
                    0% { opacity: 0; transform: translateY(-40px);}
                    100% { opacity: 1; transform: translateY(0);}
                }
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(40px);}
                    100% { opacity: 1; transform: translateY(0);}
                }
                .animate-fade-in-down {
                    animation: fade-in-down 1s cubic-bezier(0.4,0,0.2,1) forwards;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s cubic-bezier(0.4,0,0.2,1) forwards;
                }
                .delay-200 { animation-delay: 0.2s;}
                .delay-400 { animation-delay: 0.4s;}
                .delay-700 { animation-delay: 0.7s;}
                .delay-1000 { animation-delay: 1s;}
                .delay-1100 { animation-delay: 1.1s;}
                `}
            </style>
        </section>
    );
};

export default HeroSection;