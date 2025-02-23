import React from "react";
import NavLink from "../../outside-components/NavLink";
import { BsFillCloudMoonFill } from 'react-icons/bs';

const MenuOverlay = ({ links, lightMode, setLightMode }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links && links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
      <li>
        <BsFillCloudMoonFill
          onClick={() => setLightMode(!lightMode)}
          className={`cursor-pointer text-xl ${lightMode ? "text-gray-900" : "text-gray-600"}`}
        />
      </li>
    </ul>
  );
};

export default MenuOverlay;