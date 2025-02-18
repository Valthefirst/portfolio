"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'next-i18next';
import { CircularProgressbar } from 'react-circular-progressbar';
 

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
    </section>
    );
};

export default HobbiesSection;
