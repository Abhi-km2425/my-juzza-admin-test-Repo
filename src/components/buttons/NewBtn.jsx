import React from "react";

const NewBtn = ({ onClick, modal }) => {
  const clickHandle = () => {
    modal(true);
  };
  return (
    <button
      onClick={clickHandle}
      className="bg-primary text-sm text-white font-semibold px-[2vw] py-[1vh] rounded-md"
    >
      New
    </button>
  );
};

export default NewBtn;
