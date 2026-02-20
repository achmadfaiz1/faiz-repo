import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Sun, Moon } from "lucide-react";

export default function OnePagePortfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("about");

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

  const skills = [
    { name: "People Analytics", level: 95 },
    { name: "SQL & BigQuery", level: 92 },
    { name: "Dashboard & Visualization", level: 90 },
    { name: "Performance Management", level: 94 },
    { name: "Talent Analytics", level: 88 },
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
    <div
      className={`${themeClasses} min-h-screen font-sans scroll-smooth transition-colors duration-500 relative overflow-hidden`}
    >
      {/* Global image background */}
      <div className="fixed inset-0 -z-20">
        <img
          src={
            darkMode
              ? "https://res.cloudinary.com/dqszs1x5y/image/upload/v1771569212/luke-chesser-pJadQetzTkI-unsplash_emj3vm.jpg"
              : "https://res.cloudinary.com/dqszs1x5y/image/upload/v1771569209/codioful-formerly-gradienta-WwL5-EUXtDk-unsplash_ma2ll5.jpg"
          }
          alt="background"
          className="w-full h-full object-cover"
        />

        {/* overlay for readability */}
        <div
          className={`absolute inset-0 ${
            darkMode ? "bg-[#020617]/70" : "bg-white/60"
          }`}
        />
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-lg border transition ${
          darkMode
            ? "bg-white/10 border-white/20 hover:bg-white/20"
            : "bg-white/10 border-white/20 hover:bg-white/20"
        }`}
        aria-label="Toggle theme"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Floating Nav */}
<motion.div
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  className="fixed top-6 left-0 right-0 z-50 flex justify-center"
>
  <div className="backdrop-blur-lg border border-white/20 bg-white/10 rounded-full px-6 py-3 flex gap-6 text-sm transition w-fit">
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

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Achmad Faiz
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-xl mb-6 ${mutedText}`}
          >
            Performance Data Analyst • People Analytics • HR Strategy
          </motion.p>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className={`text-lg leading-relaxed ${mutedText}`}>
          I am a Performance Data Analyst at GoTo specializing in People
          Analytics, workforce insights, and performance management systems.
        </p>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Core Skills</h2>
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group"
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
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.role}`}
              onClick={() => setExpanded(expanded === index ? null : index)}
              className={`border p-6 rounded-xl transition cursor-pointer ${cardBaseClasses} ${
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
      <section id="projects" className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Projects</h2>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.name}
              onClick={() =>
                setExpanded(expanded === index + 100 ? null : index + 100)
              }
              className={`border p-6 rounded-xl transition cursor-pointer ${cardBaseClasses} ${
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
      <section id="education" className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Education</h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`${cardBaseClasses} border p-6 rounded-xl`}
        >
          <h3 className="text-xl font-semibold">
            Universitas Sumatera Utara
          </h3>
          <p className="text-blue-400">Diploma in Informatics Engineering</p>
          <p className="text-sm text-gray-400">2013 – 2016</p>
          <p className={`mt-2 ${mutedText}`}>GPA: 3.30</p>
        </motion.div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Certifications</h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`${cardBaseClasses} border p-6 rounded-xl hover:border-purple-400 transition`}
        >
          <h3 className="text-xl font-semibold">
            BI-University Advanced Stream
          </h3>

          <p className="text-purple-400">GoTo Group</p>

          <p className="text-sm text-gray-400">Issued August 2019</p>

          <p className={`mt-3 ${mutedText}`}>
            Advanced Business Intelligence certification focused on data
            analysis, SQL, dashboarding, and analytics best practices.
          </p>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Let’s Work Together</h2>

        <div className="flex justify-center gap-6">
          <a
            href="mailto:achmad.f.faiz@gmail.com"
            className="hover:text-blue-400"
          >
            <Mail size={28} />
          </a>

          <a
            href="https://linkedin.com/in/achmadffaiz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <Linkedin size={28} />
          </a>
        </div>
      </section>
    </div>
  );
}
