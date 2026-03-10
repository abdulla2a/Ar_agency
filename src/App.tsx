/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Globe, 
  Palette, 
  Layout, 
  Cpu, 
  Code, 
  Sparkles, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Menu, 
  X,
  Instagram,
  MessageCircle
} from 'lucide-react';

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 5; // Faster loading
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[100] bg-maroon-dark flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-rich/20 to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center relative z-10"
      >
        <h1 className="text-7xl md:text-9xl font-serif italic text-cream tracking-tighter mb-6 gradient-text text-glow-cream">
          ar_agency
        </h1>
        <div className="w-72 md:w-96 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-maroon-glow via-cream to-maroon-glow shadow-[0_0_20px_rgba(255,26,26,0.8)]"
          />
        </div>
        <motion.p 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 text-cream-muted font-mono text-[10px] tracking-[0.3em] uppercase"
        >
          Initializing Creative Core {progress}%
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-maroon-glow via-gold to-white z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-3 bg-maroon-dark/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-serif italic text-cream gradient-text"
        >
          ar_agency
        </motion.div>

        <div className="hidden md:flex space-x-10 items-center">
          {['Home', 'Services', 'Work', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[11px] uppercase tracking-[0.2em] text-cream/60 hover:text-cream transition-all hover:tracking-[0.3em]"
            >
              {item}
            </motion.a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Get in touch
          </motion.button>
        </div>

        <button 
          className="md:hidden text-cream p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden fixed inset-0 bg-maroon-dark z-[60] flex flex-col items-center justify-center"
          >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-gradient-to-bl from-maroon-glow/10 via-transparent to-transparent -translate-y-1/2 translate-x-1/2 blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 mix-blend-overlay" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 0.03, scale: 1, rotate: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center text-[80vw] font-serif italic text-cream select-none pointer-events-none"
              >
                A
              </motion.div>
            </div>

            {/* Close Button - Top Right */}
            <button 
              className="absolute top-8 right-8 text-cream p-4 rounded-full border border-cream/10 bg-white/5 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Menu Links */}
            <div className="relative z-10 flex flex-col items-center space-y-12">
              {['Home', 'Services', 'Work', 'Contact'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 40, rotate: 5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -40, rotate: -5 }}
                  transition={{ 
                    delay: 0.1 + i * 0.1, 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                >
                  <a 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="group relative block"
                  >
                    <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-maroon-glow text-xs font-mono opacity-0 group-hover:opacity-100 transition-all duration-500">
                      0{i + 1}
                    </span>
                    <span className="text-6xl font-serif italic text-cream hover:text-maroon-glow transition-colors duration-500 text-glow-cream">
                      {item}
                    </span>
                    <div className="h-[1px] w-0 bg-maroon-glow group-hover:w-full transition-all duration-700 mt-2" />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 left-0 w-full px-12 flex flex-col items-center gap-8"
            >
              <div className="flex space-x-12">
                <a href="https://www.instagram.com/ar_agency3?igsh=MWk0Y2ljcHFxa3lxdQ==" target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-maroon-glow transition-colors flex flex-col items-center gap-2 group">
                  <Instagram className="w-6 h-6" />
                  <span className="text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Instagram</span>
                </a>
                <a href="https://wa.me/message/D3BFA3JKJLQLA1" target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-maroon-glow transition-colors flex flex-col items-center gap-2 group">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp</span>
                </a>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-cream/30 font-mono">
                ar_agency © 2026
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 10]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6">
      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-maroon-glow/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-maroon-rich/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center space-x-3 px-5 py-2 rounded-full border border-white/10 text-cream/60 text-[10px] uppercase tracking-[0.3em] mb-8 bg-white/[0.02] backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 text-maroon-glow" />
            <span>The Future of Digital Art</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif italic leading-[0.9] tracking-tighter mb-8 gradient-text text-glow-cream">
            Elevating <br />
            <span className="text-glow text-maroon-glow">Digital Reality.</span>
          </h1>
          
          <p className="text-base md:text-lg text-cream-muted max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed font-light">
            We are a creative agency specializing in transforming ideas into stunning digital experiences. We design websites, brands, and systems with a powerful, unforgettable artistic touch.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,26,26,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-5 bg-cream text-maroon-dark rounded-full font-semibold flex items-center justify-center space-x-3 group shiny-effect"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <button className="text-cream/50 hover:text-cream text-xs uppercase tracking-widest transition-all border-b border-transparent hover:border-cream/20 pb-1">
              View Our Portfolio
            </button>
          </div>
        </motion.div>

        <div className="relative perspective-2000 hidden lg:block">
          <motion.div
            style={{ y: y1, rotateX: rotate }}
            className="relative z-20 w-full max-w-[450px] ml-auto aspect-[4/5] bg-glass rounded-[40px] gradient-border p-12 flex flex-col justify-between overflow-hidden preserve-3d shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-maroon-glow/10 via-transparent to-gold/5 pointer-events-none" />
            <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 animate-[shine_8s_infinite] pointer-events-none" />
            
            <div className="flex justify-between items-start relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md">
                <Globe className="text-maroon-glow w-7 h-7" />
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-[0.3em] text-cream/30 mb-1">System Core</p>
                <p className="text-xs font-mono text-cream/80">v2.0.26_STABLE</p>
              </div>
            </div>
            
            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-cream/40">
                  <span>Rendering Engine</span>
                  <span>98%</span>
                </div>
                <div className="h-[1px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "98%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="h-full bg-maroon-glow shadow-[0_0_15px_rgba(255,26,26,0.5)]"
                  />
                </div>
              </div>
              <h3 className="text-5xl font-serif italic text-cream leading-tight gradient-text">Architecting <br /> Pure Emotion</h3>
            </div>
          </motion.div>

          {/* Floating Accents */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-12 z-30 w-48 h-48 bg-maroon-rich/60 backdrop-blur-3xl rounded-3xl border border-white/10 p-8 shadow-2xl"
          >
            <Cpu className="text-maroon-glow w-10 h-10 mb-6" />
            <div className="space-y-3">
              <div className="h-[2px] w-full bg-white/10" />
              <div className="h-[2px] w-2/3 bg-white/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Web Development",
      desc: "Interactive websites with 3D touches and an unparalleled user experience.",
      icon: <Globe className="w-7 h-7" />,
      tag: "Web 3.0"
    },
    {
      title: "Branding & Identity",
      desc: "We build a visual identity that tells your brand's story.",
      icon: <Palette className="w-7 h-7" />,
      tag: "Branding"
    },
    {
      title: "Graphic Design",
      desc: "Posters and creative designs that catch the eye.",
      icon: <Layout className="w-7 h-7" />,
      tag: "Design"
    },
    {
      title: "System Architecture",
      desc: "Integrated software solutions and smart systems for your business.",
      icon: <Cpu className="w-7 h-7" />,
      tag: "Systems"
    },
    {
      title: "Software Development",
      desc: "Mobile and desktop applications with powerful performance.",
      icon: <Code className="w-7 h-7" />,
      tag: "Software"
    },
    {
      title: "AI Integration",
      desc: "Merging the latest AI technologies into your projects.",
      icon: <Sparkles className="w-7 h-7" />,
      tag: "AI Core"
    }
  ];

  return (
    <section id="services" className="py-32 relative px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 space-y-8 lg:space-y-0">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-maroon-glow text-[10px] uppercase tracking-[0.4em] mb-4 font-semibold"
            >
              Our Expertise
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif italic text-cream leading-tight"
            >
              Our Powerful Services
            </motion.h2>
          </div>
          <p className="text-cream-muted max-w-md text-sm leading-relaxed font-light">
            We don't just design; we create integrated digital worlds that serve your goals and exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-10 rounded-[32px] bg-glass gradient-border overflow-hidden transition-all duration-500 hover:bg-white/[0.05]"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-4xl font-serif italic text-cream">{i + 1}</span>
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-maroon-rich/40 flex items-center justify-center text-maroon-glow mb-8 group-hover:bg-maroon-glow group-hover:text-white transition-all duration-500 shadow-xl">
                  {service.icon}
                </div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-maroon-glow mb-2 font-bold">{service.tag}</div>
                <h3 className="text-2xl font-serif italic text-cream mb-4 group-hover:text-glow-cream transition-all">{service.title}</h3>
                <p className="text-cream-muted text-sm leading-relaxed font-light mb-8">{service.desc}</p>
                
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-cream/40 group-hover:text-cream transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const projects = [
    { title: "Ar Agency", category: "Branding", image: "https://i.ibb.co/x8whjGZd/a05834d55bfb.jpg" },
    { title: "T-Shirt Ar", category: "Fashion", image: "https://i.ibb.co/NGNSBgg/d85aad9f9d52.jpg" },
    { title: "Photo Manipulation", category: "Design", image: "https://i.ibb.co/5hdR0gGS/0558a36bb25e.jpg" },
    { title: "branding Energy", category: "Energy Drink", image: "https://i.ibb.co/9kZmMMV3/99ff4c8ad4db.jpg" },
    { title: "Callender Ramadan", category: "Callender", image: "https://i.ibb.co/0R9hCtkf/05c4c249c5d2.jpg" },
    { title: "MENU", category: "healthy bites", image: "https://i.ibb.co/xKNDf0LY/392be71c1f41.jpg" }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x: x * 15, y: -y * 15 });
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff + projects.length) % projects.length);
    const adjustedDiff = normalizedDiff > projects.length / 2 
      ? normalizedDiff - projects.length 
      : normalizedDiff;
    
    const isActive = adjustedDiff === 0;
    const isLeft = adjustedDiff === -1 || adjustedDiff === projects.length - 1;
    const isRight = adjustedDiff === 1 || adjustedDiff === -(projects.length - 1);
    const isFar = Math.abs(adjustedDiff) >= 2;

    // Mobile adjustments
    const xOffset = isMobile ? 180 : 280;
    const zOffset = isMobile ? -30 : -50;
    const rotateAngle = isMobile ? 20 : 35;
    const scaleActive = isMobile ? 1.1 : 1.15;
    const scaleSide = isMobile ? 0.75 : 0.8;

    if (isFar) {
      return {
        transform: `translateX(${adjustedDiff * (isMobile ? 250 : 400)}px) translateZ(-300px) rotateY(${adjustedDiff > 0 ? -rotateAngle/2 : rotateAngle/2}deg) scale(0.5)`,
        opacity: 0,
        zIndex: 0,
      };
    }

    if (isActive) {
      return {
        transform: `translateX(0px) translateZ(${isMobile ? 50 : 100}px) rotateY(0deg) scale(${scaleActive})`,
        opacity: 1,
        zIndex: 30,
      };
    }

    if (isLeft) {
      return {
        transform: `translateX(-${xOffset}px) translateZ(${zOffset}px) rotateY(${rotateAngle}deg) scale(${scaleSide})`,
        opacity: isMobile ? 0.4 : 0.6,
        zIndex: 20,
      };
    }

    if (isRight) {
      return {
        transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(-${rotateAngle}deg) scale(${scaleSide})`,
        opacity: isMobile ? 0.4 : 0.6,
        zIndex: 20,
      };
    }

    return {
      transform: `translateX(${adjustedDiff * (isMobile ? 220 : 350)}px) translateZ(-100px) scale(0.6)`,
      opacity: 0.3,
      zIndex: 10,
    };
  };

  return (
    <section id="work" className="py-32 bg-maroon-rich/10 px-6 relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-maroon-glow/40 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, "-10%"],
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Light Beam Effect */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-maroon-glow/40 via-maroon-glow/10 to-transparent pointer-events-none"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full border border-maroon-glow/30 bg-maroon-glow/5 text-maroon-glow text-[10px] uppercase tracking-[0.4em] mb-6"
            >
              Portfolio
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-serif italic text-cream mb-4 text-glow-cream">Selected Work</h2>
            <p className="text-cream-muted max-w-xl font-light text-lg leading-relaxed">
              A curated collection of digital masterpieces in 3D space.
            </p>
          </div>
        </div>

        {/* 3D Carousel Container */}
        <div 
          className="relative h-[400px] sm:h-[450px] md:h-[600px] perspective-[1200px] touch-pan-y"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => { setIsHovering(false); setMousePosition({ x: 0, y: 0 }); }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full border border-cream/20 bg-maroon-dark/80 backdrop-blur-md flex items-center justify-center text-cream hover:bg-cream hover:text-maroon-dark transition-all duration-500 group shadow-2xl hover:shadow-cream/20"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full border border-cream/20 bg-maroon-dark/80 backdrop-blur-md flex items-center justify-center text-cream hover:bg-cream hover:text-maroon-dark transition-all duration-500 group shadow-2xl hover:shadow-cream/20"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 3D Cards Container */}
          <div className="absolute inset-0 flex items-center justify-center preserve-3d">
            {projects.map((project, i) => {
              const isActive = i === currentIndex;
              const style = getCardStyle(i);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-[280px] md:w-[320px] h-[380px] md:h-[450px] cursor-pointer"
                  initial={false}
                  animate={{
                    ...style,
                    rotateX: isActive && isHovering ? mousePosition.y : 0,
                    rotateY: isActive && isHovering ? mousePosition.x : undefined,
                  }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={() => setCurrentIndex(i)}
                  style={{ zIndex: style.zIndex as number }}
                >
                  {/* Card Glow Effect */}
                  {isActive && (
                    <motion.div
                      className="absolute -inset-4 bg-maroon-glow/20 rounded-2xl blur-2xl"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-maroon-dark/50 backdrop-blur-sm border border-cream/10">
                    {/* Shine Effect on Active */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-20 pointer-events-none"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: "200%", opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      />
                    )}
                    
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={`w-full h-full object-cover transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark via-transparent to-transparent opacity-80" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <motion.div
                        initial={false}
                        animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0.7 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-maroon-glow text-[10px] uppercase tracking-[0.4em] font-bold mb-2">
                          {project.category}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif italic text-cream leading-tight">
                          {project.title}
                        </h3>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="mt-12 flex justify-center gap-3">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 transition-all duration-500 rounded-full ${currentIndex === i ? 'w-12 bg-maroon-glow' : 'w-4 bg-cream/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="py-20 border-t border-white/5 bg-maroon-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-serif italic text-cream mb-6">ar_agency</h2>
            <p className="text-cream-muted max-w-sm mb-8">
              We are here to create the impossible. Contact us today to start our creative journey together.
            </p>
            <div className="flex space-x-6">
              <motion.a 
                href="https://www.instagram.com/ar_agency3?igsh=MWk0Y2ljcHFxa3lxdQ=="
                target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -5, color: '#800000' }}
                className="text-cream/50 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="https://wa.me/message/D3BFA3JKJLQLA1"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -5, color: '#800000' }}
                className="text-cream/50 transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest text-cream mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Work', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-cream-muted hover:text-cream transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-cream mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="text-cream-muted">hello@aragency.com</li>
              <li className="text-cream-muted">+964 751 207 8027</li>
              <li className="text-cream-muted">Duhok, Iraq</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5">
          <p className="text-cream/30 text-sm mb-4 md:mb-0">
            © 2026 ar_agency. All rights reserved.
          </p>
          <div className="flex space-x-8 text-xs uppercase tracking-widest text-cream/30">
            <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <main>
            <Hero />
            <Services />
            <Work />
            
            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
              <div className="max-w-5xl mx-auto px-6">
                <motion.div 
                  whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
                  viewport={{ once: true }}
                  className="relative aspect-square md:aspect-video rounded-[3rem] bg-maroon-dark flex flex-col items-center justify-center text-center overflow-hidden border border-maroon-glow/20 shadow-2xl"
                >
                  {/* Luxury Background Elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-maroon-rich/50 to-transparent" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-20 mix-blend-overlay" />
                  
                  {/* Animated Glow */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-maroon-glow blur-[120px] rounded-full"
                  />

                  <div className="relative z-10 px-8">
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="text-maroon-glow text-xs font-mono uppercase tracking-[0.5em] mb-6 block"
                    >
                      Limited Availability
                    </motion.span>
                    <h2 className="text-3xl md:text-8xl font-serif italic text-cream mb-6 leading-tight">
                      Ready to <br /> <span className="text-glow-cream">Stand Out?</span>
                    </h2>
                    <p className="text-cream-muted mb-8 max-w-md mx-auto text-sm md:text-lg font-light leading-relaxed">
                      We only take on 3 projects per month to ensure absolute perfection. Secure your spot in our creative journey.
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(253,252,240,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 md:px-12 md:py-5 bg-cream text-maroon-dark rounded-full font-bold text-base md:text-lg transition-all duration-500"
                      >
                        Start Your Project
                      </motion.button>
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-cream/20" />
                  <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-cream/20" />
                  <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-cream/20" />
                  <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-cream/20" />
                </motion.div>
              </div>
            </section>
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
