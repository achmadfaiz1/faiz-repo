import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sun, 
  Moon, 
  User, 
  Briefcase, 
  Code2, 
  FolderOpen, 
  Mail, 
  ArrowUp, 
  ArrowDown,
  MapPin,
  ChevronRight,
  Database,
  BarChart3,
  Users,
  GraduationCap,
  Award,
  Linkedin,
  Search,
  Target,
  ExternalLink
} from 'lucide-react';

// Theme Context
const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);
    else if (savedTheme === 'light') setIsDark(false);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true);
  }, []);

  const toggleTheme = useCallback((e) => {
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;
    
    setIsTransitioning(true);
    
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.background = isDark ? '#f0f9ff' : '#0c4a6e';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    document.body.appendChild(ripple);

    requestAnimationFrame(() => {
      const maxDim = Math.max(window.innerWidth, window.innerHeight);
      ripple.style.width = maxDim * 2.5 + 'px';
      ripple.style.height = maxDim * 2.5 + 'px';
    });

    setTimeout(() => {
      setIsDark(prev => {
        const newTheme = !prev;
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        return newTheme;
      });
      
      setTimeout(() => {
        ripple.remove();
        setIsTransitioning(false);
      }, 800);
    }, 400);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Google Analytics Hook
const useGoogleAnalytics = () => {
  useEffect(() => {
    // Create script element for gtag.js
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-B1RQYWDG2E';
    
    // Create script element for gtag config
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-B1RQYWDG2E');
    `;
    
    // Insert scripts into head
    document.head.appendChild(script1);
    document.head.appendChild(script2);
    
    // Cleanup function
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);
};

// Scroll Progress Bar Component
const ScrollProgressBar = ({ isDark }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-1 z-[60] ${isDark ? 'bg-slate-900/50' : 'bg-slate-200/50'}`}
    >
      <div 
        className={`h-full transition-all duration-150 ease-out ${
          isDark ? 'bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]' : 'bg-sky-600 shadow-[0_0_10px_rgba(14,165,233,0.3)]'
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Liquid Glass Floating Menu - Always Visible
const LiquidGlassMenu = ({ activeSection, onNavigate, isDark, onThemeToggle }) => {
  const navItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div 
        className={`relative flex items-center gap-1 px-2 py-2 rounded-[2rem] transition-all duration-500 ${
          isDark 
            ? 'bg-slate-900/20 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10' 
            : 'bg-white/25 shadow-[0_8px_32px_rgba(14,165,233,0.15),inset_0_1px_0_rgba(255,255,255,0.6)] border border-white/40'
        } backdrop-blur-[20px] saturate-150`}
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)'
        }}
      >
        <div 
          className={`absolute inset-0 rounded-[2rem] pointer-events-none ${
            isDark 
              ? 'bg-gradient-to-b from-white/5 to-transparent' 
              : 'bg-gradient-to-b from-white/40 to-white/10'
          }`}
        />

        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => {
                onNavigate(id);
                // Track navigation click in GA
                if (window.gtag) {
                  window.gtag('event', 'nav_click', {
                    event_category: 'navigation',
                    event_label: id
                  });
                }
              }}
              className={`relative group flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                isActive
                  ? isDark
                    ? 'bg-sky-500/30 text-sky-300 shadow-[0_0_20px_rgba(14,165,233,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]' 
                    : 'bg-sky-500/20 text-sky-700 shadow-[0_0_20px_rgba(14,165,233,0.3),inset_0_1px_0_rgba(255,255,255,0.8)]'
                  : isDark
                    ? 'text-slate-400 hover:text-sky-300 hover:bg-white/5'
                    : 'text-slate-600 hover:text-sky-600 hover:bg-white/30'
              }`}
              aria-label={label}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              
              <span 
                className={`absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                  isDark 
                    ? 'bg-slate-900/90 text-slate-200 border border-slate-700' 
                    : 'bg-white/90 text-slate-700 border border-slate-200'
                } shadow-lg backdrop-blur-xl translate-y-2 group-hover:translate-y-0`}
              >
                {label}
              </span>

              {isActive && (
                <span 
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                    isDark ? 'bg-sky-400' : 'bg-sky-600'
                  } shadow-[0_0_10px_currentColor]`}
                />
              )}
            </button>
          );
        })}

        <div 
          className={`w-px h-6 mx-1 ${
            isDark ? 'bg-white/10' : 'bg-slate-400/20'
          }`}
        />

        <button
          onClick={(e) => {
            onThemeToggle(e);
            // Track theme toggle in GA
            if (window.gtag) {
              window.gtag('event', 'theme_toggle', {
                event_category: 'interaction',
                event_label: isDark ? 'light' : 'dark'
              });
            }
          }}
          className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 overflow-hidden ${
            isDark 
              ? 'text-amber-300 hover:bg-white/5' 
              : 'text-sky-600 hover:bg-white/30'
          }`}
          aria-label="Toggle theme"
        >
          <div 
            className={`absolute inset-0 rounded-full blur-md transition-opacity duration-500 ${
              isDark ? 'bg-amber-500/20' : 'bg-sky-400/20'
            }`}
          />
          <div className="relative z-10">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </div>
        </button>
      </div>
    </div>
  );
};

// Scroll Direction Indicator
const ScrollIndicator = ({ direction, isDark, onClick, visible }) => (
  <button
    onClick={onClick}
    className={`fixed right-6 bottom-6 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
    } ${
      isDark 
        ? 'bg-slate-900/30 text-sky-300 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
        : 'bg-white/30 text-sky-600 border border-white/50 shadow-[0_8px_32px_rgba(14,165,233,0.2)]'
    } backdrop-blur-[20px] hover:scale-110 active:scale-95`}
    style={{
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)'
    }}
    aria-label={direction === 'up' ? 'Scroll to top' : 'Scroll to bottom'}
  >
    {direction === 'up' ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
  </button>
);

// Certificate Card Component - FIXED
const CertificateCard = ({ title, provider, date, description, credentialLink, imageLink, isDark, noLink = false }) => {
  const CardContent = () => (
    <>
      {/* Content Side */}
      <div className="flex-1 flex flex-col">
        <h3 className={`text-xl md:text-2xl font-bold mb-2 transition-colors duration-500 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>{title}</h3>
        
        <p className={`text-base font-semibold mb-1 ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
          {provider}
        </p>
        
        <p className={`text-sm mb-4 transition-colors duration-500 ${
          isDark ? 'text-slate-500' : 'text-slate-500'
        }`}>
          {date}
        </p>
        
        <p className={`text-sm leading-relaxed mb-6 flex-grow transition-colors duration-500 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {description}
        </p>
        
        {!noLink ? (
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 w-fit ${
            isDark 
              ? 'bg-slate-800/50 text-sky-400 border border-sky-500/30 group-hover:bg-sky-500/20' 
              : 'bg-sky-50 text-sky-700 border border-sky-200 group-hover:bg-sky-100'
          }`}>
            <ExternalLink size={16} />
            Show Credential
          </div>
        ) : (
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold w-fit ${
            isDark 
              ? 'bg-slate-800/30 text-slate-500 border border-slate-700/50' 
              : 'bg-slate-100 text-slate-500 border border-slate-200'
          }`}>
            <Award size={16} />
            Certificate Available
          </div>
        )}
      </div>

      {/* Image Side */}
      {imageLink ? (
        <div className={`w-full md:w-48 h-32 md:h-auto flex-shrink-0 rounded-2xl overflow-hidden transition-transform duration-500 group-hover:scale-105 ${
          isDark ? 'bg-slate-800/50' : 'bg-slate-100'
        }`}>
          <img 
            src={imageLink} 
            alt={title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      ) : (
        <div className={`w-full md:w-48 h-32 md:h-auto flex-shrink-0 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${
          isDark ? 'bg-slate-800/50' : 'bg-sky-100'
        }`}>
          <Award size={48} className={isDark ? 'text-sky-400' : 'text-sky-600'} />
        </div>
      )}
    </>
  );

  const cardClassName = `group flex flex-col md:flex-row gap-6 p-6 rounded-3xl transition-all duration-500 hover:scale-[1.02] ${
    isDark 
      ? 'bg-slate-900/30 border border-slate-800/50 hover:border-sky-500/30' 
      : 'bg-white/60 border border-white/60 hover:border-sky-300/50 hover:shadow-lg'
  } backdrop-blur-xl ${noLink ? 'cursor-default' : 'cursor-pointer'}`;

  const cardStyle = {
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)'
  };

  if (noLink) {
    return (
      <div className={cardClassName} style={cardStyle}>
        <CardContent />
      </div>
    );
  }

  return (
    <a 
      href={credentialLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (window.gtag) {
          window.gtag('event', 'certificate_click', {
            event_category: 'engagement',
            event_label: title
          });
        }
      }}
      className={cardClassName}
      style={cardStyle}
    >
      <CardContent />
    </a>
  );
};

// Main App Component
const Portfolio = () => {
  const { isDark, toggleTheme } = React.useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);
  const isAtBottom = useRef(false);

  // Initialize Google Analytics
  useGoogleAnalytics();

  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    experience: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    education: useRef(null),
    certifications: useRef(null),
    contact: useRef(null)
  };

  useEffect(() => {
    const handleIntersection = (entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const mostVisible = visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        setActiveSection(mostVisible.target.id);
        
        // Track section view in GA
        if (window.gtag && mostVisible.intersectionRatio > 0.5) {
          window.gtag('event', 'section_view', {
            event_category: 'engagement',
            event_label: mostVisible.target.id
          });
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-10% 0px -40% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      
      const atBottom = currentScrollY >= maxScroll - 100;
      isAtBottom.current = atBottom;
      
      if (currentScrollY > lastScrollY.current + 5) {
        if (atBottom) {
          setScrollDirection('up');
        } else {
          setScrollDirection('down');
        }
      } else if (currentScrollY < lastScrollY.current - 5) {
        setScrollDirection('up');
      }
      
      setShowScrollIndicator(currentScrollY > 100);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Track scroll to top in GA
    if (window.gtag) {
      window.gtag('event', 'scroll_to_top', {
        event_category: 'navigation'
      });
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth' 
    });
    // Track scroll to bottom in GA
    if (window.gtag) {
      window.gtag('event', 'scroll_to_bottom', {
        event_category: 'navigation'
      });
    }
  };

  const handleScrollIndicatorClick = () => {
    if (scrollDirection === 'up') {
      scrollToTop();
    } else {
      scrollToBottom();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Scroll Progress Bar */}
      <ScrollProgressBar isDark={isDark} />
      
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ${
        isDark 
          ? 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.15),transparent),radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(6,182,212,0.1),transparent),radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.8)_0%,transparent_100%)]'
          : 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.15),transparent),radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(6,182,212,0.1),transparent),radial-gradient(circle_at_50%_50%,rgba(224,242,254,0.4)_0%,transparent_70%)]'
      }`} />

      <LiquidGlassMenu 
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />

      <ScrollIndicator 
        direction={scrollDirection}
        isDark={isDark}
        onClick={handleScrollIndicatorClick}
        visible={showScrollIndicator}
      />

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section 
          id="hero" 
          ref={sectionRefs.hero}
          className="min-h-screen flex flex-col justify-center items-center px-6 py-20 -mt-24"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-colors duration-500 ${
              isDark ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-sky-100 text-sky-700 border border-sky-200'
            }`}>
              <Database size={16} />
              Data Analyst & HR Analytics
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Achmad{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">
                Faiz
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl max-w-2xl mx-auto mb-8 leading-relaxed transition-colors duration-500 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Transforming complex data into strategic insights for human resources and business intelligence
            </p>
            
            <div className={`flex items-center justify-center gap-2 mb-12 transition-colors duration-500 ${
              isDark ? 'text-slate-500' : 'text-slate-500'
            }`}>
              <MapPin size={18} />
              <span>Jakarta Selatan, Indonesia</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => scrollToSection('experience')}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isDark 
                    ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-[0_0_30px_rgba(14,165,233,0.3)]' 
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-[0_0_30px_rgba(14,165,233,0.3)]'
                } hover:scale-105 active:scale-95`}
              >
                View Experience
                <ChevronRight size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 border-2 ${
                  isDark 
                    ? 'border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-400' 
                    : 'border-slate-300 text-slate-700 hover:border-sky-500 hover:text-sky-600'
                } hover:scale-105 active:scale-95`}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section 
          id="about" 
          ref={sectionRefs.about}
          className="py-24 px-6 scroll-mt-32"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className={`text-sm font-semibold tracking-wider uppercase mb-2 block transition-colors duration-500 ${
                isDark ? 'text-sky-400' : 'text-sky-600'
              }`}>About</span>
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Bridging Data and People</h2>
              <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>Combining technical expertise with human resources domain knowledge</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`space-y-6 text-lg leading-relaxed transition-colors duration-500 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <p>
                  I'm a Performance Data Analyst and Talent Acquisition Analyst at GOTO (Gojek Tokopedia), 
                  where I specialize in turning complex HR data into actionable insights.
                </p>
                <p>
                  With a foundation in Informatics Engineering from Universitas Sumatera Utara, 
                  I bring a technical perspective to people analytics, building scalable data infrastructure 
                  and intuitive dashboards.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '7+', label: 'Years Experience' },
                  { num: '10+', label: 'Data Tools' },
                  { num: '5', label: 'Major Projects' },
                  { num: '4', label: 'Companies' }
                ].map((stat, i) => (
                  <div 
                    key={i}
                    className={`p-6 rounded-3xl transition-all duration-500 hover:scale-105 ${
                      isDark 
                        ? 'bg-slate-900/30 border border-slate-800/50 hover:border-sky-500/30' 
                        : 'bg-white/40 border border-white/60 hover:border-sky-300/50'
                    } backdrop-blur-xl`}
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)'
                    }}
                  >
                    <div className={`text-4xl font-bold mb-2 transition-colors duration-500 ${
                      isDark ? 'text-sky-400' : 'text-sky-600'
                    }`}>{stat.num}</div>
                    <div className={`text-sm font-medium transition-colors duration-500 ${
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    }`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section 
          id="experience" 
          ref={sectionRefs.experience}
          className="py-24 px-6 scroll-mt-32"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className={`text-sm font-semibold tracking-wider uppercase mb-2 block transition-colors duration-500 ${
                isDark ? 'text-sky-400' : 'text-sky-600'
              }`}>Experience</span>
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Professional Journey</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Talent Acquisition Analyst',
                  company: 'GOTO (HoldCo)',
                  date: 'Jun 2025 — Present',
                  icon: Users,
                  points: [
                    'Supporting recruitment analytics and dashboard reporting across hiring stages in Lever ATS',
                    'Streamlined SLA tracking and delivered hiring projections to support workforce planning',
                    'Built automated reporting solutions for talent acquisition metrics'
                  ]
                },
                {
                  title: 'Performance Data Analyst',
                  company: 'GOTO (HoldCo)',
                  date: 'Jan 2020 — Present',
                  icon: BarChart3,
                  points: [
                    'Delivered performance insights and calibration analysis for HR leaders using BigQuery and PostgreSQL',
                    'Developed interactive dashboards and trackers for HR analytics',
                    'Led enhancements in internal 360° tools through cross-functional collaboration',
                    'Supported system reliability through continuous testing with engineering teams'
                  ]
                },
                {
                  title: 'Business Analyst',
                  company: 'GOTO (GoPay)',
                  date: 'Jan 2019 — Dec 2019',
                  icon: Database,
                  points: [
                    'Analyzed key metrics: merchant acquisition, customer transactions, and fraud patterns',
                    'Built real-time performance dashboards using Metabase and Google Data Studio',
                    'Tracked Point of Interest (POI) performance to identify trends and anomalies',
                    'Conducted fraud analysis combining Salesforce and BigQuery data'
                  ]
                },
                {
                  title: 'Research Freelancer',
                  company: 'GoPay',
                  date: 'Oct 2018 — Jan 2019',
                  icon: Search,
                  points: [
                    'Conducted market research to understand user behavior and product acceptance',
                    'Supported user acceptance testing to validate product usability and readiness',
                    'Provided research insights to support product and business decisions'
                  ]
                },
                {
                  title: 'Competitive Intelligence',
                  company: 'Uber',
                  date: 'Jul 2017 — Jul 2018',
                  icon: Target,
                  points: [
                    'Performed market research and competitor benchmarking analysis',
                    'Collected and analyzed competitor data to support strategic insights',
                    'Delivered intelligence reports to support business and operational strategy'
                  ]
                }
              ].map((job, i) => (
                <div 
                  key={i}
                  className={`p-8 rounded-3xl transition-all duration-500 hover:scale-[1.02] ${
                    isDark 
                      ? 'bg-slate-900/30 border border-slate-800/50 hover:border-sky-500/20' 
                      : 'bg-white/40 border border-white/60 hover:border-sky-300/50'
                  } backdrop-blur-xl cursor-pointer`}
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)'
                  }}
                >
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        isDark ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-600'
                      }`}>
                        <job.icon size={24} />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold mb-1 transition-colors duration-500 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>{job.title}</h3>
                        <div className={isDark ? 'text-sky-400' : 'text-sky-600'}>{job.company}</div>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      isDark ? 'bg-slate-800/50 text-slate-400 border border-slate-700/50' : 'bg-sky-50/50 text-sky-700 border border-sky-200/50'
                    }`}>{job.date}</span>
                  </div>
                  <ul className="space-y-3 ml-16">
                    {job.points.map((point, j) => (
                      <li 
                        key={j} 
                        className={`flex items-start gap-3 transition-colors duration-500 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        <span className={isDark ? 'text-sky-500' : 'text-sky-500'}>•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section 
          id="skills" 
          ref={sectionRefs.skills}
          className="py-24 px-6 scroll-mt-32"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className={`text-sm font-semibold tracking-wider uppercase mb-2 block transition-colors duration-500 ${
                isDark ? 'text-sky-400' : 'text-sky-600'
              }`}>Expertise</span>
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Skills & Technologies</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: Database, 
                  title: 'Data Analysis', 
                  skills: ['SQL Query', 'PostgreSQL', 'BigQuery', 'R Studio', 'DBeaver', 'Google Sheets'] 
                },
                { 
                  icon: BarChart3, 
                  title: 'Visualization', 
                  skills: ['Looker', 'Tableau', 'Metabase', 'Google Data Studio'] 
                },
                { 
                  icon: Users, 
                  title: 'HR Tech', 
                  skills: ['Performance Management', 'Talent Management', 'Lever ATS', 'HR Tools Development'] 
                },
                { 
                  icon: Code2, 
                  title: 'Productivity', 
                  skills: ['Figma', 'MS Office', 'Google Workspace', 'Salesforce'] 
                },
                { 
                  icon: Briefcase, 
                  title: 'Methodologies', 
                  skills: ['Project Management', 'Stakeholder Management', 'Product Management', 'Usability Testing'] 
                },
                { 
                  icon: Award, 
                  title: 'Languages', 
                  skills: ['English', 'Bahasa Indonesia'] 
                }
              ].map((category, i) => (
                <div 
                  key={i}
                  className={`p-6 rounded-3xl transition-all duration-500 hover:scale-105 ${
                    isDark 
                      ? 'bg-slate-900/30 border border-slate-800/50 hover:border-sky-500/20' 
                      : 'bg-white/40 border border-white/60 hover:border-sky-300/50'
                  } backdrop-blur-xl`}
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon className={isDark ? 'text-sky-400' : 'text-sky-600'} size={24} />
                    <h3 className={`text-lg font-bold transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, j) => (
                      <span 
                        key={j}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 ${
                          isDark 
                            ? 'bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-sky-500/30' 
                            : 'bg-sky-50/50 text-sky-700 border border-sky-200/50 hover:border-sky-400/50'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          ref={sectionRefs.projects}
          className="py-24 px-6 scroll-mt-32"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className={`text-sm font-semibold tracking-wider uppercase mb-2 block transition-colors duration-500 ${
                isDark ? 'text-sky-400' : 'text-sky-600'
              }`}>Work</span>
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Featured Projects</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  company: 'GOTO HoldCo',
                  title: 'Project PAC Data Warehouse',
                  desc: 'Centralized HR data warehouse initiative consolidating people analytics into BigQuery. Enabled self-service data access and built scalable infrastructure.',
                  tags: ['BigQuery', 'Data Warehouse', 'ETL']
                },
                {
                  company: 'GOTO GoPay',
                  title: 'Merchant Fraud Detection',
                  desc: 'Defined fraud detection metrics analyzing merchant behavior from acquisition to transaction. Improved sales incentive accuracy by validating transactions.',
                  tags: ['Fraud Analysis', 'Salesforce', 'Risk Management']
                },
                {
                  company: 'GOTO HoldCo',
                  title: '360° Performance Tools',
                  desc: 'Led enhancement of internal performance evaluation tools through cross-functional collaboration. Established continuous testing protocols.',
                  tags: ['Product Management', 'HR Tech', 'Agile']
                }
              ].map((project, i) => (
                <div 
                  key={i}
                  className={`p-8 rounded-3xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                    isDark 
                      ? 'bg-slate-900/30 border border-slate-800/50 hover:border-sky-500/20 hover:shadow-[0_0_40px_rgba(14,165,233,0.15)]' 
                      : 'bg-white/40 border border-white/60 hover:border-sky-300/50 hover:shadow-[0_0_40px_rgba(14,165,233,0.1)]'
                  } backdrop-blur-xl`}
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)'
                  }}
                >
                  <div className={`text-xs font-bold tracking-wider uppercase mb-3 transition-colors duration-500 ${
                    isDark ? 'text-sky-400' : 'text-sky-600'
                  }`}>{project.company}</div>
                  <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>{project.title}</h3>
                  <p className={`mb-6 leading-relaxed transition-colors duration-500 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span 
                        key={j}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark ? 'bg-slate-800/50 text-slate-300 border border-slate-700/50' : 'bg-sky-50/50 text-sky-700 border border-sky-200/50'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section 
          id="education" 
          ref={sectionRefs.education}
          className="py-24 px-6 scroll-mt-32"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className={`text-sm font-semibold tracking-wider uppercase mb-2 block transition-colors duration-500 ${
                isDark ? 'text-sky-400' : 'text-sky-600'
              }`}>Academic Background</span>
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Education</h2>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className={`p-8 rounded-3xl text-center transition-all duration-500 hover:scale-105 ${
                isDark 
                  ? 'bg-slate-900/30 border border-slate-800/50 hover:border-sky-500/20' 
                  : 'bg-white/40 border border-white/60 hover:border-sky-300/50'
              } backdrop-blur-xl`}
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)'
              }}
              >
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <img 
                    src="https://res.cloudinary.com/dqszs1x5y/image/upload/v1771670628/Logo_of_North_Sumatra_University.svg_rs9pkq.png"
                    alt="Universitas Sumatera Utara Logo"
                    className={`w-full h-full object-contain rounded-full p-2 transition-colors duration-500 ${
                      isDark ? 'bg-white/10' : 'bg-white/60'
                    }`}
                  />
                </div>
                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>Universitas Sumatera Utara</h3>
                <p className={`text-lg mb-2 ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
                  Informatics Engineering Diploma
                </p>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  2013 — 2016
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section 
          id="certifications" 
          ref={sectionRefs.certifications}
          className="py-24 px-6 scroll-mt-32"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className={`text-sm font-semibold tracking-wider uppercase mb-2 block transition-colors duration-500 ${
                isDark ? 'text-sky-400' : 'text-sky-600'
              }`}>Professional Development</span>
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Certifications</h2>
            </div>

            <div className="flex flex-col gap-6">
              <CertificateCard 
                title="The Project Management Course: Beginner to PROject Manager"
                provider="Udemy"
                date="August 2025"
                description="Certification covering project lifecycle, planning, execution, risk management, and stakeholder communication."
                credentialLink="https://www.udemy.com/certificate/UC-8f286218-177b-4f0f-9348-4009768a0ab0/"
                imageLink="https://udemy-certificate.s3.amazonaws.com/image/UC-8f286218-177b-4f0f-9348-4009768a0ab0.jpg?v=1756463361000"
                isDark={isDark}
              />
              
              <CertificateCard 
                title="Global HR Management"
                provider="Udemy"
                date="July 2025"
                description="Certification covering Navigating International Talent Acquisition, Engagement, and Retention Strategies."
                credentialLink="https://www.udemy.com/certificate/UC-dd5c84ac-57a4-4f39-b9d8-84898d437ba5/"
                imageLink="https://udemy-certificate.s3.amazonaws.com/image/UC-dd5c84ac-57a4-4f39-b9d8-84898d437ba5.jpg?v=1771655522000"
                isDark={isDark}
              />
              
              {/* Gojek BI University - No credentials available */}
              <CertificateCard 
                title="Gojek Business Intelligence University"
                provider="Advanced Stream"
                date="2019"
                description="Business Intelligence Certification covering advanced data analytics, visualization, and strategic decision-making."
                imageLink="https://res.cloudinary.com/dqszs1x5y/image/upload/v1771746586/1763693079986_ai7dvy.jpg"
                isDark={isDark}
                noLink={true}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          ref={sectionRefs.contact}
          className="py-24 px-6 pb-32 scroll-mt-32"
        >
          <div className="max-w-4xl mx-auto">
            <div className={`p-12 rounded-[2.5rem] text-center transition-all duration-500 ${
              isDark 
                ? 'bg-gradient-to-br from-sky-950/30 to-slate-900/30 border border-sky-900/20' 
                : 'bg-gradient-to-br from-sky-50/50 to-cyan-50/50 border border-sky-200/50'
            } backdrop-blur-2xl`}
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)'
            }}
            >
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Let's work together</h2>
              <p className={`text-lg mb-12 max-w-xl mx-auto transition-colors duration-500 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Open to discussing data analytics, HR technology, and new opportunities
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="mailto:achmad.f.faiz@gmail.com"
                  onClick={() => {
                    // Track email click in GA
                    if (window.gtag) {
                      window.gtag('event', 'contact_click', {
                        event_category: 'conversion',
                        event_label: 'email'
                      });
                    }
                  }}
                  className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-slate-800/50 text-white hover:bg-slate-700/50 border border-slate-700/50' 
                      : 'bg-white/60 text-slate-900 hover:bg-white/80 border border-slate-200/50 shadow-lg'
                  } backdrop-blur-xl`}
                >
                  <Mail size={20} />
                  Email
                </a>
                <a 
                  href="https://www.linkedin.com/in/achmadf18/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    // Track LinkedIn click in GA
                    if (window.gtag) {
                      window.gtag('event', 'contact_click', {
                        event_category: 'conversion',
                        event_label: 'linkedin'
                      });
                    }
                  }}
                  className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-slate-800/50 text-white hover:bg-slate-700/50 border border-slate-700/50' 
                      : 'bg-white/60 text-slate-900 hover:bg-white/80 border border-slate-200/50 shadow-lg'
                  } backdrop-blur-xl`}
                >
                  <Linkedin size={20} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`py-8 px-6 text-center transition-colors duration-500 ${
        isDark ? 'text-slate-600 border-t border-slate-900/50' : 'text-slate-500 border-t border-slate-200/50'
      }`}>
        <p>&copy; 2026 Achmad Faiz. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <Portfolio />
  </ThemeProvider>
);

export default App;