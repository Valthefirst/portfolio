"use client";
import { useRouter } from 'next/router';
import React, { useTransition, useState } from "react";
import Image from "next/image";
import { useTranslation } from 'react-i18next';


import TabButton from "./TabButton";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillTwitterCircle
} from "react-icons/ai";
import Link from "next/link";
const sectionData = [
  // {
  //   title: "Skills",
  //   id: "skills",
  //   content: (
  //     <ul className="list-disc pl-2">
  //       <li>Node.js</li>
  //       <li>Express</li>
  //       <li>PostgreSQL</li>
  //       <li>Sequelize</li>
  //       <li>JavaScript</li>
  //       <li>React</li>
  //     </ul>
  //   ),
  // },
  {
    title: "Education",
    id: "education",
  }
];

const AboutSection = () => {
  const [tab, setTab] = useState("about");
  const { t } = useTranslation();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigateTo = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };
  

  return (
    <section id="about" className="py-12 px-4">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="text-gray-800 dark:text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.title')}</h2>
          <p className="text-base lg:text-lg mb-6">
            {t('about.description')}
          </p>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{t('about.education')}</h3>
            <ul className="list-disc pl-2">
            </ul>
          </div>
          <div className="mb-4">
            <ul className="list-disc pl-2">
</ul>
          </div>
        </div>
        <div className="flex-shrink-0 w-[200px] h-[200px] md:w-[330px] md:h-[330px] relative rounded-md overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-lg">
          <Image
            src="/images/valpic.jpg"
            alt="Valentine Nneji"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>

  );
};

export default AboutSection;
