import { BsFillCloudMoonFill } from 'react-icons/bs'
import { Suspense, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import SkillsSection from "./components/SkillsSection";
import HobbiesSection from "./components/HobbiesSection";
import WorkExperience from './components/WorkExperience';
import { motion } from 'framer-motion';
import '../outside-components/languageConfig';
import TestimonialSection from './components/TestimonialSection';

export default function Home() {
  const [lightMode, setLightMode] = useState(false);
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };
  // function Loading() {
  //   return <>Loading</>;
  // }
  // const [locale, setLocale] = useState(i18n.language);
  // i18n.on("languageChanged", (lng) => setLocale(i18n.language));
  // const handleChange = (event) => {
  //   i18n.changeLanguage(event.target.value); //fr or eng
  // };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') ?? 'light';
    setLightMode(storedTheme === 'light');
  }, []);

  return (
    <div className={lightMode ? "light" : "dark"}>
      <main className={`flex min-h-screen flex-col ${lightMode ? "text-gray-900" : "bg-[#121212] text-white"}`}>
        <Navbar lightMode={lightMode} setLightMode={setLightMode} />
        <div className="container mt-24 mx-auto px-12 py-4">
          <Banner lightMode={lightMode} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="section"
          >
            <AboutSection lightMode={lightMode} />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="section"
          >
            <SkillsSection lightMode={lightMode} />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="section"
          >
            <ProjectsSection lightMode={lightMode} />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="section"
          >
            <HobbiesSection lightMode={lightMode} />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="section"
          >
            <WorkExperience lightMode={lightMode} />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="section"
          >
            <TestimonialSection lightMode={lightMode} />
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="section"
            // id='contact'
          >
            <EmailSection lightMode={lightMode} />
          </motion.div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
