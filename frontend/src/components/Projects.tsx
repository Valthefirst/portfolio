import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      name: 'Project One',
      description: 'Description of project one.',
      link: 'http://example.com/project-one'
    },
    {
      name: 'Project Two',
      description: 'Description of project two.',
      link: 'http://example.com/project-two'
    },
    {
      name: 'Project Three',
      description: 'Description of project three.',
      link: 'http://example.com/project-three'
    }
  ];

  return (
    <div className="projects">
      <h2>Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
