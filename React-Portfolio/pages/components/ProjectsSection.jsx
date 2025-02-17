"use client";
import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import Image from 'next/image';
import { useTranslation } from 'next-i18next';



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
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{project.title}</h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-500">{project.description}</p>
        </div>
        <div className="items-center px-4 py-3">
          {project.gitUrl && (
            <a href={project.gitUrl} target="_blank" rel="noopener noreferrer" className="inline-block mx-2 text-blue-500 hover:text-blue-700">
              GitHub
            </a>
          )}
          {project.previewUrl && (
            <a href={project.previewUrl} target="_blank" rel="noopener noreferrer" className="inline-block mx-2 text-blue-500 hover:text-blue-700">
              {t('common.livePreview')}
            </a>
          )}
        </div>
        {hasImages && (
          <>
            <Image
  src={project.images[currentImageIndex]}
  alt={`Screenshot ${currentImageIndex + 1}`}
  width={500} // Specify desired width
  height={300} // Specify desired height, adjust as needed
  objectFit="contain"
  className="mx-auto" // For centering, if additional styling is needed, consider wrapping in a div
/>
            <div className="flex justify-center gap-4">
              <button onClick={prevImage} className="focus:outline-none">&lt;</button>
              <button onClick={nextImage} className="focus:outline-none">&gt;</button>
            </div>
          </>
        )}
        {!hasImages && <p>{t('common.noAdditionalImages')}</p>}
        <button onClick={onClose} className="p-2 focus:outline-none">Close</button>
      </div>
    </div>
  );
}
const categories = ["All", "Web", "Mobile", "Game"];

const ProjectsSection = () => {


  const { t, ready } = useTranslation();
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedProject, setSelectedProject] = useState(null); 
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  if (!contentReady) {
    return <div>Loading...</div>; 
  }
  const projectsData = [
    {
      id: 3,
      title: "The Fresh Tables",
      description: t("projects.project3.description"),
      defaultImage: "projectspic/thefreshtables.png",
      tag: ["All", "Web"],
      gitUrl: "/",
      previewUrl: "/",
    },
    {
      id: 5,
      title: "Virtual Art Gallery",
      description: t("projects.project5.description"),
      defaultImage: "projectspic/artgallery.png",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/Sprytte/ArtworkGallery",
      previewUrl: "/",
    },
    {
      id: 6,
      title: t("projects.project6.title"),
      description: t("projects.project6.description"),
      defaultImage: "projectspic/librarysystem.png",
      tag: ["All", "Web"],
      gitUrl: "/",
      previewUrl: "/",
    },
    {
      id: 7,
      title: t("projects.project7.title"),
      description: t("projects.project7.description"),
      defaultImage: "/projectspic/php2.png",
      images: [
        "/projectspic/php1.png",
        "/projectspic/php3.png",
      ],
      tag: ["All", "Web"],
      gitUrl: "https://github.com/swafit/phpProject",
      previewUrl: "https://www.youtube.com/watch?v=n9zfsq7VPlg",
    },
    {
      id: 8,
      title: "Adventurelytical Game",
      description: t("projects.project8.description"),
      defaultImage: "projectspic/adventure.png",
      images: [
        "/projectspic/AdventureLytical.png",
      ],
      tag: ["All", "Game"],
      gitUrl: "https://github.com/PaulJ2001/AdventureLytical_Coin-Rush_Unity_FinalProject",
      previewUrl: "https://www.dropbox.com/scl/fi/us1vbi0npl5vdys103gwk/AdventuricalCoinRun_Gameplay_No-Commentary.mp4?rlkey=6mh47r23wwhuhaiien4o4crcc&e=1&dl=0",
    },
  ];
  // Function to open the modal with the selected project's details
  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  // Function to close the modal
  const closeProjectModal = () => {
    setSelectedProject(null);
  };
  
  // const handleTagChange = (newTag) => {
  //   setTag(newTag);
  // };
  // const handleTagChange = (newCategory) => {
  //   setSelectedCategory(newCategory); // Correctly updates the state based on selection
  // };

  // const filteredProjects = projectsData.filter((project) =>
  //   project.tag.includes(tag)
  // );
  const filteredProjects = projectsData.filter((project) =>
    selectedCategory === "All" ? true : project.tag.includes(selectedCategory)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="mb-16 md:mb-24">
      <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white mt-4 mb-8 md:mb-12">
      {t('common.title')}
      </h2>
      <div className="flex justify-start mb-6 ml-8">
  <div className="relative w-64"> 
    <select 
      onChange={(e) => setSelectedCategory(e.target.value)}
      value={selectedCategory}
      className="appearance-none block w-full px-4 py-2 text-base font-medium text-gray-700 bg-white bg-clip-padding border-2 border-blue-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    >
      {categories.map((category) => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
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
          key={project.id}
          onClick={() => openProjectModal(project)} 
          className="cursor-pointer transition duration-200 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl rounded-lg overflow-hidden"
        >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.defaultImage}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
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
