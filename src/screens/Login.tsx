import React, { useState } from "react";

const Login = () => {
  const [adminClicks, setAdminClicks] = useState(0);
  const [isSuperMode, setIsSuperMode] = useState(false);

  return (
    <div className="h-screen bg-gray-50">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              onClick={() => {
                setAdminClicks(adminClicks + 1);
              }}
              className="mx-auto h-32 w-auto"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/8/85/All_India_Institute_of_Medical_Sciences%2C_Delhi.svg/400px-All_India_Institute_of_Medical_Sciences%2C_Delhi.svg.png"
              alt="Workflow"
            />
            <h2
              className={`mt-6 text-center text-3xl font-extrabold text-gray-900 transition-all ${
                isSuperMode ? "text-red-600" : null
              }`}
            >
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm ${
                    isSuperMode
                      ? "focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm ${
                    isSuperMode
                      ? "focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={true}
                  className={`h-4 w-4 border-gray-300 rounded ${
                    isSuperMode ? "accent-red-600 " : "accent-indigo-600 "
                  }`}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              {adminClicks > 3 ? (
                <div className="text-sm">
                  <a
                    onClick={() => {
                      setIsSuperMode(!isSuperMode);
                    }}
                    className={`font-medium cursor-pointer transition-all ${
                      isSuperMode
                        ? "text-red-600 hover:text-red-500"
                        : "text-indigo-600 hover:text-indigo-500"
                    }`}
                  >
                    {isSuperMode ? "User " : "Admin "} Login
                  </a>
                </div>
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2  transition-all ${
                  isSuperMode
                    ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                }`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className={`h-5 w-5 transition-all ${
                      isSuperMode
                        ? "text-red-500 group-hover:text-red-400"
                        : "text-indigo-500 group-hover:text-indigo-400"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {isSuperMode ? "Admin s" : "S"}
                ign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
