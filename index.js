const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const config = require("./config/key");

// User.js 가져오기
const { User } = require("./models/User");

// body-parser 설정
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected!!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!~~ 하이용");
});

// register router
app.post("/register", async (req, res) => {
  // 회원가입 시 필요한 정보들을 client 에서 가져오면
  // 그걸 DB에 넣어준다.
  const user = new User(req.body);

  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err: err,
      });
    });
});

app.post("/login", (req, res) => {
  // DB에서 입력한 email(id) 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일 혹은 비밀번호가 올바른지 확인해주세요",
      });
    }

    // DB에 패스워드가 있는지 찾기
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "이메일 혹은 비밀번호가 올바른지 확인해주세요" });
      }

      // token 생성
      user.generateToken((err, user) => {
        //
      });
    });
    //
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
