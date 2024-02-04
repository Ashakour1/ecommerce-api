import express from 'express';
import auth from './routes/auth.js';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import users from './routes/users.js';
import products from './routes/product.js';

const App = express();
dotenv.config();

connectDb();

const PORT = 5000;
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use('/api/users', users);
App.use('/api/auth',auth);


App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})