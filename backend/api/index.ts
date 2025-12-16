const express = require("express");
const app: any = express();
const port = process.env.PORT || 3000;
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const route = require("./routes/route");

dotenv.config();
// Root of the project //
app.use("/", route);
app.use(express.json());
app.use(helmet());
app.use(cors());

app.listen(port, () => {
  try {
    console.log(`App listening on port ${port}`);
  } catch (error) {
    console.log(`Error connecting to port ${port}`);
  }
});
