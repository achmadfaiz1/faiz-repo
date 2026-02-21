import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Linkedin,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code,
  User,
  FileBadge,
  ArrowUp
} from "lucide-react";

// --- Types ---
interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  items: Skill[];
}

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  bullets: string[];
}

interface ProjectItem {
  name: string;
  company: string;
  year: string;
  summary: string;
  bullets: string[];
}

interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  description: string;
  link?: string;
  image?: string;
}

// --- Components ---

const SectionHeading = ({ children, darkMode }: { children: React.ReactNode; darkMode: boolean }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`text-3xl md:text-4xl font-bold mb-12 text-center ${darkMode ? "text-white" : "text-gray-900"}`}
  >
    {children}
    <div className="w-16 h-1 bg-gradient-to-r from-[#0A4D68] to-[#06B6D4] mx-auto mt-4 rounded-full" />
  </motion.h2>
);

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function ImprovedPortfolio() {
  // --- State ---
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState("Core Skills");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [expandedProj, setExpandedProj] = useState<number | null>(null);
  
  // Loading progress bar state
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // --- Google Analytics Setup ---
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-B1RQYWDG2E';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-B1RQYWDG2E');
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: activeSection,
        page_location: window.location.href + '#' + activeSection,
      });
    }
  }, [activeSection]);

  const trackEvent = (action: string, category: string, label?: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    }
  };

  // --- Loading Progress Bar Effect ---
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        // Random increment for realistic feel
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // --- Data ---
  const navItems = [
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: ExternalLink },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "certifications", label: "Certs", icon: FileBadge },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const skillCategories: SkillCategory[] = [
    {
      category: "Core Skills",
      items: [
        { name: "People Analytics", level: 95 },
        { name: "SQL & BigQuery", level: 92 },
        { name: "Dashboard & Visualization", level: 90 },
        { name: "Performance Management", level: 94 },
      ],
    },
    {
      category: "Data Analysis",
      items: [
        { name: "SQL Query Optimization", level: 95 },
        { name: "PostgreSQL", level: 92 },
        { name: "R Studio", level: 85 },
        { name: "BigQuery", level: 95 },
        { name: "Tableau / Looker", level: 88 },
        { name: "DBeaver", level: 90 },
      ],
    },
    {
      category: "Human Resource",
      items: [
        { name: "Talent Management", level: 95 },
        { name: "Performance Management", level: 94 },
        { name: "Talent Acquisition", level: 85 },
        { name: "HR Tools Development", level: 88 },
        { name: "Lever ATS", level: 85 },
      ],
    },
    {
      category: "Languages",
      items: [
        { name: "English (Professional)", level: 90 },
        { name: "Bahasa Indonesia (Native)", level: 100 },
      ],
    },
    {
      category: "Supporting Skills",
      items: [
        { name: "Usability Testing", level: 90 },
        { name: "Figma", level: 85 },
        { name: "Google Workspace", level: 95 },
        { name: "Microsoft Office", level: 95 },
      ],
    },
  ];

  const experiences: ExperienceItem[] = [
    {
      role: "Performance Data Analyst",
      company: "GoTo",
      period: "January 2020 – Present",
      summary: "Performance analytics, calibration insights, and HR dashboard development",
      bullets: [
        "Delivered performance insights and calibration analysis for HR leaders.",
        "Developed dashboards and trackers using BigQuery and PostgreSQL.",
        "Led enhancements in internal 360 performance tools through cross-functional collaboration.",
        "Supported system reliability through continuous testing with engineering teams.",
      ],
    },
    {
      role: "Talent Acquisition Analyst",
      company: "GoTo",
      period: "June 2025 – Present",
      summary: "Recruitment analytics and workforce planning",
      bullets: [
        "Supported recruitment analytics and dashboard reporting across hiring stages.",
        "Streamlined SLA tracking to improve hiring process visibility.",
        "Delivered hiring projections to support workforce planning decisions.",
      ],
    },
    {
      role: "Business Analyst",
      company: "GoPay",
      period: "January 2019 – December 2019",
      summary: "Operational analytics, dashboarding, and fraud analysis",
      bullets: [
        "Provided data-driven insights to support operational decision-making.",
        "Analyzed merchant acquisition, customer transactions, and fraud patterns.",
        "Built real-time performance dashboards using BI tools.",
        "Tracked merchant and transaction performance to identify anomalies.",
        "Conducted fraud analysis by combining Salesforce and BigQuery data.",
      ],
    },
    {
      role: "Research Freelancer",
      company: "GoPay",
      period: "October 2018 – January 2019",
      summary: "Market research and user acceptance testing",
      bullets: [
        "Conducted market research to understand user behavior and product acceptance.",
        "Supported user acceptance testing to validate product usability and readiness.",
        "Provided research insights to support product and business decisions.",
      ],
    },
    {
      role: "Competitive Intelligence",
      company: "Uber",
      period: "July 2017 – July 2018",
      summary: "Market intelligence and competitor analysis",
      bullets: [
        "Performed market research and competitor benchmarking analysis.",
        "Collected and analyzed competitor data to support strategic insights.",
        "Delivered intelligence reports to support business and operational strategy.",
      ],
    },
  ];

  const projects: ProjectItem[] = [
    {
      name: "PAC Data Warehouse Project",
      company: "GoTo HoldCo",
      year: "2020",
      summary: "Centralized HR data warehouse and enabled self-service analytics",
      bullets: [
        "Collaborated with People Analytics team to consolidate HR data into centralized BigQuery warehouse.",
        "Ensured data sources were accurately recorded and consistently updated.",
        "Enabled self-service analytics access for HR teams to perform independent analysis.",
        "Improved data accessibility, integrity, and scalability for analytics and reporting.",
      ],
    },
    {
      name: "Merchant Acquisition and Fraud Transaction Analysis",
      company: "GoTo GoPay",
      year: "2019",
      summary: "Fraud detection analysis and merchant transaction validation",
      bullets: [
        "Defined fraud detection metrics to evaluate merchant behavior across lifecycle.",
        "Identified suspicious transaction patterns and abnormal merchant activity.",
        "Improved sales incentive accuracy by validating eligible transactions.",
        "Acted as first-level checker before escalation to Fraud and Risk team.",
      ],
    },
  ];

  const certifications: CertificationItem[] = [
    {
      title: "The Project Management Course: Beginner to PROject Manager",
      issuer: "Udemy",
      date: "August 2025",
      description: "Certification covering project lifecycle, planning, execution, risk management, and stakeholder communication.",
      link: "https://www.udemy.com/certificate/UC-8f286218-177b-4f0f-9348-4009768a0ab0/  ",
      image: "https://udemy-certificate.s3.amazonaws.com/image/UC-8f286218-177b-4f0f-9348-4009768a0ab0.jpg?v=1756463361000  "
    },
    {
      title: "Global HR Management",
      issuer: "Udemy",
      date: "July 2025",
      description: "Certification covering Navigating International Talent Acquisition, Engagement, and Retention Strategies.",
      link: "https://www.udemy.com/certificate/UC-dd5c84ac-57a4-4f39-b9d8-84898d437ba5/  ",
      image: "https://udemy-certificate.s3.amazonaws.com/image/UC-dd5c84ac-57a4-4f39-b9d8-84898d437ba5.jpg?v=1751636526000  "
    },
    {
      title: "BI-University Advanced Stream",
      issuer: "GoTo Group",
      date: "August 2019",
      description: "Advanced Business Intelligence certification focused on data analysis, SQL, dashboarding, and analytics best practices.",
    }
  ];

  // --- Effects ---
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 500);

      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 150;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        if (
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(element.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    trackEvent('click', 'button', 'Back to Top');
  };

  // --- Styles ---
  const themeClasses = darkMode ? "bg-[#0a0a0a] text-white" : "bg-[#f8f9fa] text-gray-900";
  const cardBaseClasses = darkMode
    ? "bg-[#111] border border-white/10 hover:border-[#06B6D4]/50"
    : "bg-white border border-gray-200 shadow-sm hover:border-[#0A4D68]";
  const mutedText = darkMode ? "text-gray-400" : "text-gray-600";
  const gradientText = "bg-clip-text text-transparent bg-gradient-to-r from-[#0A4D68] to-[#06B6D4]";

  return (
    <div className={`${themeClasses} min-h-screen font-sans selection:bg-[#0A4D68] selection:text-white transition-colors duration-500`}>
      
      {/* GRAIN TEXTURE OVERLAY - Fixed full screen */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* LOADING PROGRESS BAR - Shows on initial load */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] bg-[#0a0a0a] flex flex-col items-center justify-center"
          >
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0A4D68] to-[#06B6D4]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="mt-4 text-sm text-gray-400 font-medium">
              {Math.round(Math.min(loadingProgress, 100))}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/10 z-[100]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#0A4D68] to-[#06B6D4]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4`}
      >
        <div className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-md ${
          darkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-gray-200"
        }`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => trackEvent('click', 'nav', item.label)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? "text-white"
                  : darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-gradient-to-r from-[#0A4D68] to-[#06B6D4] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <item.icon size={14} />
                {item.label}
              </span>
            </a>
          ))}
        </div>

        <button
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            trackEvent('click', 'button', 'Mobile Menu Toggle');
          }}
          className="md:hidden fixed top-6 left-6 z-[60] p-3 rounded-full backdrop-blur-lg border bg-white/10 border-white/20 hover:bg-white/20 transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>

      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-6 right-6 z-[55] backdrop-blur-lg border border-white/20 bg-white/10 rounded-2xl p-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent('click', 'mobile_nav', item.label);
              }}
              className={`capitalize px-3 py-2 rounded-lg transition ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-[#0A4D68] to-[#06B6D4] text-white"
                  : mutedText
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <button
        onClick={() => {
          setDarkMode(!darkMode);
          trackEvent('click', 'button', `Theme Toggle ${!darkMode ? 'Dark' : 'Light'}`);
        }}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full backdrop-blur-md border transition-all hover:scale-110 ${
          darkMode ? "bg-white/10 border-white/20 text-[#06B6D4]" : "bg-white border-gray-200 text-[#0A4D68] shadow-lg"
        }`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className={`fixed bottom-20 right-6 z-50 p-3 rounded-full backdrop-blur-md border transition-all hover:scale-110 ${
              darkMode 
                ? "bg-gradient-to-r from-[#0A4D68] to-[#06B6D4] border-transparent text-white shadow-lg shadow-[#06B6D4]/25" 
                : "bg-gradient-to-r from-[#0A4D68] to-[#06B6D4] border-transparent text-white shadow-lg"
            }`}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="about" className="min-h-screen flex items-center justify-center relative px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 ${
            darkMode ? "bg-[#0A4D68]" : "bg-[#0A4D68]"
          }`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 ${
            darkMode ? "bg-[#06B6D4]" : "bg-[#06B6D4]"
          }`} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 relative inline-block"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-[#0A4D68] to-[#06B6D4]">
              <img
                src="https://res.cloudinary.com/dqszs1x5y/image/upload/v1771588295/WhatsApp_Image_2026-02-20_at_6.49.42_PM_nvzmpy.jpg  "
                alt="Achmad Faiz"
                className="w-full h-full rounded-full object-cover border-4 border-black"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Achmad <span className={gradientText}>Faiz</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-xl md:text-2xl mb-8 ${mutedText}`}
          >
            Performance Data Analyst & People Analytics Specialist
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {["SQL", "BigQuery", "Tableau", "HR Strategy", "R Studio", "Performance Management"].map((tag) => (
              <span key={tag} className={`px-4 py-2 rounded-full text-sm font-medium border ${
                darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
              }`}>
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#contact"
              onClick={() => trackEvent('click', 'button', 'Get in Touch')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0A4D68] to-[#06B6D4] text-white font-bold hover:shadow-lg hover:shadow-[#06B6D4]/25 transition-all hover:-translate-y-1"
            >
              Get in Touch
            </a>
            <a
              href="#experience"
              onClick={() => trackEvent('click', 'button', 'View Experience')}
              className={`px-8 py-4 rounded-full font-bold border transition-all hover:-translate-y-1 ${
                darkMode ? "border-white/20 hover:bg-white/10" : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              View Experience
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className={mutedText} />
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
        <SectionHeading darkMode={darkMode}>Skills</SectionHeading>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                setActiveSkillTab(cat.category);
                trackEvent('click', 'skill_tab', cat.category);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeSkillTab === cat.category
                  ? "bg-[#0A4D68] text-white shadow-lg shadow-[#06B6D4]/30"
                  : darkMode ? "bg-white/5 text-gray-400 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {skillCategories
              .filter((cat) => cat.category === activeSkillTab)
              .map((category) => (
                <React.Fragment key={category.category}>
                  {category.items.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-sm font-medium">
                        <span>{skill.name}</span>
                        <span className={mutedText}>{skill.level}%</span>
                      </div>
                      <div className={`h-2 w-full rounded-full overflow-hidden ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#0A4D68] to-[#06B6D4]"
                        />
                      </div>
                    </motion.div>
                  ))}
                </React.Fragment>
              ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <SectionHeading darkMode={darkMode}>Career Journey</SectionHeading>

        <div className="relative border-l border-white/20 ml-4 space-y-10">
          {experiences.map((exp, index) => (
            <div key={`${exp.company}-${exp.role}`} className="relative">
              <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-gradient-to-r from-[#0A4D68] to-[#06B6D4]" />

              <div
                onClick={() => {
                  setExpandedExp(expandedExp === index ? null : index);
                  trackEvent('click', 'experience', `${exp.role} - ${exp.company}`);
                }}
                className={`ml-6 border p-4 sm:p-6 rounded-xl transition cursor-pointer ${cardBaseClasses} ${
                  expandedExp === index
                    ? "border-[#06B6D4] shadow-lg shadow-[#06B6D4]/10 ring-1 ring-[#06B6D4]/40"
                    : "hover:border-[#06B6D4]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                  <h3 className="text-lg sm:text-xl font-semibold">{exp.role}</h3>
                  <span className="text-xs sm:text-sm text-gray-400">{exp.period}</span>
                </div>

                <p className="text-[#06B6D4] mb-2">{exp.company}</p>

                <p className={mutedText}>{exp.summary}</p>

                {expandedExp === index && (
                  <ul className={`mt-4 space-y-2 ${mutedText}`}>
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex gap-2 items-start">
                        <span className="text-[#06B6D4] mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <SectionHeading darkMode={darkMode}>Featured Projects</SectionHeading>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.name}
              onClick={() => {
                setExpandedProj(expandedProj === index ? null : index);
                trackEvent('click', 'project', project.name);
              }}
              className={`border p-4 sm:p-6 rounded-xl transition cursor-pointer ${cardBaseClasses} ${
                expandedProj === index
                  ? "border-[#06B6D4] shadow-lg shadow-[#06B6D4]/10"
                  : "hover:border-[#06B6D4]"
              }`}
            >
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="text-[#06B6D4]">{project.company}</p>
              <p className="text-sm text-gray-400 mb-2">{project.year}</p>
              <p className={mutedText}>{project.summary}</p>

              {expandedProj === index && (
                <ul className={`mt-4 space-y-2 ${mutedText}`}>
                  {project.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex gap-2 items-start">
                      <span className="text-[#06B6D4] mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <SectionHeading darkMode={darkMode}>Education</SectionHeading>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`${cardBaseClasses} border p-4 sm:p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left`}
        >
          <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 bg-white rounded-full p-2 flex items-center justify-center shadow-lg">
            <img
              src="https://res.cloudinary.com/dqszs1x5y/image/upload/v1771670628/Logo_of_North_Sumatra_University.svg_rs9pkq.png  "
              alt="Universitas Sumatera Utara Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Universitas Sumatera Utara</h3>
            <p className="text-[#06B6D4]">Diploma in Informatics Engineering</p>
            <p className="text-sm text-gray-400">2013 – 2016</p>
            <p className={`mt-2 ${mutedText}`}>GPA: 3.30</p>
          </div>
        </motion.div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 px-6 max-w-5xl mx-auto">
        <SectionHeading darkMode={darkMode}>Certifications</SectionHeading>
        
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${cardBaseClasses} p-6 rounded-2xl transition-all duration-300 hover:border-[#06B6D4]/50`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                  
                  <div className="mb-3">
                    <p className="text-[#06B6D4] font-medium">{cert.issuer}</p>
                    <p className="text-sm text-gray-400">{cert.date}</p>
                  </div>
                  
                  <p className={`mb-4 ${mutedText}`}>{cert.description}</p>
                  
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('click', 'certificate', cert.title)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white transition-all text-sm font-medium"
                    >
                      <ExternalLink size={14} />
                      Show Credential
                    </a>
                  )}
                </div>

                {cert.image && (
                  <a 
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('click', 'certificate_image', cert.title)}
                    className="block w-full md:w-48 h-32 rounded-lg overflow-hidden border border-white/10 hover:scale-105 transition-transform flex-shrink-0"
                  >
                    <img
                      src={cert.image}
                      alt={`${cert.title} Certificate`}
                      className="w-full h-full object-cover"
                    />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`${cardBaseClasses} p-12 rounded-3xl relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A4D68]/20 to-[#06B6D4]/20" />
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Thank You and Let's Connect!</h2>
              <p className={`text-lg mb-8 max-w-xl mx-auto ${mutedText}`}>
                I'm interested in People Analytics and Data Strategy.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:"
                  onClick={() => trackEvent('click', 'button', 'Send Email')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-100 transition-colors"
                >
                  <Mail size={20} />
                  Send Email
                </a>
                <a
                  href="https://linkedin.com  "
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('click', 'external_link', 'LinkedIn')}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold border transition-all ${
                    darkMode ? "border-white/20 hover:bg-white/10" : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <Linkedin size={20} />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </motion.div>
          
          <p className={`mt-12 text-sm ${mutedText}`}>
            © {new Date().getFullYear()} Achmad Faiz.
          </p>
        </div>
      </section>
    </div>
  );
}