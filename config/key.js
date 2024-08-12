if (process.env.NODE_ENV === "devolopment") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
