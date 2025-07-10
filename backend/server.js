const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./firebase');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1️⃣ Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Razorpay order failed', details: err });
  }
});

// 2️⃣ Save Booking to Firestore
app.post('/api/save-booking', async (req, res) => {
  const { movieTitle, movieId, seats, amount, paymentId } = req.body;

  try {
    const doc = await db.collection('bookings').add({
      movieTitle,
      movieId,
      seats,
      amount,
      paymentId,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ success: true, docId: doc.id });
  } catch (err) {
    res.status(500).json({ error: 'Firestore error', details: err });
  }
});

// 3️⃣ Optional: Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const snapshot = await db.collection('bookings').get();
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Fetching bookings failed' });
  }
});

app.get('/', (req, res) => res.send('🔥 Firebase + Razorpay Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
