"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { AiFillLinkedin, AiFillGithub, AiFillMail } from "react-icons/ai";

const EmailSection = () => {
  const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [email, setEmail] = useState("");
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
        setGithubUrl(data.github);
        setLinkedinUrl(data.linkedin);
        setEmail(data.email);
        
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
    <section className="bg-gray-100 dark:bg-gray-900 py-10 px-6 sm:px-10 lg:py-16 lg:px-12 rounded-xl shadow-xl mx-auto max-w-7xl flex flex-col lg:flex-row items-start gap-10">
      <div className="w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t("emailSection.findMeHere")}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <AiFillLinkedin />, url: linkedinUrl },
            { icon: <AiFillGithub />, url: githubUrl },
            { icon: <AiFillMail />, url: `mailto:${email}` },
          ].map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition duration-150 ease-in-out"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmailSection;