"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'next-i18next';
const WorkExperience = () => {
    const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  
  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  if (!contentReady) {
    return <div>Loading...</div>; // Or any other placeholder content
  }
    

  return (
    <section id="work" className="py-12 px-4 mb-6">
    <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white mt-4 mb-8">
      {t(`workExperience.title`)}
    </h2>
    <div className="container mx-auto">
      <div className="timeline">
        
        {[1].map((num) => (
          <div key={num} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content bg-white dark:bg-[#222222] rounded-lg p-4 hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg">
              <div className="font-bold dark:text-white">{t(`workExperience.experience${num}.date`)}</div>
              <div className="font-semibold dark:text-gray-300">{t(`workExperience.experience${num}.company`)}</div>
              <div className="font-medium dark:text-gray-400">{t(`workExperience.experience${num}.role`)}</div>
              <ul className="list-disc list-inside dark:text-gray-200">
                {[...Array(3).keys()].map(i => (
                  t(`workExperience.experience${num}.responsibility${i + 1}`) && <li key={i}>{t(`workExperience.experience${num}.responsibility${i + 1}`)}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};
  
  export default WorkExperience;