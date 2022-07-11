import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DataProvider } from "./context/DataProvider";
import { AuthProvider } from "./context/AuthProvider";

import MainScreen from "./screens/Main";
import Login from "./screens/Login";
import AdminDash from "./screens/AdminDash";

import Annotate from "./containers/Annotate";
import Workspace from "./containers/Workspace";
import AdminOverviewSection from "./containers/AdminOverviewSection";
import AdminUserDetailSection from "./containers/AdminUserDetailSection";
import AdminSettings from "./containers/AdminSettings";

import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <DataProvider>
          <BrowserRouter 
          // basename="/gan_app"
          >
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="" element={<MainScreen />}>
                <Route path="" element={<Workspace />} />
                <Route path="annotate" element={<Annotate />} />
              </Route>
              <Route path="admin" element={<AdminDash />}>
                <Route path="" element={<AdminOverviewSection />} />
                <Route path="user" element={<AdminUserDetailSection />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
