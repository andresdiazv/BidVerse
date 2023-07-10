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
import CategoryPage from "./components/CategoryPage";
import Account from "./components/account";
import PaymentOptions from './components/paymentOptions'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/items" element={<ItemDetail/>} />
        <Route path="/addItem" element={<AddItems/>} />
        <Route path="/category/:category" element={<CategoryPage />} /> {/* Here's the change */}
        <Route path="/electronics" element={<CategoryPage />} />
        <Route path="/sports" element={<CategoryPage />} />
        <Route path="/cars" element={<CategoryPage />} />
        <Route path="/food" element={<CategoryPage />} />
        <Route path="/toys" element={<CategoryPage />} />
        <Route path="/furniture" element={<CategoryPage />} />
        <Route path="/account" element={<Account/>} />
        <Route path="/paymentOptions" element={<PaymentOptions/>} />
        <Route path="/item/:itemId" element={<ItemDetail/>} />
      </Routes>
    </Router>
  );
};

export default App;
