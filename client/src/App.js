import React from "react";
import Home from "./pages/Home";
import Auctions from "./pages/Auctions";
import AuctionDetail from "./pages/AuctionDetails";
import NewAuction from "./pages/NewAuction";
import Auth from "./pages/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/auctions/:id" element={<AuctionDetail />} />
            <Route path="/new-auction" element={<NewAuction />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Route>
      </Router>
    </div>
  );
}

export default App;
