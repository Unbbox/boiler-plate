// User 모델(DB) 생성
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    // trim : 공백제거(true)
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 8,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  // 토큰 유효기간
  tokenExp: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

// 다른 곳에서 모델 사용 가능하게 하기
module.exports = { User };
