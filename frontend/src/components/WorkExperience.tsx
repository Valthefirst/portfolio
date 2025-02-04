import React from 'react';
import './WorkExperience.css';

const WorkExperience = () => {
  const workExperiences = [
    {
      company: 'Company One',
      position: 'Software Engineer',
      description: 'Worked on developing web applications using React and Node.js.',
      startDate: 'January 2020',
      endDate: 'Present'
    },
    {
      company: 'Company Two',
      position: 'Frontend Developer',
      description: 'Developed user interfaces with React and Redux.',
      startDate: 'June 2018',
      endDate: 'December 2019'
    }
  ];

  return (
    <div className="work-experience">
      <h2>Work Experience</h2>
      <ul>
        {workExperiences.map((experience, index) => (
          <li key={index}>
            <h3>{experience.company}</h3>
            <p>{experience.position}</p>
            <p>{experience.description}</p>
            <p>{experience.startDate} - {experience.endDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkExperience;
