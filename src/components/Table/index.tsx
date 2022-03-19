import React from "react";
import { Outlet } from "react-router-dom";

const fakeData = [
  {
    name: "Rishparn Gogoi",
    email: "gogoi.rishparn@gmail.com",
    userID: 190710007045,
    lastDuration: "23 mins",
    status: "active",
  },
  {
    name: "Debashish Gogoi",
    email: "gogoi.debashish@gmail.com",
    userID: 190710007017,
    lastDuration: "24 mins",
    status: "active",
  },
  {
    name: "Rupam Jyoti Das",
    email: "das.rupam@gmail.com",
    userID: 190710007046,
    lastDuration: "32 mins",
    status: "offline",
  },
  {
    name: "Rishparn Gogoi",
    email: "gogoi.rishparn@gmail.com",
    userID: 190710007045,
    lastDuration: "23 mins",
    status: "active",
  },
  {
    name: "Debashish Gogoi",
    email: "gogoi.debashish@gmail.com",
    userID: 190710007017,
    lastDuration: "24 mins",
    status: "offline",
  },
  {
    name: "Rupam Jyoti Das",
    email: "das.rupam@gmail.com",
    userID: 190710007046,
    lastDuration: "32 mins",
    status: "active",
  },
  {
    name: "Rishparn Gogoi",
    email: "gogoi.rishparn@gmail.com",
    userID: 190710007045,
    lastDuration: "23 mins",
    status: "offline",
  },
];

const Table = () => {
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 pt-7 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 pt-7 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 pt-7 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 pt-7 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Time *
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td colSpan={5}>
                  <div className="py-10 px-6 flex justify-center items-end w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-users h-28 text-gray-200 mr-5"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>

                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user-x h-28 text-gray-200 mr-5"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy={7} r={4} />
                      <line x1={18} y1={8} x2={23} y2={13} />
                      <line x1={23} y1={8} x2={18} y2={13} />
                    </svg> */}
                    <div className="text-sm text-gray-300 ">
                      <div className="mb-2">No users registered</div>
                      <div className="mb-2">
                        User details will be displayed here
                      </div>
                      <div className="mb-2">Add new user +</div>
                    </div>
                  </div>
                </td>
              </tr>
              {/* {fakeData.map((item) => {
                return (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.userID}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status === "active" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {" "}
                          Active{" "}
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {" "}
                          Offline{" "}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.lastDuration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
