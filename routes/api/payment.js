const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const stripe = require("stripe")(keys.stripeSecretKey);
const User = require('../../models/User');
const auth = require('../../middleware/auth');

const calculateOrderAmount = (items) => {
    return 2500;
}

router.post('/create-payment-intent', auth, async (req, res) => {
    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd"
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

router.post('/update-user', auth, (req, res) => {
    User.findById({ _id: req.body.user.id }, (err, user) => {
        if (err) return res.status(400).json({ msg: err });
        if (user.payments == 0) {
            user.initial_payment = Date.now();
        }
        user.payments += 1;
        user.save();
        res.json({
            user: {
                id: req.user.id,
                name: user.name,
                email: user.email,
                initial_payment: user.initial_payment,
                payments: user.payments
            }
        })
    });
});

module.exports = router;