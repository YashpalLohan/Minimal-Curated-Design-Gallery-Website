import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-80' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <a href="/" className="text-2xl font-bold text-white">GalleryCurate</a>
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-gray-300 hover:text-white">Gallery</a>
                        <a href="#" className="text-gray-300 hover:text-white">Artists</a>
                        <a href="#" className="text-gray-300 hover:text-white">About</a>
                        <a href="#" className="text-gray-300 hover:text-white">Contact</a>
                        <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Sign Up</a>
                    </nav>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-black bg-opacity-95">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex flex-col space-y-4">
                            <a href="#" className="text-gray-300 hover:text-white">Gallery</a>
                            <a href="#" className="text-gray-300 hover:text-white">Artists</a>
                            <a href="#" className="text-gray-300 hover:text-white">About</a>
                            <a href="#" className="text-gray-300 hover:text-white">Contact</a>
                            <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-center">Sign Up</a>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;