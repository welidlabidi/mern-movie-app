const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const db = require("./config/keys");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

let port = process.env.PORT || 4000;

app.listen(port, () => console.log(`the server has started on port : ${port}`));

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  /*  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  }); */
}

mongoose
  .connect(db.mongoURI || process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Established Mongoose Connected..."))
  .catch((err) => console.log(err));
// When successfully connected

app.use("/users", require("./routes/userRouter"));
