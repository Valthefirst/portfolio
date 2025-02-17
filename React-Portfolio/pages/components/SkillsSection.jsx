"use client";
import Link from "next/link";
import Image from "next/image"; 
import React, { useState, useEffect } from "react";
import { useTranslation } from 'next-i18next';
import { FaDatabase, FaCode, FaTools, FaReact, FaUsers, FaDesktop} from 'react-icons/fa';
const SkillsSection = () => {

  const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  
  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  if (!contentReady) {
    return <div>Loading...</div>; 
  }

return (
  <section id="skills" className="py-12 px-4">
      <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white mt-4 mb-8">
      {t('skills.title')}
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {/* Software Development Tools */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{t('skills.softwareDevelopmentTools')}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Image src="/skills/github.png" alt="Git" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Git Hub</p>
              </div>
              <div>
                <Image src="/skills/docker.png" alt="Docker" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Docker</p>
              </div>
              <div>
                <Image src="/skills/jira.png" alt="Jira" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Atlassian</p>
              </div>
              <div>
                <Image src="/skills/intelliJ.png" alt="IntelliJ" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">IntelliJ</p>
              </div>
              <div>
                <Image src="/skills/vscode.png" alt="VS Code" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">VS Code</p>
              </div>
              <div>
                <Image src="/skills/powershellISE.png" alt="powershellISE" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Windows Powershell</p>
              </div>
            </div>
          </div>

          {/* Databases */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{t('skills.databases')}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Image src="/skills/mysql.png" alt="MySQL" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">MySQL</p>
              </div>
              <div>
                <Image src="/skills/mongodb.png" alt="MongoDB" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">MongoDB</p>
              </div>
              <div>
                <Image src="/skills/postgre.jpg" alt="PostgreSQL" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">PostgreSQL</p>
              </div>
              <div>
                <Image src="/skills/firebase.png" alt="Firebase" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Firebase</p>
              </div>
            </div>
          </div>

          {/* Programming Languages */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{t('skills.programmingLanguages')}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Image src="/skills/javascript.png" alt="JavaScript" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">JavaScript</p>
              </div>
              <div>
                <Image src="/skills/python.png" alt="Python" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Python</p>
              </div>
              <div>
                <Image src="/skills/java.png" alt="Java" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Java</p>
              </div>
              <div>
                <Image src="/skills/c.png" alt="C#" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">C#</p>
              </div>
              <div>
                <Image src="/skills/swift.jpg" alt="Swift" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Swift</p>
              </div>
              <div>
                <Image src="/skills/powershell.png" alt="Powershell scripting" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Powershell Scripting</p>
              </div>
            </div>
          </div>
      
     {/* Frameworks */}
     <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{t('skills.frameworks')}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Image src="/skills/react.png" alt="React.js" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">React.js</p>
              </div>
              <div>
                <Image src="/skills/springboot.png" alt="Spring Boot" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Spring Boot</p>
              </div>
              <div>
                <Image src="/skills/net.png" alt=".NET" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">.NET</p>
              </div>
              <div>
                <Image src="/skills/angular.png" alt="Angular" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Angular</p>
              </div>
              <div>
                <Image src="/skills/nextjs.png" alt="Next js" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Next js</p>
              </div>
            </div>
          </div>

          {/* Operating Systems */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{t('skills.operatingSystems')}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Image src="/skills/windows.png" alt="Windows" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Windows 10/11</p>
              </div>
              <div>
                <Image src="/skills/macos.png" alt="MacOS" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">MacOS</p>
              </div>
              <div>
                <Image src="/skills/linux.png" alt="Linux" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Linux</p>
              </div>
            </div>
          </div>

          {/* Productivity Suite */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{t('skills.productivity')}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Image src="/skills/office365.jpg" alt="Office 365" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Microsoft 365</p>
              </div>
              <div>
                <Image src="/skills/google.png" alt="Google" width={100} height={100} objectFit="contain" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Google Workspace</p>
              </div>
            </div>
          </div>

      {/* <div className="skill-card bg-white dark:bg-[#222222] rounded-lg p-4 hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg">
        <FaUsers className="text-purple-500 dark:text-purple-300 text-3xl mb-2 mx-auto" /> 
        <h3 className="text-xl font-semibold">Soft Skills</h3>
        <ul className="list-none">
          <li>Effective Communication</li>
          <li>Teamwork and Collaboration</li>
          <li>Problem-Solving</li>
        </ul>
      </div> */}
    </div>
    <div className="text-center mt-8">
          <Link href="/Valentine_Nneji_Resume.pdf" className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 ease-in-out shadow-lg">
            <span className="ml-3">Download Resume</span>
          </Link>
        </div>
      </div>
    </section>
)
}
export default SkillsSection;