import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Footer = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer id="footer" className=" mt-28 bg-gradient-to-r from-white via-green-50 to-white py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 text-center">
                    {/* Brand */}
                    <div className="flex flex-col items-start">
                        <Link to="/" className="inline-block mb-4">
                            <img src={logo} alt="AI Resume Builder" className="h-8" />
                        </Link>
                        <p className="text-left text-sm leading-relaxed">
                            Build professional, ATS-friendly resumes with AI-powered assistance. Land your dream job faster.
                        </p>
                    </div>

                    {/* Product */}
                    <div className="flex flex-col items-center">
                        <p className="text-slate-800 font-semibold mb-4">Product</p>
                        <ul className="space-y-3 flex flex-col items-center">
                            <li><Link to="/" className="hover:text-green-600 transition">Home</Link></li>
                            <li><Link to="/app" className="hover:text-green-600 transition">Create Resume</Link></li>
                            <li><button onClick={() => scrollToSection('features')} className="hover:text-green-600 transition">Features</button></li>
                            <li><button onClick={() => scrollToSection('testimonial')} className="hover:text-green-600 transition">Testimonials</button></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col items-center">
                        <p className="text-slate-800 font-semibold mb-4">Company</p>
                        <ul className="space-y-3 flex flex-col items-center">
                            <li><a href="mailto:hjanoti9098@gmail.com" className="hover:text-green-600 transition">Contact</a></li>
                            <li><Link to="/app" className="hover:text-green-600 transition">Get Started</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="flex flex-col items-center">
                        <p className="text-slate-800 font-semibold mb-4">Connect</p>
                        <div className="flex items-center justify-center gap-4">
                            <a href="https://www.linkedin.com/in/heera-singh-janoti/" target="_blank" rel="noreferrer" className="hover:text-green-600 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect width="4" height="12" x="2" y="9"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                            <a href="https://github.com/hjanoti" target="_blank" rel="noreferrer" className="hover:text-green-600 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-green-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm">© 2026 AI Resume Builder. All rights reserved.</p>
                    <p className="text-sm">Built with 💚 by Heera Singh Janoti</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;