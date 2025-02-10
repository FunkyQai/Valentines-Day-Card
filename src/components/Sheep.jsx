import React from "react";
import "./Sheep.css";

const Sheep = ({ position, direction }) => {
  const style = direction === "left" ? { left: `${position}%` } : { right: `${position}%` };
  const headClass = direction === "left" ? "sheep-head" : "sheep-head sheep-2-head";
  const eyeClass = direction === "left" ? "sheep-eye" : "sheep-eye sheep-2-eye";

  return (
    <div className="sheep" style={style}>
      <div className="sheep-body"></div>
      <div className={headClass}></div>
      <div className="sheep-leg sheep-leg-1"></div>
      <div className="sheep-leg sheep-leg-2"></div>
      <div className={eyeClass}></div>
    </div>
  );
};

export default Sheep;