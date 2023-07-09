import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from "./components/registrationPage";
import LoginPage from "./components/LoginPage";
import LogoutButton from "./components/Logout";
import AddItems from "./components/addItems";
import ItemList from "./components/searchBarFunc";
import ItemDetail from "./components/itemDetail";
import ActiveUsers from "./components/activeUsers";
import OrderComponent from "./components/orders";
import HomePage from "./components/home";
import Account from "./components/account";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/items" element={<ItemDetail/>} />
        <Route path="/addItem" element={<AddItems/>} />
        <Route path="/account" element={<Account/>} />

      </Routes>
    </Router>
  );
};

export default App;