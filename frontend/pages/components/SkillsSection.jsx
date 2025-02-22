"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'next-i18next';

const SkillsSection = () => {
  const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  const [skills, setSkills] = useState({
    softwareDevTools: [],
    database: [],
    languages: [],
    frameworks: [],
    operatingSystems: [],
    cloudProductivityTools: []
  });
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: '', imageLink: '', category: '' });
  const [showAddModal, setShowAddModal] = useState(false);

  // Endpoint mapping
  const endpointMap = {
    softwareDevTools: 'software-dev-tools',
    database: 'database',
    languages: 'languages',
    frameworks: 'frameworks',
    operatingSystems: 'operating-systems',
    cloudProductivityTools: 'cloud-productivity-tools'
  };

  useEffect(() => {
    if (ready) setContentReady(true);
  }, [ready]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const endpoints = {
          softwareDevTools: 'https://portfolio-u292.onrender.com/skills/software-dev-tools',
          database: 'https://portfolio-u292.onrender.com/skills/database',
          languages: 'https://portfolio-u292.onrender.com/skills/languages',
          frameworks: 'https://portfolio-u292.onrender.com/skills/frameworks',
          operatingSystems: 'https://portfolio-u292.onrender.com/skills/operating-systems',
          cloudProductivityTools: 'https://portfolio-u292.onrender.com/skills/cloud-productivity-tools'
        };

        const responses = await Promise.all(
          Object.entries(endpoints).map(([key, url]) =>
            fetch(url).then(res => res.json().then(data => [key, data.skills]))
          )
        );

        const newSkills = {};
        responses.forEach(([key, skills]) => {
          newSkills[key] = skills;
        });

        setSkills(newSkills);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setLoading(false);
      }
    };

    fetchSkills();
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
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const deleteSkill = async (skillId, categoryKey) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(
        `https://portfolio-u292.onrender.com/skills/${endpointMap[categoryKey]}/${skillId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        setSkills(prev => ({
          ...prev,
          [categoryKey]: prev[categoryKey].filter(skill => skill.skillId !== skillId)
        }));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const updateSkill = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(
        `https://portfolio-u292.onrender.com/skills/${endpointMap[editingSkill.category]}/${editingSkill.skillId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: editingSkill.name,
            imageLink: editingSkill.imageLink
          })
        }
      );

      if (response.ok) {
        setSkills(prev => ({
          ...prev,
          [editingSkill.category]: prev[editingSkill.category].map(skill =>
            skill.skillId === editingSkill.skillId ? editingSkill : skill
          )
        }));
        setEditingSkill(null);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const createSkill = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(
        `https://portfolio-u292.onrender.com/skills/${endpointMap[newSkill.category]}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: newSkill.name,
            imageLink: newSkill.imageLink
          })
        }
      );

      if (response.ok) {
        const createdSkill = await response.json();
        setSkills(prev => ({
          ...prev,
          [newSkill.category]: [...prev[newSkill.category], createdSkill]
        }));
        setShowAddModal(false);
        setNewSkill({ name: '', imageLink: '', category: '' });
      }
    } catch (error) {
      console.error("Create failed:", error);
    }
  };

  if (!contentReady || loading) {
    return <div>Loading...</div>;
  }

  const SkillCategory = ({ title, categoryKey, skills }) => (
    <div className="flex flex-col items-center relative">
      {isLoggedIn && (
        <button
          onClick={() => {
            setNewSkill(prev => ({ ...prev, category: categoryKey }));
            setShowAddModal(true);
          }}
          className="absolute top-0 right-0 bg-green-500 text-white p-1 rounded hover:bg-green-600"
        >
          +
        </button>
      )}

      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.skillId} className="relative group">
            {isLoggedIn && (
              <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditingSkill({ ...skill, category: categoryKey })}
                  className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteSkill(skill.skillId, categoryKey)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  🗑
                </button>
              </div>
            )}
            <Image
              src={skill.imageLink}
              alt={skill.name}
              width={100}
              height={100}
              objectFit="contain"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-12 px-4">
      <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white mt-4 mb-8">
        {t('skills.title')}
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <SkillCategory
            title={t('skills.softwareDevelopmentTools')}
            categoryKey="softwareDevTools"
            skills={skills.softwareDevTools}
          />

          <SkillCategory
            title={t('skills.databases')}
            categoryKey="database"
            skills={skills.database}
          />

          <SkillCategory
            title={t('skills.programmingLanguages')}
            categoryKey="languages"
            skills={skills.languages}
          />

          <SkillCategory
            title={t('skills.frameworks')}
            categoryKey="frameworks"
            skills={skills.frameworks}
          />

          <SkillCategory
            title={t('skills.operatingSystems')}
            categoryKey="operatingSystems"
            skills={skills.operatingSystems}
          />

          <SkillCategory
            title={t('skills.productivity')}
            categoryKey="cloudProductivityTools"
            skills={skills.cloudProductivityTools}
          />
        </div>

        {/* Edit Modal */}
        {editingSkill && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4">Edit Skill</h2>
              <form onSubmit={updateSkill}>
                <input
                  type="text"
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full mb-2 p-2 border"
                />
                <input
                  type="text"
                  value={editingSkill.imageLink}
                  onChange={(e) => setEditingSkill(prev => ({ ...prev, imageLink: e.target.value }))}
                  className="w-full mb-4 p-2 border"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setEditingSkill(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4">Add New Skill</h2>
              <form onSubmit={createSkill}>
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full mb-2 p-2 border"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newSkill.imageLink}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, imageLink: e.target.value }))}
                  className="w-full mb-4 p-2 border"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Cancel
                  </button>
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;