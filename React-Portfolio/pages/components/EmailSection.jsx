"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'next-i18next';
// import GithubIcon from "../../../public/github-icon.svg";
// import LinkedinIcon from "../../../public/linkedin-icon.svg";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillTwitterCircle
} from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  const { t, ready } = useTranslation();
  const [contentReady, setContentReady] = useState(false);
  
  
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  useEffect(() => {
    if (ready) {
      setContentReady(true);
    }
  }, [ready]);

  if (!contentReady) {
    return <div>Loading...</div>; 
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
      
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send/route";
    console.log(process.env.MAIL_USERNAME, process.env.MAIL_PASSWORD);

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const resData = await response.json();

    if (response.status === 200) {
      console.log("Message sent.");
      setEmailSubmitted(true);
    }
  };

  const socialLinks = [
    { icon: <AiFillLinkedin />, url: "https://www.linkedin.com/in/yourusername" },
    { icon: <AiFillGithub />, url: "https://github.com/yourusername" },
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-10 px-6 sm:px-10 lg:py-16 lg:px-12 rounded-xl shadow-xl mx-auto max-w-7xl flex flex-col lg:flex-row items-start gap-10">
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('emailSection.title')}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{t('emailSection.description')}</p>
        </div>
        {emailSubmitted ? (
          <div className="text-center p-6">
            <p className="text-lg font-semibold text-green-500">{t('emailSection.emailSent')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="email" name="email" id="email" required placeholder={t('emailSection.placeholderEmail')}
                     className="form-input w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
              <input type="text" name="subject" id="subject" required placeholder={t('emailSection.placeholderSubject')}
                     className="form-input w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
            </div>
            <textarea name="message" id="message" rows="4" placeholder={t('emailSection.placeholderMessage')}
                      className="form-input w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"></textarea>
            <button type="submit"
                    className="w-full md:w-auto px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition duration-150 ease-in-out">
              {t('emailSection.sendMessage')}
            </button>
          </form>
        )}
      </div>
      <div className="w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('emailSection.findMeHere')}</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <AiFillLinkedin />, url: "https://linkedin.com/in/valentine-nneji" },
            { icon: <AiFillGithub />, url: "https://github.com/valthefirst" },
          ].map((link, index) => (
            <a key={index} href={link.url} className="text-3xl text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition duration-150 ease-in-out">
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
