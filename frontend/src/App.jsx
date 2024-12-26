import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./Pages/Signin";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
};

export default App;
