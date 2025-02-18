"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { AiFillLinkedin, AiFillGithub, AiFillMail } from "react-icons/ai";

const EmailSection = () => {
  const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("https://portfolio-u292.onrender.com/me");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setGithubUrl(data.github);
        setLinkedinUrl(data.linkedin);
        setEmail(data.email);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

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

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const updatedProfileData = { ...profileData, github: githubUrl, linkedin: linkedinUrl, email };
      const response = await fetch('https://portfolio-u292.onrender.com/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfileData),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        setIsModalOpen(false);
      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

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
        {isLoggedIn && (
          <div className="mt-4">
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">
              Modify
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Modify Contact Information</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="LinkedIn URL"
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="GitHub URL"
            />
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <div className="mt-4">
              <button onClick={handleSave} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EmailSection;