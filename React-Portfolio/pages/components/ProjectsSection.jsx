"use client";
import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "next-i18next";

function ProjectDetailsModal({ project, isOpen, onClose }) {
  const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  if (!contentReady) {
    return <div>Loading...</div>;
  }

  const hasImages = project.images && project.images.length > 0;
  if (!isOpen || !project) return null;

  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    }
  };

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{project.name}</h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-500">{project.description}</p>
        </div>
        <div className="items-center px-4 py-3">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mx-2 text-blue-500 hover:text-blue-700">
              Live Preview
            </a>
          )}
        </div>
        {hasImages && (
          <>
            <Image
              src={project.images[currentImageIndex]}
              alt={`Screenshot ${currentImageIndex + 1}`}
              width={500}
              height={300}
              objectFit="contain"
              className="mx-auto"
            />
            <div className="flex justify-center gap-4">
              <button onClick={prevImage} className="focus:outline-none">
                &lt;
              </button>
              <button onClick={nextImage} className="focus:outline-none">
                &gt;
              </button>
            </div>
          </>
        )}
        {!hasImages && <p>{t("common.noAdditionalImages")}</p>}
        <button onClick={onClose} className="p-2 focus:outline-none">
          Close
        </button>
      </div>
    </div>
  );
}

const ProjectsSection = () => {
  const { t, ready } = useTranslation();
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedCategory, setSelectedCategory] = useState("All");
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

  const filteredProjects = projects.filter((project) =>
    selectedCategory === "All" ? true : project.tag?.includes(selectedCategory)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="mb-16 md:mb-24">
      <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white mt-4 mb-8 md:mb-12">
        {t("common.title")}
      </h2>
      <div className="flex justify-start mb-6 ml-8">
        <div className="relative w-64">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.projectId}
              onClick={() => openProjectModal(project)}
              className="cursor-pointer transition duration-200 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl rounded-lg overflow-hidden"
            >
              <ProjectCard
                key={project.projectId}
                title={project.name}
                description={project.description}
                imgUrl={project.defaultImage || "/default-project-image.png"} // Add a default image if no image is provided
                gitUrl={project.link}
                previewUrl={project.link}
              />
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