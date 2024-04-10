import React from "react";

const GradientBtn = ({ label, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className="bg-primary p-2 px-8 shadow-lg  text-sm text-white rounded-md w-full md:w-[160px]"
    >
      {label}
    </button>
  );
};

export default GradientBtn;
