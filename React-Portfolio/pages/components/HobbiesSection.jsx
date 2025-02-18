"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const HobbiesSection = () => {
  const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  const [hobbies, setHobbies] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/me");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setHobbies(data.hobbies);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (!contentReady || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="hobbies" className="mt-4 mb-8 md:mb-24">
      <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white mb-8">
        {t("hobbies.title")}
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
        {Object.entries(hobbies).map(([hobby, hobbyInfo]) => {
          const { description, image } = hobbyInfo;
          return (
            <div key={hobby} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative w-full h-48 sm:h-64">
                <Image
                  src={image}
                  alt={hobby}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{hobby}</h3>
                <p className="text-sm">{description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="arrow-down"></div>
    </section>
  );
};

export default HobbiesSection;