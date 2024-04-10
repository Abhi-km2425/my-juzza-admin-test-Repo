import { Link, useLocation } from "react-router-dom";
import  { useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";


const SideBar = ({ sidebarData }) => {
  const [slide, setSlide] = useState(false);
  const params = useLocation();

  return (
    <>
      <div className={`h-screen p-5 pt-5 hidden md:block`}>
        <ul className="w-full flex flex-col  md:pe-2 ">
          {sidebarData?.map((items, i) => (
            <Link key={i} to={items?.path}>
              <li className={`w-full p-1 flex text-white gap-2 ${slide && "px-10"}`}>
                <div
                  className={`border rounded-lg  p-3  ${
                    params?.pathname.includes(items?.path)
                      ? "bg-primary"
                      : "bg-[#333333]"
                  }`}
                >
                  {items?.icon}
                </div>
                <div
                  className={`${
                    slide
                      ? "hidden"
                      : "block border text-sm rounded-lg p-3 w-[170px]"
                  }  ${
                    params?.pathname.includes(items?.path)
                      ? "bg-primary"
                      : "bg-[#333333]"
                  }`}
                >
                  {items?.name}
                </div>
              </li>
            </Link>
          ))}
          <li
            className={`w-full  mt-5 ${
              slide
                ? "flex items-center justify-center"
                : "flex justify-end items-end"
            }`}
          >
            {slide ? (
              <MdKeyboardDoubleArrowRight
                onClick={() => setSlide(!slide)}
                className="side-bar-icon cursor-pointer hover:scale-105 ease-in-out duration-400"
                size={25}
              />
            ) : (
              <MdKeyboardDoubleArrowLeft
                onClick={() => setSlide(!slide)}
                className="side-bar-icon cursor-pointer hover:scale-105 ease-in-out duration-400"
                size={30}
              />
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
