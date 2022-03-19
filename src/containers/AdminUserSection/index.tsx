import React, { useState } from "react";
import Table from "../../components/Table";
import AdminAdduserSection from "../AdminAdduserSection";

const AdminUserSection = () => {
  const [showNewUserSection, setshowNewUserSection] = useState(false);

  return (
    <div>
      <div className="flex mb-4 flex-col md:flex-row">
        <div className="sm:rounded-lg p-6 bg-white shadow w-[80%] mr-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 border-b border-gray-100 pb-2">
            Statistics
          </div>
          <div className="flex">
            <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 mr-3 grow">
              <div className="text-sm font-medium mb-1">Users</div>
              <div className="text-lg font-light text-gray-500">0</div>
            </div>
            <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 mr-3 grow">
              <div className="text-sm font-medium mb-1">Gan Server</div>
              <div className="text-lg font-light text-gray-500">Online</div>
            </div>
            <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 mr-3 grow">
              <div className="text-sm font-medium mb-1">Database size</div>
              <div className="text-lg font-light text-gray-500">490 kB</div>
            </div>
            <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 grow">
              <div className="text-sm font-medium mb-1">Images processsed</div>
              <div className="text-lg font-light text-gray-500">38</div>
            </div>
          </div>
        </div>
        <div className="sm:rounded-lg p-6 bg-white shadow w-[20%]">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-5 border-b border-gray-100 pb-2">
            Quick Links
          </div>
          <div
            className="mb-3 text-sm text-indigo-600 cursor-pointer"
            onClick={() => [setshowNewUserSection(true)]}
          >
            Add new user →
          </div>
          <div className="mb-3 text-sm text-indigo-600">Search user →</div>
        </div>
      </div>
      {showNewUserSection ? (
        <div className="mb-4 transition-all">
          <AdminAdduserSection
            closehandler={() => {
              setshowNewUserSection(false);
            }}
          />
        </div>
      ) : null}

      <div className=" transition-all">
        <Table />
      </div>
    </div>
  );
};

export default AdminUserSection;
