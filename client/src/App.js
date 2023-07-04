import React from 'react';
import Home from './pages/Home';
import Auctions from './pages/Auctions';
import AuctionDetail from './pages/AuctionDetails';
import NewAuction from './pages/NewAuction';
import Auth from './pages/Auth';

function App() {
  return (
    <div>
      <Home />
      <Auctions />
      <AuctionDetail />
      <NewAuction />
      <Auth />
    </div>
  );
}

export default App;
