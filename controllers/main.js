const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  // mongo validation
  // Joi
  // check in controller

  if (!username || !password) {
    throw new CustomAPIError("please provide email and password", 400);
  }

  // demo
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("no token provided", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `hello ${decoded.username}`,
      secret: `here is your authorized data your luck number is ${luckyNumber}`,
    });
  } catch (error) {
    throw CustomAPIError("Not authorized to access this route", 401);
  }
};

module.exports = { login, dashboard };
