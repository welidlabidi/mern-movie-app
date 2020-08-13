const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  try {
    if (!token)
      return res
        .status(401)
        .json({ msg: "no authentication token, authorization denied" });

    const verified = jwt.verify(token, process.env.jwt_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "token verification failed, authorization denied" });
    req.user = verified.id;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
