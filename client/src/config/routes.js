import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuctionDetails from "../pages/AuctionDetails";
import Auctions from "../pages/Auctions";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import NewAuction from "../pages/NewAuction";

const Routes = () => {
  return (
    <Switch>
      <Route path="/auctions/:id" component={AuctionDetails} />
      <Route path="/auctions" component={Auctions} />
      <Route path="/new-auction" component={NewAuction} />
      <Route path="/auth" component={Auth} />
      <Route path="/" component={Home} />
    </Switch>
  );
};
