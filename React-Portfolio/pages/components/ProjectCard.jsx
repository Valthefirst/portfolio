import React from "react";

const ProjectCard = ({ imgUrl }) => {
  return (
    <div>
      <div
        className="h-52 md:h-72 rounded-t-xl relative group"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      >
      </div>
    </div>
  );
};

export default ProjectCard;


