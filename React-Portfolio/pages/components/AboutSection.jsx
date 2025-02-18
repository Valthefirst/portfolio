"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const AboutSection = () => {
  const [education, setEducation] = useState("");
  const [bio, setBio] = useState("");
  const [picture, setPicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("https://portfolio-u292.onrender.com/me");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setEducation(data.education);
        setBio(data.bio);
        setPicture(data.picture);
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

  const handleModifyBio = () => {
    setIsBioModalOpen(true);
  };

  const handleSaveBio = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const updatedProfileData = { ...profileData, bio };
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
        setIsBioModalOpen(false);
      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleModifyEducation = () => {
    setIsEducationModalOpen(true);
  };

  const handleSaveEducation = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const updatedProfileData = { ...profileData, education };
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
        setIsEducationModalOpen(false);
      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChangePicture = () => {
    setIsPictureModalOpen(true);
  };

  const handleSavePicture = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const updatedProfileData = { ...profileData, picture };
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
        setIsPictureModalOpen(false);
      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="about" className="py-12 px-4">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="text-gray-800 dark:text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-base lg:text-lg mb-6">{bio}</p>
          {isLoggedIn && (
            <button onClick={handleModifyBio} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
              Modify About Me
            </button>
          )}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <h3 className="text-xl font-semibold mb-2">{education}</h3>
            {isLoggedIn && (
              <div className="mt-4">
                <button onClick={handleModifyEducation} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                  Modify Education
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 w-[200px] h-[200px] md:w-[330px] md:h-[330px] relative rounded-md overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-lg">
          <Image
            src={picture}
            alt="Valentine Nneji"
            fill
            className="object-cover"
          />
          {isLoggedIn && (
            <button onClick={handleChangePicture} className="absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-2 rounded">
              Change
            </button>
          )}
        </div>
      </div>

      {isBioModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Modify About Me</h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="mt-4">
              <button onClick={handleSaveBio} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setIsBioModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isEducationModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Modify Education</h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
            <div className="mt-4">
              <button onClick={handleSaveEducation} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setIsEducationModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isPictureModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Change Picture</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
            <div className="mt-4">
              <button onClick={handleSavePicture} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setIsPictureModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;