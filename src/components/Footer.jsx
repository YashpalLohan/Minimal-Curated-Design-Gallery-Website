import { useState } from 'react';
import { Instagram, Twitter, Linkedin, Github, ChevronDown, ChevronUp } from 'lucide-react';

const Footer = () => {
    const [isExpanded, setIsExpanded] = useState({ services: false, company: false, support: false });

    const toggleExpanded = (section) => {
        setIsExpanded({ ...isExpanded, [section]: !isExpanded[section] });
    };

    return (
        <footer className="bg-black text-white border-t border-gray-800">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div>
                        <a href="/" className="text-2xl font-bold text-white mb-6 inline-block">GalleryCurate</a>
                        <p className="text-gray-400 mb-6">
                            Empowering artists and creators to showcase their work to the world through stunning visual storytelling.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><Linkedin size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><Github size={20} /></a>
                        </div>
                    </div>

                    {[
                        { label: 'For Artists', key: 'services', links: ['Create Portfolio', 'Sell Artwork', 'Artist Resources', 'Promotion Tools'] },
                        { label: 'Company', key: 'company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
                        { label: 'Support', key: 'support', links: ['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQ'] }
                    ].map(({ label, key, links }) => (
                        <div key={key}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">{label}</h3>
                                <button className="md:hidden" onClick={() => toggleExpanded(key)}>
                                    {isExpanded[key] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                            </div>
                            <ul className={`space-y-3 ${isExpanded[key] ? 'block' : 'hidden md:block'}`}>
                                {links.map(link => (
                                    <li key={link}><a href="#" className="text-gray-400 hover:text-white">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} GalleryCurate. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;