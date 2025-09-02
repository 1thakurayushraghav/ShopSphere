import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Product from './models/product.js'; // Make sure path correct hai

dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Seeder function
const seedProducts = async () => {
  try {
    // JSON file path
    const productsPath = path.join(process.cwd(), 'data', 'products.json');
    
    // JSON file read
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

    // Clear existing products
    await Product.deleteMany();
    console.log('Existing products removed.');

    // Insert new products
    await Product.insertMany(productsData);
    console.log('Products seeded successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run seeder
connectDB().then(seedProducts);
