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
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className="sidebar-custom h-full">
      <div className="rotate-[90deg] origin-bottom-left ml-9">
        <span className="absolute rotate-180 whitespace-nowrap mx-5">
          {props.items
            .slice(0)
            .reverse()
            .map((item) => {
              return (
                <Link to={item.link}>
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
