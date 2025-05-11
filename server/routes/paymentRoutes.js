import express from 'express';
import razorpay from '../config/razorpay.js';

const router = express.Router();

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, 
    currency: 'INR',
    receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Unable to create order' });
  }
});

export default router;
