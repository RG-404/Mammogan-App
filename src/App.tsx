import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainScreen from "./screens/Main";
import Login from "./screens/Login";

import Annotate from "./containers/Annotate";
import Workspace from "./containers/Workspace";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<MainScreen />}>
            <Route path="" element={<Workspace />} />
            <Route path="annotate" element={<Annotate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;