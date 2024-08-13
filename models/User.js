// User 모델(DB) 생성
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

// 끝나면 index.js 안의 user.save()로 들어감
userSchema.pre("save", function (next) {
  // user = userSchema
  var user = this;

  // 비밀번호가 수정될 때만 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        // 비밀번호를 hash로 암호화해서 저장
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 12345678  ==? 암호화된 비밀번호 $2b$10$rH8y/6KiBuzTwL1eEu61deU5HWD7ESETT6sMKeFe5z34C7s1NVwdO
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err), cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

// 다른 곳에서 모델 사용 가능하게 하기
module.exports = { User };
