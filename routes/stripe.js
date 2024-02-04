import express from 'express';
import stripe from 'stripe';
stripe(process.env.STRIPE_SECRET_KEY);


const router = express.Router();

router.post("/payment",async(req,res) => {
    stripe.charges.create({
        source : req.body.tokenId,
        amount : req.body.amount,
        currency : "usd"
    },(stripeErr,stripeRes) => {
        if(stripeErr){
            res.status(500).json(stripeErr);
        }else{
            res.status(200).json(stripeRes);
        }
    })
})


export default router;