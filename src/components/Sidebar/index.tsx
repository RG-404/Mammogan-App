import react, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

type SidebarProps = {
  items: {
    title: string;
    link: string;
  }[];
};

const Sidebar = (props: SidebarProps) => {
  const toggleFullscreen = () => {
    // browser is not fullscreen
    if (!document.fullscreenElement) {
      var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else document.exitFullscreen();
  };

  return (
    <div className="sidebar-custom h-full select-none relative">
      <div className="text-white font-bold absolute bottom-0 flex flex-col justify-center items-center w-full">
        <div className="text-white font-bold mb-5">
          <div
            className="cursor-pointer"
            onClick={() => {
              toggleFullscreen();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-maximize text-gray-500 hover:text-white"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </div>
        </div>
      </div>
      <div className="rotate-[90deg] origin-bottom-left ml-9">
        <span className="absolute rotate-180 whitespace-nowrap mx-5">
          {props.items
            .slice(0)
            .reverse()
            .map((item, index) => {
              return (
                <Link to={item.link} key={index}>
                  <span className="text-gray-500 uppercase mx-5 font-bold transition hover:text-white cursor-pointer">
                    {item.title}
                  </span>
                </Link>
              );
            })}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
