"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'next-i18next';
import { CircularProgressbar } from 'react-circular-progressbar';

const LanguageProficiency = () => {
    const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  
  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  if (!contentReady) {
    return <div>Loading...</div>; 
  }
    const languages = [
      { name: "English", level: 100 },
      { name: "French", level: 80 },
      { name: "Italian", level: 20 }
    ];
  
    return (
      <div className="language-card">
        <h3>{t('hobbies.languagepro')}</h3>
        <div className="language-proficiency-container grid grid-cols-4 gap-4">
          {languages.map(lang => (
            <div key={lang.name} className="text-center">
              <CircularProgressBar percentage={lang.level} />
              <p>{lang.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  

  const CircularProgressBar = ({ percentage }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = ((100 - percentage) / 100) * circumference;
  
    return (
      <div className="progress-container">
        <svg width="100" height="100" className="progress-circle">
          <circle
            class="circle-bg"
            stroke="#f3f3f3" 
            cx="50"
            cy="50"
            r="36"
            strokeWidth="3.8"
          />
          <circle
            class="circle"
            stroke="#4CAF50"  
            cx="50"
            cy="50"
            r="36"
            strokeWidth="3.8"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
          />
          <text x="50" y="50" class="circle-text" dominantBaseline="middle" textAnchor="middle">
            {percentage}%
          </text>
        </svg>
      </div>
    );
  };
  
      

const HobbiesSection = () => {
    const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  
  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  if (!contentReady) {
    return <div>Loading...</div>; 
  }
  
    const hobbiesInfo = {
        cooking: {
            title: t('hobbies.cooking.title'),
            description: t('hobbies.cooking.description'),
            images: '/hobbies/pasta.jpg'
        },
        photography: {
            title: t('hobbies.photography.title'),
            description: t('hobbies.photography.description'),
            images: '/hobbies/photo1.jpg'
        }
    };

    return (
        <section id="hobbies" className="mt-4 mb-8 md:mb-24">
        <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white mb-8">
            {t('hobbies.title')}
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
            {Object.entries(hobbiesInfo).map(([key, { title, description, images }]) => (
                <div key={key} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative w-full h-48 sm:h-64">
                        <Image src={images} alt={title} layout="fill" objectFit="cover" />
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <p className="text-sm">{description}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="arrow-down"></div>
        <LanguageProficiency />
    </section>
    );
};

export default HobbiesSection;
