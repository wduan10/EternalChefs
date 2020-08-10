const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config/keys').jwtSecret;

const User = require('../../models/User.js');

// @route POST api/users
// @desc Register new user
// @access public
router.post('/', (req, res) => {
    const { name, email, password, retype } = req.body;

    // Simple validation
    if (!name || !email || !password || !retype) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    if (name.length > 20 || email.length > 30 || password.length > 20 || retype.length > 20) {
        return res.status(400).json({ msg: 'Input too long' });
    }

    if (password !== retype) {
        return res.status(400).json({ msg: 'Retype does not match password' });
    }

    // Check for existing user
    User.findOne( { email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User({
                name,
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
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
                                            email: user.email
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
});

module.exports = router;