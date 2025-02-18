"use client";
import React, { useState, useEffect } from "react";

const WorkExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/experiences');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setExperiences(data.experiences);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="work" className="py-12 px-4 mb-6">
      <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white mt-4 mb-8">
        Work Experience
      </h2>
      <div className="container mx-auto">
        <div className="timeline">
          {experiences.map((experience) => (
            <div key={experience.experienceId} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content bg-white dark:bg-[#222222] rounded-lg p-4 hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg">
                <div className="font-bold dark:text-white">{experience.date}</div>
                <div className="font-semibold dark:text-gray-300">{experience.company}</div>
                <div className="font-medium dark:text-gray-400">{experience.title}</div>
                <ul className="list-disc list-inside dark:text-gray-200">
                  {experience.descriptions.map((description, index) => (
                    <li key={index}>{description}</li>
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