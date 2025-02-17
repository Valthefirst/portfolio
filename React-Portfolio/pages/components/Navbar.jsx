"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import NavLink from "../../outside-components/NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import { BsFillCloudMoonFill } from 'react-icons/bs'
import Image from 'next/image';



const Navbar = ({ lightMode, setLightMode }) => {
  const { t, i18n } = useTranslation();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const navLinks = [
    { title: t("navbar.about"), path: "#about" },
      { title: t("navbar.skills"), path: "#skills" },
      { title: t("navbar.projects"), path: "#projects" },
      { title: t("navbar.hobbies"), path: "#hobbies" },
      { title: t("navbar.workExperience"), path: "#work" },
      { title: t("navbar.contact"), path: "#contact" },
  ];
  const toggleLangMenu = () => {
    setLangMenuOpen(!langMenuOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-blue-200 bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl text-gray-900 font-semibold"
        >
          {/* LOGO */}
        </Link>
        <div className="relative">
          {/* Language Selector */}
          <button onClick={toggleLangMenu} className="text-gray-900 px-2 py-1 border border-gray-200 rounded-md">
            {i18n.language.toUpperCase()}
          </button>
          {langMenuOpen && (
            <div className="absolute top-10 right-0 bg-white text-gray-900 border border-gray-200 rounded-md shadow-md">
              <button className="block px-4 py-2 hover:bg-gray-200" onClick={() => changeLanguage('en')}>
                <Image src="/English.png" alt="English" width={20} height={20} className="inline h-4 mr-2" /> English
              </button>
              <button className="block px-4 py-2 hover:bg-gray-200" onClick={() => changeLanguage('fr')}>
                <Image src="/French.png" alt="Français" width={20} height={20} className="inline h-4 mr-2" /> Français
              </button>
            </div>
          )}
        </div>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-400 text-slate-900 hover:text-gray-900 hover:border-gray-900"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-400 text-slate-900 hover:text-gray-900 hover:border-gray-900"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className={`menu ${navbarOpen ? 'block' : 'hidden'} md:block md:w-auto`} id="navbar">
          <ul className="nav-links flex p-5 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index} className="flex items-center">
                {link.title !== "Contact" ? (
                  <NavLink href={link.path} title={link.title} className="hover:text-blue-800" />
                ) : (
                  <div className="flex items-center">
                    <NavLink href={link.path} title={link.title} className="hover:text-blue-800" />
                    <BsFillCloudMoonFill
                      onClick={() => setLightMode(!lightMode)}
                      className={`ml-3 cursor-pointer text-xl md:text-3xl ${lightMode ? "text-gray-900" : "text-gray-600"}`}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
