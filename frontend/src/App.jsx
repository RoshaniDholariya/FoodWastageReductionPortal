import React from "react";
<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
import Signin from "./Pages/Signin";
=======
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
>>>>>>> 8510e3ca78574475e5c59838f51fdbd13490dce7

function App() {
  return (
<<<<<<< HEAD
    <>
      <Routes>
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
};
=======
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
>>>>>>> 8510e3ca78574475e5c59838f51fdbd13490dce7

export default App;
