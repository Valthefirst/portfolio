"use client";
import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from 'next-i18next';


const Banner = () => {
  const { t, i18n, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  if (!contentReady) {
    return <div>Loading...</div>;
  }
  
  const resumeLink = i18n.language === 'fr' ? 'https://pdflink.to/ad166957/' : 'https://pdflink.to/4ef63d0b/';
  return (
    <section className="fullscreen-banner">
      <div className="video-container">

        <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 place-self-center text-center"
          >
            <h1 className="dark:text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold name-style">
              Valentine Nneji
            </h1>
            <TypeAnimation
              sequence={['Technical Support', 2000, 'Software Development', 2000, 'Creative Technologist', 2000, 'Support Technique', 2000, 'Développement Logiciel', 2000, 'Technologue Créatif', 2000]}
              wrapper="div"
              cursor={true}
              repeat={Infinity}
              className="text-lg text-pink-950"
            />
          </motion.div>
        </div>

        <div className="text-center absolute bottom-10 w-full">
          <Link href={resumeLink} className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-700 hover:to-blue-300 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 ease-in-out shadow-lg">
            <span className="ml-3">{t('banner.downloadResume')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;

