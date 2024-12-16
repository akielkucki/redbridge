import React, {useState, useEffect, useRef} from 'react';
import { Menu, X, Phone, Mail, MapPin, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css'

const ConstructionWebsite = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const desktopNavItems = useRef(null);

    // New refs and state for counting animation
    const aboutSectionRef = useRef(null);
    const [aboutVisible, setAboutVisible] = useState(false);
    const [aboutCounts, setAboutCounts] = useState([
        { title: 'Projects Completed', amount: 500, unit: '+', current: 0 },
        { title: 'Years of Experience', amount: 25, unit: '+', current: 0 },
        { title: 'Team Members', amount: 10, unit: '+', current: 0 },
        { title: 'Client Satisfaction', amount: 98, unit: '%', current: 0 }
    ]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out'
        });

        // Simplified scroll handler that only updates the navbar background
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);


    // New effect for intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAboutVisible(true);
                }
            },
            { threshold: 0.3 }
        );
        if (aboutSectionRef.current) {
            observer.observe(aboutSectionRef.current);
        }
        return () => {
            if (aboutSectionRef.current) {
                observer.unobserve(aboutSectionRef.current);
            }
        };
    }, []);

    // New effect for counting animation
    useEffect(() => {
        if (aboutVisible) {
            let startTime;
            const duration = 2000; // 2 seconds
            const startCounts = aboutCounts.map(item => ({ ...item, current: 0 }));

            const animate = (time) => {
                if (!startTime) startTime = time;
                const elapsed = time - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const newCounts = startCounts.map(item => ({
                    ...item,
                    current: Math.floor(item.amount * progress)
                }));

                setAboutCounts(newCounts);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [aboutVisible]);

    const services = [
        {
            title: 'Residential Construction',
            description: 'Custom homes and renovations built to your specifications',
            icon: '🏠'
        },
        {
            title: 'Commercial Projects',
            description: 'Office buildings, retail spaces, and industrial facilities',
            icon: '🏢'
        },
        {
            title: 'Infrastructure',
            description: 'Roads, bridges, and public works projects',
            icon: '🌉'
        },
        {
            title: 'Green Building',
            description: 'Sustainable and environmentally friendly construction solutions',
            icon: '🌱'
        }
    ];

    const projects = [
        {
            title: 'Modern Office Complex',
            description: 'A 12-story sustainable office building in downtown',
            image: 'https://picsum.photos/id/120/800/600'
        },
        {
            title: 'Luxury Apartments',
            description: 'High-end residential complex with 200 units',
            image: 'https://picsum.photos/id/164/800/600'
        },
        {
            title: 'Shopping Center',
            description: 'Multi-use retail space with modern amenities',
            image: 'https://picsum.photos/id/175/800/600'
        }
    ];

    return (
        <div className="min-h-screen bg-white z-50">
            {/* Navigation - Updated with fixed hover states */}
            <nav
                className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center" data-aos="fade-right">
                            <span className="text-2xl font-bold text-green-700">Red Bridge Construction Co.</span>
                        </div>

                        {/* Desktop Navigation - Updated hover states */}
                        <div className="hidden md:flex space-x-8" data-aos="fade-left" ref={desktopNavItems}>
                            <a href="#home"
                               className={`transition-colors duration-300 ${scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-400'}`}>
                                Home
                            </a>
                            <a href="#services"
                               className={`transition-colors duration-300 ${scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-400'}`}>
                                Services
                            </a>
                            <a href="#projects"
                               className={`transition-colors duration-300 ${scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-400'}`}>
                                Projects
                            </a>
                            <a href="#contact"
                               className={`transition-colors duration-300 ${scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-400'}`}>
                                Contact
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`transition-transform duration-300 transform hover:scale-110 ${
                                    scrolled ? 'text-gray-700' : 'text-white'
                                }`}
                            >
                                {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen ? 'max-h-64' : 'max-h-0'
                    }`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="#home"
                           className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-300">Home</a>
                        <a href="#services"
                           className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-300">Services</a>
                        <a href="#projects"
                           className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-300">Projects</a>
                        <a href="#contact"
                           className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-300">Contact</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                id="home"
                className="relative h-screen flex items-center justify-center text-white bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://picsum.photos/id/142/1920/1080')",
                    backgroundAttachment: "fixed"
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4" data-aos="fade-down">
                        Building Your Vision
                    </h1>
                    <p
                        className="text-xl md:text-2xl mb-8"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Making construction great again
                    </p>
                    <a
                        href="#contact"
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
                        data-aos="zoom-in"
                        data-aos-delay="400"
                    >
                        Get Started
                    </a>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" data-aos="fade-down">Our
                        Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" data-aos="fade-down">Featured
                        Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-lg shadow-lg"
                                data-aos="fade-up"
                                data-aos-delay={index * 200}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-center p-4">
                                        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                                        <p className="text-gray-200">{project.description}</p>
                                        <button
                                            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full flex items-center justify-center mx-auto transition-all duration-300 hover:scale-105">
                                            View Details
                                            <ArrowRight className="ml-2" size={16}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section - Updated with counting animation */}
            <section id="about" className="py-20 bg-gray-50" ref={aboutSectionRef}>
                <div className={"max-w-7xl mx-auto px-4"}>
                    <h2 className="text-4xl font-bold text-center mb-12 mx-auto flex justify-center items-center"
                        data-aos="fade-down">About Us</h2>
                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-12"}>
                        <div data-aos="fade-right">
                            <img src="https://picsum.photos/id/142/800/800" alt=""
                                 className="rounded-lg shadow-lg w-full max-w-lg"/>
                        </div>
                        <div data-aos="fade-left">
                            <h5 className="text-2xl font-bold">Building Excellence Since 1995</h5>
                            <p className="text-gray-900 mt-4 mb-4">Red Bridge Construction has been delivering exceptional construction services for over 25 years. We pride ourselves on quality craftsmanship, innovative solutions, and customer satisfaction.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {aboutCounts.map((item, index) => (
                                    <p key={index} className="text-gray-900 font-semibold flex flex-col">
                                        <span className="text-3xl text-yellow-500 font-bold">
                                            {item.current}{item.unit}
                                        </span>
                                        <span>{item.title}</span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-down">Contact Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div data-aos="fade-right">
                            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Phone className="mr-4 text-green-500"/>
                                    <span>(267) 123-4567</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="mr-4 text-green-500"/>
                                    <span>info@redbridgeconstructionllc.com</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="mr-4 text-green-500"/>
                                    <span>123 Main Ave, City, PA 12345</span>
                                </div>
                            </div>
                        </div>
                        <form className="space-y-4" data-aos="fade-left">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500 transition-colors duration-300"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500 transition-colors duration-300"
                            />
                            <textarea
                                placeholder="Your Message"
                                rows="4"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500 transition-colors duration-300"
                            ></textarea>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8" data-aos="fade-up">
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
                            <p className="text-sm">Red Bridge Construction has been a trusted name in construction since 1995, delivering excellence in every project.</p>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#home"
                                       className="hover:text-green-500 transition-colors duration-300">Home</a></li>
                                <li><a href="#services"
                                       className="hover:text-green-500 transition-colors duration-300">Services</a></li>
                                <li><a href="#projects"
                                       className="hover:text-green-500 transition-colors duration-300">Projects</a></li>
                                <li><a href="#contact"
                                       className="hover:text-green-500 transition-colors duration-300">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
                            <ul className="space-y-2 text-sm">
                                <li>Residential Construction</li>
                                <li>Commercial Projects</li>
                                <li>Infrastructure</li>
                                <li>Green Building</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
                            <div className="flex space-x-4">
                                <a href="#"
                                   className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                                    <Facebook size={20}/>
                                </a>
                                <a href="#"
                                   className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                                    <Twitter size={20}/>
                                </a>
                                <a href="#"
                                   className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                                    <Instagram size={20}/>
                                </a>
                                <a href="#"
                                   className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                                    <Linkedin size={20}/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                        <p>&copy; 2024 Red Bridge Construction. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ConstructionWebsite;