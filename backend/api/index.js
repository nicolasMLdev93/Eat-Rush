"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const route = require("./routes/route");
require('dotenv').config({
    path: path.join(__dirname, '..', '.env')
});
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use("/", route);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
