import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { useQuery } from "../../services/useQuery";

import Table from "../../components/Table";
import AdminAdduserSection from "../AdminAdduserSection";

import CONFIG from "../../config.json";

type Users = Array<{
  id: string;
  name: string;
  email: string;
  last_active: number;
}>;

type UsersDataResponse = {
  data: Users;
  message: string;
  status: string;
};

const AdminUserSection = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const [showNewUserSection, setshowNewUserSection] = useState<Boolean>(false);
  const [usersData, setUsersData] = useState<Users>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    getUsers();
    if (query.get("adduser") === "true") setshowNewUserSection(true);
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const res = await axios.get<UsersDataResponse>(
          `${CONFIG.management_api}/admin/get_users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.status === "success") {
          setLoading(false);
          setUsersData(res.data.data);
        }
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log("error");
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex mb-4 w-full flex-col md:flex-row">
        <div className="sm:rounded-lg p-6 bg-white shadow  w-full md:w-[80%] mr-4 justify-center mb-10 md:mb-0">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 border-b border-gray-100 pb-2">
            Statistics
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 md:mr-3 grow mb-4 md:mb-0">
              <div className="text-sm font-medium mb-1">Users</div>
              <div className="text-lg font-light text-gray-500">0</div>
            </div>
            <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 md:mr-3 grow mb-4 md:mb-0">
              <div className="text-sm font-medium mb-1">Gan Server</div>
              <div className="text-lg font-light text-gray-500">Online</div>
            </div>
            <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 md:mr-3 grow  mb-4 md:mb-0">
              <div className="text-sm font-medium mb-1">Database size</div>
              <div className="text-lg font-light text-gray-500">490 kB</div>
            </div>
            <div className="bg-gray-50 py-3 px-4 rounded-lg border-gray-200 border-t-8 grow  mb-4 md:mb-0">
              <div className="text-sm font-medium mb-1">Images processsed</div>
              <div className="text-lg font-light text-gray-500">38</div>
            </div>
          </div>
        </div>
        <div className="sm:rounded-lg p-6 bg-white shadow w-full md:w-[20%]">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-5 border-b border-gray-100 pb-2">
            Quick Links
          </div>
          <div
            className="mb-3 text-sm text-indigo-600 cursor-pointer"
            onClick={() => {
              setshowNewUserSection(true);
              navigate("/admin?adduser=true", { replace: true });
            }}
          >
            Add new user →
          </div>
          <div className="mb-3 text-sm text-indigo-600">Search user →</div>
        </div>
      </div>
      {showNewUserSection ? (
        <div className="mb-4 transition-all w-full">
          <AdminAdduserSection
            closehandler={() => {
              setshowNewUserSection(false);
              navigate("/admin", { replace: true });
            }}
          />
        </div>
      ) : null}

      <div className="transition-all w-full ">
        <Table data={usersData} loading={loading} />
      </div>
    </div>
  );
};

export default AdminUserSection;
