import express from "express";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import users from "./routes/users.js";
import products from "./routes/product.js";
import orders from "./routes/order.js";
import cart from "./routes/cart.js";
import stripeRoute from "./routes/stripe.js";
import cors from "cors";

const App = express();
dotenv.config();

connectDb();
App.use(
  cors(
    {
      origin: "*",
    },
    {
      methods: ["GET", "POST", "DELETE", "PUT"],
    }
  )
);

const PORT = 5000;
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use("/api/users", users);
App.use("/api/auth", auth);
App.use("/api/products", products);
App.use("/api/orders", orders);
App.use("/api/carts", cart);
App.use("/api/checkOut", stripeRoute);

App.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
