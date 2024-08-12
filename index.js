const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://Unbox:dksdkffuwna!159@boxtube.k0g6g.mongodb.net/?retryWrites=true&w=majority&appName=BoxTube", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected!!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!~~ 하이용");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
