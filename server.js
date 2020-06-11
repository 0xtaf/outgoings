const express = require('express');
require('dotenv').config({path: './config/config.env'});
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db')

connectDB();

const app = express();

const transactionRouter = require('./routes/transactions')

app.use('/api/v1/transactions', transactionRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgBlue))