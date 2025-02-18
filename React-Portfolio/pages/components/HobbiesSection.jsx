"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const HobbiesSection = () => {
  const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  const [hobbies, setHobbies] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modifiedHobby, setModifiedHobby] = useState({ hobby: "", description: "", image: "" });
  const [newHobby, setNewHobby] = useState({ hobby: "", description: "", image: "" });

  // Wait for translations to be ready
  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  // Fetch the initial profile JSON (including hobbies)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("https://portfolio-u292.onrender.com/me");
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

  // Check user login status
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

  // Delete a hobby
  const handleDelete = async (hobby) => {
    try {
      const token = sessionStorage.getItem('token');
      // Create a new hobbies object without the deleted hobby
      const updatedHobbies = { ...hobbies };
      delete updatedHobbies[hobby];

      // PUT the updated hobbies to your backend
      const response = await fetch('https://portfolio-u292.onrender.com/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ hobbies: updatedHobbies }),
      });

      if (response.ok) {
        console.log('Hobby deleted successfully');
        setHobbies(updatedHobbies);
      } else {
        console.error('Error deleting hobby');
      }
    } catch (error) {
      console.error('Error deleting hobby:', error);
    }
  };

  // Open modify modal and populate with the hobby data
  const handleModify = (hobby) => {
    setModifiedHobby({ hobby, ...hobbies[hobby] });
    setIsModifyModalOpen(true);
  };

  // Save modifications to a hobby
  const handleSaveModify = async () => {
    try {
      const token = sessionStorage.getItem('token');
      // Create an updated hobbies object.
      // Note: If the hobby name is changed, the old key will still exist.
      const updatedHobbies = { 
        ...hobbies, 
        [modifiedHobby.hobby]: { 
          description: modifiedHobby.description, 
          image: modifiedHobby.image 
        } 
      };
      const response = await fetch('https://portfolio-u292.onrender.com/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ hobbies: updatedHobbies }),
      });

      if (response.ok) {
        console.log('Hobby updated successfully');
        setIsModifyModalOpen(false);
        setHobbies(updatedHobbies);
      } else {
        console.error('Error updating hobby');
      }
    } catch (error) {
      console.error('Error updating hobby:', error);
    }
  };

  // Open add modal
  const handleAddHobby = () => {
    setIsAddModalOpen(true);
  };

  // Save new hobby to the profile
  const handleSaveNewHobby = async () => {
    try {
      const token = sessionStorage.getItem('token');
      // Append the new hobby to the current hobbies object
      const updatedHobbies = { 
        ...hobbies, 
        [newHobby.hobby]: { 
          description: newHobby.description, 
          image: newHobby.image 
        } 
      };
      const response = await fetch('https://portfolio-u292.onrender.com/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ hobbies: updatedHobbies }),
      });

      if (response.ok) {
        console.log('Hobby added successfully');
        setIsAddModalOpen(false);
        setHobbies(updatedHobbies);
        setNewHobby({ hobby: "", description: "", image: "" });
      } else {
        console.error('Error adding hobby');
      }
    } catch (error) {
      console.error('Error adding hobby:', error);
    }
  };

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
                {isLoggedIn && (
                  <div className="mt-4">
                    {/* <button 
                      onClick={() => handleModify(hobby)} 
                      className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Modify
                    </button>
                    <button 
                      onClick={() => handleDelete(hobby)} 
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {isLoggedIn && (
        <div className="mt-4 text-center">
          {/* <button 
            onClick={handleAddHobby} 
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Hobby
          </button> */}
        </div>
      )}

      {/* Modify Hobby Modal */}
      {isModifyModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Modify Hobby</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={modifiedHobby.hobby}
              onChange={(e) => setModifiedHobby({ ...modifiedHobby, hobby: e.target.value })}
              placeholder="Hobby Name"
            />
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={modifiedHobby.description}
              onChange={(e) => setModifiedHobby({ ...modifiedHobby, description: e.target.value })}
              placeholder="Hobby Description"
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={modifiedHobby.image}
              onChange={(e) => setModifiedHobby({ ...modifiedHobby, image: e.target.value })}
              placeholder="Hobby Image URL"
            />
            <div className="mt-4">
              <button 
                onClick={handleSaveModify} 
                className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button 
                onClick={() => setIsModifyModalOpen(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Hobby Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Add Hobby</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={newHobby.hobby}
              onChange={(e) => setNewHobby({ ...newHobby, hobby: e.target.value })}
              placeholder="Hobby Name"
            />
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={newHobby.description}
              onChange={(e) => setNewHobby({ ...newHobby, description: e.target.value })}
              placeholder="Hobby Description"
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={newHobby.image}
              onChange={(e) => setNewHobby({ ...newHobby, image: e.target.value })}
              placeholder="Hobby Image URL"
            />
            <div className="mt-4">
              <button 
                onClick={handleSaveNewHobby} 
                className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button 
                onClick={() => setIsAddModalOpen(false)} 
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

export default HobbiesSection;
