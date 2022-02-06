import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar";

import "./style.css";

const Main = () => {
  return (
    <div className="main-layout-container">
      <div className="flex items-center h-full">
        <div className="h-full py-10">
          <Sidebar
            items={[
              { title: "Workspace", link: "/" },
              { title: "Annotate", link: "/annotate" },
            ]}
          />
        </div>
        <div className="h-full w-full py-10 flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
