import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";

export default function OnePagePortfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("about");
  // mobileMenuOpen removed because mobile menu is not currently used
  const [activeSkillTab, setActiveSkillTab] = useState("Core Skills");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const themeClasses = darkMode
    ? "bg-transparent text-white"
    : "bg-transparent text-gray-900";

  const cardBaseClasses = darkMode
    ? "bg-white/5 border-white/10"
    : "bg-white/90 border-gray-200 shadow-sm backdrop-blur-sm";

  const mutedText = darkMode ? "text-gray-300" : "text-gray-700";

  const navItems = [
    "about",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
    "contact",
  ];

  useEffect(() => {
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScrollProgress);
    handleScrollProgress();

    return () => window.removeEventListener("scroll", handleScrollProgress);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    let ticking = false;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentSection = "about";

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          currentSection = element.id;
        }
      });

      setActiveSection(currentSection);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const skillCategories = [
    {
      category: "Core Skills",
      items: [
        { name: "People Analytics", level: 95 },
        { name: "SQL & BigQuery", level: 92 },
        { name: "Dashboard & Visualization", level: 90 },
        { name: "Performance Management", level: 94 },
        { name: "Talent Acquisition Analytics", level: 88 },
      ],
    },
    {
      category: "Data Analysis",
      items: [
        { name: "SQL Query", level: 95 },
        { name: "PostgreSQL", level: 92 },
        { name: "R Studio", level: 85 },
        { name: "BigQuery", level: 95 },
        { name: "DBeaver", level: 90 },
        { name: "Google Sheets", level: 93 },
        { name: "Looker", level: 90 },
        { name: "Tableau", level: 80 },
      ],
    },
    {
      category: "Human Resource",
      items: [
        { name: "Performance and Talent Management", level: 95 },
        { name: "Talent Acquisition", level: 85 },
        { name: "Internal Communication", level: 90 },
        { name: "HR Tools Development", level: 88 },
      ],
    },
    {
      category: "Language",
      items: [
        { name: "English", level: 90 },
        { name: "Bahasa Indonesia", level: 100 },
      ],
    },
    {
      category: "Other Tools",
      items: [
        { name: "Figma", level: 80 },
        { name: "MS Office", level: 92 },
        { name: "Google Workspace", level: 95 },
        { name: "Lever ATS", level: 85 },
      ],
    },
    {
      category: "Supporting Skills",
      items: [
        { name: "Project Management", level: 90 },
        { name: "Stakeholder Management", level: 95 },
        { name: "Product Management", level: 85 },
        { name: "Researcher", level: 92 },
        { name: "Usability Testing", level: 88 },
        { name: "Working with team or Independent", level: 95 },
      ],
    },
  ];

  const experiences = [
    {
      role: "Performance Data Analyst",
      company: "GoTo",
      period: "January 2020 – Present",
      summary:
        "Performance analytics, calibration insights, and HR dashboard development",
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

  const projects = [
    {
      name: "Project Atlas",
      company: "GoTo HoldCo",
      year: "2022",
      summary:
        "Centralized HR data warehouse and enabled self-service analytics",
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
      summary:
        "Fraud detection analysis and merchant transaction validation",
      bullets: [
        "Defined fraud detection metrics to evaluate merchant behavior across lifecycle.",
        "Identified suspicious transaction patterns and abnormal merchant activity.",
        "Improved sales incentive accuracy by validating eligible transactions.",
        "Acted as first-level checker before escalation to Fraud and Risk team.",
      ],
    },
  ];

  return (
    <div className={`${themeClasses} min-h-screen font-sans scroll-smooth transition-colors duration-500 relative overflow-hidden`}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Global image background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img
          src={
            darkMode
              ? "https://res.cloudinary.com/dqszs1x5y/image/upload/v1771569212/luke-chesser-pJadQetzTkI-unsplash_emj3vm.jpg"
              : "https://res.cloudinary.com/dqszs1x5y/image/upload/v1771569209/codioful-formerly-gradienta-WwL5-EUXtDk-unsplash_ma2ll5.jpg"
          }
          alt="background"
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 ${
            darkMode ? "bg-[#020617]/70" : "bg-white/60"
          }`}
        />
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 z-[60] p-3 rounded-full backdrop-blur-lg border bg-white/10 border-white/20 hover:bg-white/20 transition"
        aria-label="Toggle theme"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Floating Nav (Desktop) */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-6 left-0 right-0 z-50 hidden sm:flex justify-center pointer-events-none"
      >
        <div className="backdrop-blur-lg border border-white/20 bg-white/10 rounded-full px-3 sm:px-6 py-2 sm:py-3 flex gap-3 sm:gap-6 text-xs sm:text-sm transition mx-auto w-fit pointer-events-auto">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`capitalize transition px-3 py-1 rounded-full ${
                activeSection === item
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : darkMode
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-800 hover:text-blue-500"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Mobile Burger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="sm:hidden fixed top-6 left-6 z-[60] p-3 rounded-full backdrop-blur-lg border bg-white/10 border-white/20 hover:bg-white/20 transition"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed top-20 left-6 right-6 z-[55] backdrop-blur-lg border border-white/20 bg-white/10 rounded-2xl p-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`capitalize px-3 py-2 rounded-lg transition ${
                activeSection === item
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : mutedText
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
            <div className="w-full h-full rounded-full overflow-hidden backdrop-blur-sm bg-white/10">
              <img
                src="https://res.cloudinary.com/dqszs1x5y/image/upload/v1771588295/WhatsApp_Image_2026-02-20_at_6.49.42_PM_nvzmpy.jpg"
                alt="Achmad Faiz"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Achmad Faiz
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-base sm:text-xl mb-6 ${mutedText}`}
          >
            Performance Management • Data Analyst • People Analytics • HR Strategy
          </motion.p>

          <div className={`flex flex-wrap justify-center gap-3 mb-4 text-xs sm:text-sm ${mutedText}`}>
            <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5">5+ Years Experience</span>
            <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5">GoTo • Uber Alumni</span>
            <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5">People Analytics Specialist</span>
          </div>

          <div className="mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs sm:text-sm font-medium">
              Interest to Data Analyst • People Analytics in HR
            </span>
          </div>

          
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">About Me (TL;DR)</h2>
        <p className={`text-base sm:text-lg leading-relaxed ${mutedText}`}>
          Hi, I’m Faiz. I’m a Performance Data Analyst at GoTo specializing in People Analytics and Performance Management Systems. I turn workforce data into clear, actionable insights that help leaders make smarter talent decisions.

          I focus on performance trends, dashboard development, and building scalable systems that improve evaluation processes, transparency, and organizational growth.
        </p>
      </section>

      {/* KEY ACHIEVEMENTS */}
      <section id="achievements" className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Key Achievements</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Built inhouse HR Performance Management Tools in collaboration with the internal engineer team used by our Employee, HR, and Leaders for performance development and future decisions",
            "Improved performance data visibility across multiple business units, and Developed scalable analytics report using BigQuery and SQL to support strategic people planning with data-driven insights",
          ].map((item, i) => (
            <div
              key={i}
              className={`${cardBaseClasses} border rounded-xl p-4 hover:border-blue-400 transition`}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">Skills</h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {skillCategories.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveSkillTab(category.category)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                activeSkillTab === category.category
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent"
                  : darkMode
                  ? "border-white/20 hover:border-blue-400 text-gray-300"
                  : "border-gray-300 hover:border-blue-400 text-gray-700"
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {skillCategories
            .filter((cat) => cat.category === activeSkillTab)
            .map((category) => (
              <div key={category.category} className="space-y-6">
                {category.items.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div
                      className={`w-full rounded-full h-3 overflow-hidden ${
                        darkMode ? "bg-gray-800" : "bg-gray-300"
                      }`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.role}`}
              onClick={() => setExpanded(expanded === index ? null : index)}
              className={`border p-4 sm:p-6 rounded-xl transition cursor-pointer ${cardBaseClasses} ${
                expanded === index
                  ? "border-blue-400 shadow-lg shadow-blue-500/10 ring-1 ring-blue-400/40"
                  : "hover:border-blue-400"
              }`}
            >
              <h3 className="text-xl font-semibold">{exp.role}</h3>
              <p className="text-blue-400">{exp.company}</p>
              <p className="text-sm text-gray-400 mb-2">{exp.period}</p>
              <p className={mutedText}>{exp.summary}</p>

              {expanded === index && (
                <ul className={`mt-4 space-y-2 ${mutedText}`}>
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex gap-2 items-start">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">Projects</h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.name}
              onClick={() =>
                setExpanded(expanded === index + 100 ? null : index + 100)
              }
              className={`border p-4 sm:p-6 rounded-xl transition cursor-pointer ${cardBaseClasses} ${
                expanded === index + 100
                  ? "border-purple-400 shadow-lg shadow-purple-500/10"
                  : "hover:border-purple-400"
              }`}
            >
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="text-purple-400">{project.company}</p>
              <p className="text-sm text-gray-400 mb-2">{project.year}</p>
              <p className={mutedText}>{project.summary}</p>

              {expanded === index + 100 && (
                <ul className={`mt-4 space-y-2 ${mutedText}`}>
                  {project.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex gap-2 items-start">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">Education</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`${cardBaseClasses} border p-4 sm:p-6 rounded-xl`}
        >
          <h3 className="text-xl font-semibold">Universitas Sumatera Utara</h3>
          <p className="text-blue-400">Diploma in Informatics Engineering</p>
          <p className="text-sm text-gray-400">2013 – 2016</p>
          <p className={`mt-2 ${mutedText}`}>GPA: 3.30</p>
        </motion.div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">Certifications</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`${cardBaseClasses} border p-4 sm:p-6 rounded-xl hover:border-purple-400 transition`}
        >
          <h3 className="text-xl font-semibold">BI-University Advanced Stream</h3>
          <p className="text-purple-400">GoTo Group</p>
          <p className="text-sm text-gray-400">Issued August 2019</p>
          <p className={`mt-3 ${mutedText}`}>
            Advanced Business Intelligence certification focused on data analysis, SQL, dashboarding, and analytics best practices.
          </p>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Thank You • Let's Connect!</h2>
        <div className="flex justify-center gap-4 sm:gap-6 mb-6">
          <a href="mailto:" className="hover:text-blue-400">
            <Mail size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/achmadf18/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <Linkedin size={28} />
          </a>
        </div>

        {/* Resume Download Button (moved here) */}
        <a
          href="/Achmad_Faiz_Resume.pdf"
          download
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:scale-105 transition"
        >
          Download Resume
        </a>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-[60] px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm hover:scale-110 transition"
      >
        ↑ Top
      </button>
    </div>
  );
}
