import React from 'react';
import './Academic.css';

const Academic = () => {
  const academicAchievements = [
    {
      institution: 'University of Example',
      degree: 'Bachelor of Science in Computer Science',
      year: '2020'
    },
    {
      institution: 'Example High School',
      degree: 'High School Diploma',
      year: '2016'
    }
  ];

  return (
    <div className="academic">
      <h2>Academic Achievements</h2>
      <ul>
        {academicAchievements.map((achievement, index) => (
          <li key={index}>
            <h3>{achievement.institution}</h3>
            <p>{achievement.degree} - {achievement.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Academic;
