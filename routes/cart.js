import express from "express";
import cart from "../models/Cart.js";
import CryptoJS from "crypto-js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const newCart = new cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// // Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const Cart = await cart.findByIdAndDelete(req.params.id);

    res.status(200).json("Cart has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//
router.get(
  "/product/:userId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const cart = await cart.findOne({
        userId: req.params.userId,
      });

      res.status(200).json({
        cart,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await cart.find();
    res.status(200).json({
      carts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
