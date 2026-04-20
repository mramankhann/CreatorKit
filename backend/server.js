const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));
app.use('/api/download', require('./routes/downloadRoutes'));
app.use('/api/bio', require('./routes/bioRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'CreatorKit API is running 🚀' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port :${PORT}`);
});
