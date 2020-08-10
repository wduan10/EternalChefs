const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User.js');
const auth = require('../../middleware/auth');
const jwtSecret = require('../../config/keys').jwtSecret;

router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ msg: 'Please enter all fields' });

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'No email found' });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user.id },
                        jwtSecret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    initial_payment: user.initial_payment,
                                    payments: user.payments
                                }
                            })
                        }
                    );
                })
        });
});

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            res.json({ user: {
                id: req.user.id,
                name: user.name,
                email: user.email,
                initial_payment: user.initial_payment,
                payments: user.payments
            } });
        })
        .catch(err => {
            res.status(400).json({ msg: err });
        })
});

module.exports = router;