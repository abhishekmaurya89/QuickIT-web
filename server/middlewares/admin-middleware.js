const adminMiddleware = async (req, res, next) => {
  try {
    const adminRole = req.user?.isAdmin;

    if (!adminRole) {
      return res.status(403).json({ msg: "Access Denied: Admins only." });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({ msg: "Server Error in Admin Middleware" });
  }
};

module.exports = adminMiddleware;
