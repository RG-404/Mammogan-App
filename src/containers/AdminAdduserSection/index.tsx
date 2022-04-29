import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthProvider";

import CONFIG from "../../config.json";

const AdminAdduserSection = (props: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setuserid] = useState("");

  const { sessionToken } = useContext(AuthContext);

  useEffect(() => {
    getUserTypes();
  }, []);

  const getUserTypes = async () => {
    const res = await axios.get(`${CONFIG.management_api}/auth/user/types`);
    console.log(res.data);
  };

  const inputChangeHandler = (event: any, setState: any) => {
    console.log(event.target.value);
    setState(event.target.value);
  };

  const submitAddUser = async () => {
    const data = {
      newUserFirstName: firstName,
      newUserLastName: lastName,
      newUserPassword: password,
      userType: "generaluser",
      newUserId: userid,
      newUserEmail: email,
      session_token: sessionToken || "",
    };
    console.log(data);
    const res = await axios.post(
      `${CONFIG.management_api}/auth/user/signup`,
      data
    );
    console.log(res.data);
  };

  return (
    <div className="bg-white sm:rounded-lg shadow p-6 relative">
      <div
        className="p-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
        role="alert"
      >
        <span className="flex items-center">
          <svg
            role="status"
            className="mr-4 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="font-medium">Creating new user.</span> &nbsp;Please
          wait for a moment.
        </span>
      </div>

      <div className="w-full mx-auto">
        <div className="flex flex-wrap mb-5">
          <div className="flex flex-wrap w-full mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                First Name
              </label>
              <input
                className="appearance-none block w-full text-gray-500 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                type="text"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => inputChangeHandler(e, setFirstName)}
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                Last Name
              </label>
              <input
                className="appearance-none block w-full text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => inputChangeHandler(e, setLastName)}
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
              onChange={(e) => inputChangeHandler(e, setPassword)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-indigo-600 py-2 px-4 hover:bg-indigo-500 rounded-md text-white text-sm"
            onClick={submitAddUser}
          >
            Register
          </button>
          <button
            className=" py-2 px-4 rounded-md text-gray-500 text-sm tracking-wid font-bold capitalize"
            onClick={props.closehandler ? props.closehandler : null}
          >
            CLOSE X
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAdduserSection;
