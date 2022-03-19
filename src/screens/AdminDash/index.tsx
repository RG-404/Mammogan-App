import React, { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const AdminDash = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 bg-[#131e24] -z-50 h-80"></div>
      <div className="max-w-6xl mx-auto">
        <div className="text-white mb-4">
          <div className="flex justify-between items-center py-9">
            <div className="flex justify-center items-center">
              <img
                className="h-20 bg-white p-2 px-3 mr-6 rounded-lg"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/8/85/All_India_Institute_of_Medical_Sciences%2C_Delhi.svg/400px-All_India_Institute_of_Medical_Sciences%2C_Delhi.svg.png"
                alt="Workflow"
              />
              <div className="text-2xl font-bold">MammoGAN Admin Dashboard</div>
            </div>
            <button className="bg-yellow-500 px-4 py-2 rounded text-black hover:bg-yellow-600 transition-all">
              Logout
            </button>
          </div>
          <div className="border-[0.6px] border-gray-600 mb-2" />
          <ul className="text-white flex">
            <Link to="/admin">
              <li
                className={`text-center px-3 mr-1 py-2 cursor-pointer hover:bg-[#1f313b] rounded-md  ${
                  location.pathname === "/admin"
                    ? "text-white"
                    : "text-gray-400"
                } hover:text-white transition-all font-semibold`}
              >
                Users
              </li>
            </Link>
            <Link to="/admin/overview">
              {" "}
              <li
                className={`text-center px-3 mr-1 py-2 cursor-pointer hover:bg-[#1f313b] rounded-md  ${
                  location.pathname === "/admin/overview"
                    ? "text-white"
                    : "text-gray-400"
                } hover:text-white transition-all font-semibold`}
              >
                Overview
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex flex-col mb-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
