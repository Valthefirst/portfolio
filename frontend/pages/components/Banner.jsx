"use client";
import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from 'next-i18next';

const Banner = () => {
  const { t, i18n, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeLinks, setResumeLinks] = useState({
    english: '',
    french: ''
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('https://portfolio-u292.onrender.com/hi', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.message) {
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchResumeLinks = async () => {
      try {
        const response = await fetch('https://portfolio-u292.onrender.com/resumes');
        if (!response.ok) throw new Error('Failed to fetch resume links');
        const data = await response.json();
        setResumeLinks(data);
      } catch (error) {
        console.error('Error fetching resume links:', error);
      }
    };

    fetchResumeLinks();
  }, []);

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('https://portfolio-u292.onrender.com/resumes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(resumeLinks),
      });

      if (response.ok) {
        console.log('Resume links updated successfully');
        setIsModalOpen(false);
      } else {
        console.error('Error updating resume links');
      }
    } catch (error) {
      console.error('Error updating resume links:', error);
    }
  };

  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  if (!contentReady) {
    return <div>Loading...</div>;
  }

  const resumeLink = i18n.language === 'fr' ? resumeLinks.french : resumeLinks.english;

  return (
    <section className="fullscreen-banner">

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

        {isLoggedIn && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Links
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Modify Resume Links
            </h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={resumeLinks.english}
              onChange={(e) => setResumeLinks(prev => ({ ...prev, english: e.target.value }))}
              placeholder="English Resume Link"
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={resumeLinks.french}
              onChange={(e) => setResumeLinks(prev => ({ ...prev, french: e.target.value }))}
              placeholder="French Resume Link"
            />
            <div className="mt-4">
              <button
                onClick={handleSave}
                className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Banner;

