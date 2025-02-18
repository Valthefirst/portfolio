"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const AboutSection = () => {
  const [education, setEducation] = useState("");
  const [bio, setBio] = useState("");
  const [picture, setPicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/me");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setEducation(data.education);
        setBio(data.bio);
        setPicture(data.picture);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="about" className="py-12 px-4">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="text-gray-800 dark:text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-base lg:text-lg mb-6">{bio}</p>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <h3 className="text-xl font-semibold mb-2">{education}</h3>
          </div>
        </div>
        <div className="flex-shrink-0 w-[200px] h-[200px] md:w-[330px] md:h-[330px] relative rounded-md overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-lg">
          <Image
            src={picture}
            alt="Valentine Nneji"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;