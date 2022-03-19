import React from "react";

const AdminAdduserSection = (props: any) => {
  return (
    <div className="bg-white sm:rounded-lg shadow p-6 relative">
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
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button className="bg-indigo-600 py-2 px-4 hover:bg-indigo-500 rounded-md text-white text-sm">
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
