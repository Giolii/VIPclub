const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Please login first" });
};

const isVip = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isVip) {
    return next();
  }
  res.status(403).json({ message: "VIP access required" });
};

module.exports = { isAuthenticated, isVip };
