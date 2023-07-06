import React from "react";
import RegisterPage from "./registrationPage";
import LoginPage from "./LoginPage";
import LogoutButton from "./Logout";

function App() {
  return (
    <div className="App">
     <RegisterPage />
     <LoginPage />
     <LogoutButton />
    </div>
  );
}

export default App;
