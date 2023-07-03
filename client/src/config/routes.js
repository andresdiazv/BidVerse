import React from "react";
import { Route, Routes } from "react-router-dom";
import AuctionDetails from "../pages/AuctionDetails";
import Auctions from "../pages/Auctions";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import NewAuction from "../pages/NewAuction";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auctions/:id" component={AuctionDetails} />
      <Route path="/auctions" component={Auctions} />
      <Route path="/new-auction" component={NewAuction} />
      <Route path="/auth" component={Auth} />
      <Route path="/" component={Home} />
    </Routes>
  );
};

export default AppRoutes;

