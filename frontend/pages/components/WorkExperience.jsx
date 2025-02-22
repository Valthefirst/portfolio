"use client";
import React, { useState, useEffect } from "react";

const WorkExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modifiedExperience, setModifiedExperience] = useState({
    title: "",
    company: "",
    location: "",
    date: "",
    descriptions: [""],
  });
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    date: "",
    descriptions: [""],
  });

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('https://portfolio-u292.onrender.com/experiences');
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

  const handleDelete = async (experienceId) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`https://portfolio-u292.onrender.com/experiences/${experienceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Experience deleted successfully');
        setExperiences((prevExperiences) => prevExperiences.filter((experience) => experience.experienceId !== experienceId));
      } else {
        console.error('Error deleting experience');
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  const handleModify = (experience) => {
    setModifiedExperience(experience);
    setIsModifyModalOpen(true);
  };

  const handleSaveModify = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`https://portfolio-u292.onrender.com/experiences/${modifiedExperience.experienceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(modifiedExperience),
      });

      if (response.ok) {
        console.log('Experience updated successfully');
        setIsModifyModalOpen(false);
        setExperiences((prevExperiences) =>
          prevExperiences.map((experience) =>
            experience.experienceId === modifiedExperience.experienceId ? modifiedExperience : experience
          )
        );
      } else {
        console.error('Error updating experience');
      }
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  const handleAddExperience = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewExperience = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('https://portfolio-u292.onrender.com/experiences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newExperience),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Experience added successfully');
        setIsAddModalOpen(false);
        setExperiences((prevExperiences) => [...prevExperiences, data]);
        setNewExperience({
          title: "",
          company: "",
          location: "",
          date: "",
          descriptions: [""],
        });
      } else {
        console.error('Error adding experience');
      }
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

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
              <div className="timeline-content bg-white dark:bg-gray-800 rounded-lg p-4 hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg">
                <div className="font-bold dark:text-white">{experience.date}</div>
                <div className="font-semibold dark:text-gray-300">{experience.company}</div>
                <div className="font-medium dark:text-gray-400">{experience.title}</div>
                <ul className="list-disc list-inside dark:text-gray-200">
                  {experience.descriptions.map((description, index) => (
                    <li key={index}>{description}</li>
                  ))}
                </ul>
                {isLoggedIn && (
                  <div className="mt-4">
                    <button onClick={() => handleModify(experience)} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                      Modify
                    </button>
                    <button onClick={() => handleDelete(experience.experienceId)} className="bg-red-500 text-white px-4 py-2 rounded">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {isLoggedIn && (
          <div className="mt-4 text-center">
            <button onClick={handleAddExperience} className="bg-green-500 text-white px-4 py-2 rounded">
              Add Experience
            </button>
          </div>
        )}
      </div>

      {isModifyModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Modify Experience</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={modifiedExperience.title}
              onChange={(e) => setModifiedExperience({ ...modifiedExperience, title: e.target.value })}
              placeholder="Title"
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={modifiedExperience.company}
              onChange={(e) => setModifiedExperience({ ...modifiedExperience, company: e.target.value })}
              placeholder="Company"
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={modifiedExperience.location}
              onChange={(e) => setModifiedExperience({ ...modifiedExperience, location: e.target.value })}
              placeholder="Location"
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={modifiedExperience.date}
              onChange={(e) => setModifiedExperience({ ...modifiedExperience, date: e.target.value })}
              placeholder="Date"
            />
            <textarea
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={modifiedExperience.descriptions.join("\n")}
              onChange={(e) => setModifiedExperience({ ...modifiedExperience, descriptions: e.target.value.split("\n") })}
              placeholder="Descriptions (one per line)"
            />
            <div className="mt-4">
              <button onClick={handleSaveModify} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setIsModifyModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Add Experience</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={newExperience.title}
              onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
              placeholder="Title"
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              placeholder="Company"
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={newExperience.location}
              onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
              placeholder="Location"
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={newExperience.date}
              onChange={(e) => setNewExperience({ ...newExperience, date: e.target.value })}
              placeholder="Date"
            />
            <textarea
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={newExperience.descriptions.join("\n")}
              onChange={(e) => setNewExperience({ ...newExperience, descriptions: e.target.value.split("\n") })}
              placeholder="Descriptions (one per line)"
            />
            <div className="mt-4">
              <button onClick={handleSaveNewExperience} className="mr-2 bg-green-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setIsAddModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkExperience;