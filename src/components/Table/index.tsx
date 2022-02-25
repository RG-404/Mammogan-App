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
              {fakeData.map((item) => {
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
