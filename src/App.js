import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileCard from "./components/ProfileCard";

const App = () => {
  const [profile, setProfile] = useState({
    name: "",
    lastName: "",
    office: "",
  });

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<ProfileCard profile={profile} setProfile={setProfile} />}
        />
        <Route
          path="/edit-profile"
          element={<ProfileCard profile={profile} setProfile={setProfile} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
