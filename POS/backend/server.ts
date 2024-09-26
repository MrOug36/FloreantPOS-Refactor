// backend/server.ts

import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import connectDB from './utils/db';

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
