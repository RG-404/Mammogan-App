import React, { useState, useEffect } from "react";
import axios from "axios";

import { useQuery } from "../../services/useQuery";

import CONFIG from "../../config.json";

type UserDetailsResponse = {
  name: string;
  uid: string;
  email: string;
  status: string;
};

const AdminUserDetailSection = () => {
  const query = useQuery();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setuserid] = useState("");
  const [status, setStatus] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getUserData();
    console.log(query.get("uid"));
  }, []);

  // const getUserData = async () => {
  //   try {
  //     setTimeout(async () => {
  //       const res = await axios.get<UserDetailsResponse>(
  //         `${CONFIG.management_api}/admin/user`,
  //         {
  //           params: {
  //             uid: 'TEST_USER_1'
  //           },
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       if (res.data.status === "success") {
  //         // DATA MAPPING
  //       }
  //     }, 1000);
  //   } catch (error) {
  //     console.log("error");
  //     if (axios.isAxiosError(error)) {
  //       console.log(error);
  //     }
  //   }
  // };

  const getUserData = async () => {
    setName("Rishi Gogoi");
    setEmail("gogoi.rishparn@gmail.com");
    setPassword("123455");
    setuserid("DEV_USER_1");
  };

  const inputChangeHandler = (event: any, setState: any) => {
    setState(event.target.value);
  };

  const handleEditButton = () => {
    setEditMode((state) => !state);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {editMode ? (
        <div className="sm:rounded-lg px-6 py-4 bg-red-500 shadow w-full justify-center mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#FFF"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
            />
          </svg>
          <span className="text-white font-bold">EDIT MODE.&nbsp;</span>
          <span className="text-white">
            Changes made will be permanantly saved.
          </span>
        </div>
      ) : null}

      <div className="sm:rounded-lg p-6 bg-white shadow w-full ustify-center mb-4">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-6 border-b border-gray-100 pb-2">
          RISHI GOGOI's PROFILE
        </div>
        <div className="flex flex-wrap mb-5">
          <div className="flex flex-wrap w-full mb-4">
            <div className="w-full mb-4 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                Name
              </label>
              <input
                className="appearance-none block w-full text-gray-500 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                type="text"
                placeholder="Jane"
                value={name}
                disabled={!editMode}
                onChange={(e) => inputChangeHandler(e, setName)}
              />
            </div>
          </div>
          <div className="flex flex-wrap w-full mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                User Id
              </label>
              <input
                className="appearance-none block w-full text-gray-500 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                type="text"
                placeholder="AA11BB22"
                value={userid}
                disabled={!editMode}
                onChange={(e) => inputChangeHandler(e, setuserid)}
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                Email
              </label>
              <input
                className="appearance-none block w-full text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                type="email"
                placeholder="example@domain.com"
                value={email}
                disabled={!editMode}
                onChange={(e) => inputChangeHandler(e, setEmail)}
              />
            </div>
          </div>
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Password
            </label>
            <input
              className="appearance-none block w-full text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
              id="grid-password"
              type="password"
              placeholder="******************"
              value={password}
              disabled={!editMode}
              onChange={(e) => inputChangeHandler(e, setPassword)}
            />
          </div>
        </div>
      </div>
      <div className="flex mb-4 w-full flex-col md:flex-row">
        <div className="sm:rounded-lg p-6 bg-white shadow  w-full md:w-[50%] md:mr-4 justify-center mb-10 md:mb-0">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 border-b border-gray-100 pb-2">
            ACCESS CONTROL
          </div>
          <div className="flex flex-col md:flex-row mb-6">
            <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 md:mr-3 grow mb-4 md:mb-0">
              <div className="text-sm font-medium mb-1">Accesible Tools</div>
              <div className="text-lg font-light text-gray-500">1</div>
            </div>
            <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 md:mr-3 grow mb-4 md:mb-0">
              <div className="text-sm font-medium mb-1">Gan Server</div>
              <div className="text-lg font-light text-gray-500">Online</div>
            </div>
          </div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 border-b border-gray-100 pb-2">
            TOOLS
          </div>
          <div className="">
            {[
              {
                name: "MammoGAN",
                code: "mammo",
              },
              {
                name: "Project X",
                code: "px",
              },
              { name: "Project A", code: "pa" },
            ].map((item, index) => {
              return (
                <div className={`flex items-center mb-3`}>
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded duration-300 accent-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-900"
                  >
                    {item.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col justify-between w-full md:w-[50%]">
          <div className="sm:rounded-lg p-6 bg-white shadow  w-full justify-center mb-10 md:mb-0">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 border-b border-gray-100 pb-2">
              RISHI GOGOI's STATS
            </div>
            <div className="flex flex-col md:flex-row md:mb-4">
              <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 md:mr-3 grow mb-4 md:mb-0">
                <div className="text-sm font-medium mb-1">Total Time</div>
                <div className="text-lg font-light text-gray-500">
                  4.5 hours
                </div>
              </div>
              <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 grow mb-4 md:mb-0">
                <div className="text-sm font-medium mb-1">Current Status</div>
                <div className="text-lg font-light text-gray-500">Online</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 md:mr-3 grow  mb-4 md:mb-0">
                <div className="text-sm font-medium mb-1">Images saved</div>
                <div className="text-lg font-light text-gray-500">8</div>
              </div>
              <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 grow mb-4 md:mb-0">
                <div className="text-sm font-medium mb-1">
                  Images processsed
                </div>
                <div className="text-lg font-light text-gray-500">12</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mx-5 md:mx-0">
            <button className="duration-300 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2  transition-all bg-gray-800 hover:bg-gray-700 focus:ring-gray-500 md:mr-4 mb-4 md:mb-0">
              {editMode ? "Save" : "Download Report"}
            </button>
            <button
              className="duration-300 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2  transition-all bg-red-800 hover:bg-red-700 focus:ring-red-500"
              onClick={handleEditButton}
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailSection;
