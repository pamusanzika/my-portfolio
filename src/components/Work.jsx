import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Mail, ExternalLink, Github, ArrowLeft, Copy, Check, Linkedin, Instagram } from 'lucide-react';
import { portfolioContent } from '../data/content';

const Work = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const observerRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { hero, works, workCategories, contact } = portfolioContent;

  const filteredWorks = selectedCategory === 'ALL' 
    ? works 
    : works.filter(work => work.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-8">
            <Link to="/" className="text-xs sm:text-sm font-bold tracking-tight hover:opacity-70 transition">
              {hero.logoText}
            </Link>
            <button onClick={() => scrollToSection('works')} className="text-xs sm:text-sm font-bold tracking-tight hover:opacity-70 transition">
              WORK
            </button>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="hidden md:inline text-sm tracking-wide">{hero.ctaText}</span>
            <button 
              onClick={() => copyToClipboard(hero.email)}
              className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm tracking-wide px-2 sm:px-4 py-1.5 sm:py-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105"
              style={{ borderRadius: '100px' }}
            >
              <span className="hidden sm:inline">{hero.email}</span>
              <span className="sm:hidden text-[10px]">EMAIL</span>
              {copied ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black-600" />
              ) : (
                <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-8 sm:pb-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 gradient-blob rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 gradient-blob rounded-full"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 sm:mb-8 leading-none">
            SELECTED<br/>WORKS
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
            A collection of projects showcasing web development, mobile applications, and digital experiences I've crafted for clients and personal exploration.
          </p>
        </div>
      </section>
     

      {/* Works Grid */}
      <section id="works" className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {filteredWorks.map((work, idx) => (
              <div
                key={work.id}
                ref={el => observerRefs.current[idx] = el}
                className="fade-in-up work-card bg-white rounded-lg overflow-hidden group cursor-pointer"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-xs tracking-widest text-gray-400">{work.year}</span>
                    <span className="bg-black text-white px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs tracking-wide">
                      {work.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
                    {work.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                    {work.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {work.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-[10px] sm:text-xs tracking-wide px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-4">
                    {work.liveUrl && (
                      <a
                        href={work.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-xs sm:text-sm tracking-wide hover:opacity-70 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>VIEW LIVE</span>
                      </a>
                    )}
                    {work.githubUrl && (
                      <a
                        href={work.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-xs sm:text-sm tracking-wide hover:opacity-70 transition"
                      >
                        <Github className="w-4 h-4" />
                        <span>CODE</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredWorks.length === 0 && (
            <div className="text-center py-16 sm:py-24">
              <p className="text-xl sm:text-2xl text-gray-400 tracking-wide">
                No projects found in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
            Have a project in mind?<br/>Let's build something amazing.
          </h2>
          <a
            href={`mailto:${contact.email}`}
            className="btn-primary inline-flex items-center space-x-2 bg-black text-white px-8 py-4 rounded-full text-sm tracking-wide font-medium hover:bg-gray-800 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>START A PROJECT</span>
          </a>
        </div>
      </section>

      {/* Contact Footer */}
      <section id="contact" className="pt-12 sm:pt-16 md:pt-24 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            <div className="text-center md:text-left">
              <h3 className="text-xs tracking-widest mb-3 sm:mb-4 text-gray-400">{contact.name}</h3>
              <div className="mb-6 sm:mb-8 flex justify-center md:justify-start">
                <img 
                  src={contact.profileImage}
                  alt="Profile" 
                  className="w-32 h-36 sm:w-40 sm:h-45 rounded-lg object-cover"
                />
              </div>
              <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/20 rounded hover:bg-white/10 transition">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href={contact.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/20 rounded hover:bg-white/10 transition">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href={contact.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/20 rounded hover:bg-white/10 transition">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                {contact.ctaTitle}
              </h2>
              <a href={`mailto:${contact.email}`} className="btn-primary bg-white text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm tracking-wide font-medium inline-flex items-center">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                GET IN TOUCH
              </a>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 pb-5 border-t border-white/10 text-center text-[10px] sm:text-xs text-gray-400">
            {contact.copyright}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
