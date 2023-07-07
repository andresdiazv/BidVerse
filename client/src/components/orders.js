import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../Config/firebase';
const OrderComponent = () => {
    const [orderTime, setOrderTime] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [item, setItem] = useState('');
    const [orderAmount, setOrderAmount] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');


const handlePlaceOrder = async () => {
    try{
    const orderNumber = generateOrderNumber();
    
    const newOrder = {
        orderTime,
        orderTime,
        paymentMethod,
        item,
        orderAmount,
        shippingAddress,
    }
    await axios.post('/api/orders', newOrder);

    setOrderTime('');
    setPaymentMethod('');
    setItem('');
    setOrderAmount('');
    setShippingAddress('');
    
 alert('Order placed successfully!');
} catch (error) {
  console.error('Error placing order:', error);
  alert('Failed to place order');
}

};

const generateOrderNumber = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 0;
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
    
      const timestamp = Date.now().toString();
    
      return `${result}-${timestamp}`;
    };
    
  return (
    <div>
      <h2>Place Order</h2>
      <form>
        <div>
          <label htmlFor="orderTime">Order Time</label>
          <input
            type="text"
            id="orderTime"
            value={orderTime}
            onChange={(e) => setOrderTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">Payment Method</label>
          <input
            type="text"
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="item">Item</label>
          <input
            type="text"
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="orderAmount">Order Amount</label>
          <input
            type="text"
            id="orderAmount"
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="shippingAddress">Shipping Address</label>
          <input
            type="text"
            id="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </div>
        <button type="button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </form>
    </div>
  );
}

export default OrderComponent;