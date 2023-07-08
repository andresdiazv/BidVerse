//form to create a new auction
import React from "react";

const NewAuction = () => {
  return (
    <div>
      <h1>Create a New Auction</h1>
      <form>
        <label>
          Item Name:
          <input type="text" name="name" />
        </label>
        <label>
          Description:
          <input type="text" name="description" />
        </label>
        <input type="submit" value="Post Auction" />
      </form>
    </div>
  );
};

export default NewAuction;
