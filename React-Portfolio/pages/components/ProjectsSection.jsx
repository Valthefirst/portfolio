"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "next-i18next";

function ProjectDetailsModal({ project, isOpen, onClose }) {
  const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  if (!contentReady || !project) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{project.name}</h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-500">{project.description}</p>
        </div>
        <div className="items-center px-4 py-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mx-2 text-blue-500 hover:text-blue-700"
            >
              GitHub Link
            </a>
          )}
        </div>
        <button onClick={onClose} className="p-2 focus:outline-none">
          Close
        </button>
      </div>
    </div>
  );
}

const ProjectsSection = () => {
  const { t, ready } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [contentReady, setContentReady] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/projects");
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

  if (!contentReady || isLoading) {
    return <div>Loading...</div>;
  }

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

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
              onClick={() => openProjectModal(project)}
              className="cursor-pointer transition duration-200 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl rounded-lg overflow-hidden bg-white dark:bg-gray-800 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{project.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectDetailsModal project={selectedProject} isOpen={!!selectedProject} onClose={closeProjectModal} />
      )}
    </section>
  );
};

export default ProjectsSection;