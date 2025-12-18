import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Mail, Linkedin, Twitter, Instagram, Github, Copy, Check } from 'lucide-react';
import { portfolioContent } from '../data/content';

const Portfolio = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const { hero, projects, companies, designProcess, contact } = portfolioContent;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-xs sm:text-sm font-bold tracking-tight hover:opacity-70 transition">
              {hero.logoText}
            </button>
            <Link to="/work" className="text-xs sm:text-sm font-bold tracking-tight hover:opacity-70 transition">
              WORK
            </Link>
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
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-20 lg:pt-[10em] pb-12 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 gradient-blob rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 gradient-blob rounded-full"></div>
        
        <div className="max-w-[1240px] w-full relative z-10">
          <div className="hero-copy-wrapper text-center mb-8 sm:mb-12">
            <h1 className="hero-title font-black tracking-tight mb-4 leading-none mx-auto text-[48px] sm:text-[80px] md:text-[100px] lg:text-[120px]">
              {hero.title.split('\n').map((line, i) => (
                <div key={i}>
                  {line.split(' ').map((word, j) => (
                    <span key={j} className="hero-title-word" style={{ animationDelay: `${(i * 3 + j) * 0.15}s` }}>
                      {word}{' '}
                    </span>
                  ))}
                  {i < hero.title.split('\n').length - 1 && <br/>}
                </div>
              ))}
            </h1>
            <div className="hero-subcopy flex items-center justify-center text-[10px] sm:text-xs tracking-widest mt-4 sm:mt-6 flex-wrap gap-2 sm:gap-4 max-w-[800px] mx-auto">
              <span>{hero.location}</span>
              <span>{hero.phone}</span>
            </div>
            <div className="flex justify-center mt-6 sm:mt-8">
              <a 
                href="https://drive.google.com/file/d/12WtngZJVIwk3bgmRh7PiP6GSLWPdVLxR/view?usp=drive_link" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-black text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm tracking-wide font-medium hover:bg-gray-800 transition-all"
              >
                MY RESUME
              </a>
            </div>
          </div>

          <div className="flex justify-center mb-8 sm:mb-12 md:mb-16 px-4">
            <div className="hero-image-wrapper hero-image-container max-w-[800px] w-full h-full">
              <img 
                src={hero.profileImage}
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center mb-8 sm:mb-12 px-4">
            <p className="companies-title tracking-wide mb-6 sm:mb-8 text-lg sm:text-2xl md:text-3xl">
              {hero.companiesTitle}
            </p>
            <div className="companies-slider">
              <div className="companies-track">
                {[...companies, ...companies].map((company, idx) => (
                  <div key={idx} className="company-logo text-sm sm:text-base md:text-lg font-semibold px-4 sm:px-8">
                    {company.logo}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 pt-8 sm:pt-12 md:pt-[50px] px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
              {hero.tagline}
            </h2>
          </div>

          <div className="flex justify-center mb-8 sm:mb-12 md:mb-16 px-4">
            <div className="hero-image-wrapper hero-image-container max-w-[500px] w-full h-full">
              <img 
                src={hero.illustrationImage}
                alt="illustrationImage" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Design Process */}
      <section id="process" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-[1240px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight mb-8 sm:mb-12 md:mb-16 text-left leading-tight">
            My Proven <br/> Development Workflow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {designProcess.map((item, idx) => (
              <div 
                key={idx}
                ref={el => observerRefs.current[idx] = el}
                className="fade-in-up process-card bg-white p-6 sm:p-8 rounded-lg"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="text-xs tracking-widest text-gray-400 mb-3 sm:mb-4">{item.step}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-[1240px] mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 sm:mb-12 md:mb-16 leading-tight">
            RELEVANT<br/>EXPERIENCE
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {projects.map((project, idx) => (
              <div 
                key={project.id}
                ref={el => observerRefs.current[idx + 10] = el}
                className="fade-in-up project-card bg-white p-4 sm:p-6 md:p-8 rounded-lg cursor-pointer"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 sm:mb-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-0">{project.title}</h3>
                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs tracking-widest">
                    <span className="bg-black text-white px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs">{project.type}</span>
                    <span className="text-gray-500 text-[10px] sm:text-xs">{project.year}</span>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-[10px] sm:text-xs tracking-widest text-gray-400 mb-2">{project.role}</div>
                    <p className="text-sm sm:text-base text-gray-700 max-w-2xl leading-relaxed">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link to="/work" className="btn-primary inline-block bg-black text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm tracking-wide font-medium">
              VIEW WORK
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
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

export default Portfolio;