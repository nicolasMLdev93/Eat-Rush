"use strict";
const express = require("express");
const app = express();
const port = 3000;
const route = require("./routes/route");
app.use("/", route);
app.listen(port, () => {
    try {
        console.log(`App listening on port ${port}`);
    }
    catch (error) {
        console.log(`Error connecting to port ${port}`);
    }
});
