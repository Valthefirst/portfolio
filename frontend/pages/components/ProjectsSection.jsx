"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";

const ProjectsSection = () => {
  const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    date: "",
    link: "",
  });

  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://portfolio-u292.onrender.com/projects");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
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

  const handleDelete = async (projectId) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`https://portfolio-u292.onrender.com/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Project deleted successfully');
        setProjects((prevProjects) => prevProjects.filter((project) => project.projectId !== projectId));
      } else {
        console.error('Error deleting project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleAddProject = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewProject = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('https://portfolio-u292.onrender.com/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Project added successfully');
        setIsAddModalOpen(false);
        setProjects((prevProjects) => [...prevProjects, data]);
        setNewProject({
          name: "",
          description: "",
          date: "",
          link: "",
        });
      } else {
        console.error('Error adding project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  if (!contentReady || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="projects" className="mb-16 md:mb-24">
      <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white mt-4 mb-8 md:mb-12">
        {t("common.title")}
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.projectId}
              className="transition duration-200 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl rounded-lg overflow-hidden bg-white dark:bg-gray-800 p-6"
            >
              <h3 data-translate className="text-xl font-semibold text-gray-800 dark:text-white">{project.name}</h3>
              <p data-translate className="text-sm text-gray-600 dark:text-gray-300 mt-2">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
                >
                  GitHub Link
                </a>
              )}
              {isLoggedIn && (
                <div className="mt-4">
                  <button onClick={() => handleDelete(project.projectId)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        {isLoggedIn && (
          <div className="mt-4 text-center">
            <button onClick={handleAddProject} className="bg-green-500 text-white px-4 py-2 rounded">
              Add Project
            </button>
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h3 data-translate className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Add Project</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              placeholder="Project Name"
            />
            <textarea
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Project Description"
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={newProject.date}
              onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
              placeholder="Project Date"
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={newProject.link}
              onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              placeholder="Project Link"
            />
            <div className="mt-4">
              <button onClick={handleSaveNewProject} className="mr-2 bg-green-500 text-white px-4 py-2 rounded">
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

export default ProjectsSection;