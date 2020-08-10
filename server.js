const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const email = require('./routes/api/email');
const payment = require('./routes/api/payment');
const db = require('./config/keys').mongoURI;

const app = express();

app.use(express.json());

mongoose.set('useUnifiedTopology', true)

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/email', email);
app.use('/api/payment', payment);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on ' + port));