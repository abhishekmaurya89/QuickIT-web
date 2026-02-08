const express = require("express");
const adminRoute = express.Router();
const {getAllUser,getContact,deleteById,getById,updateById,deleteContact} = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/admin-middleware");

adminRoute.route("/admin").get(authMiddleware,adminMiddleware
,getAllUser);
adminRoute.route("/contact").get(authMiddleware,adminMiddleware,getContact);
adminRoute.route("/contact/:id").delete(authMiddleware,adminMiddleware,deleteContact);
adminRoute.route("/admin/delete/:id").delete(authMiddleware, adminMiddleware, deleteById);
adminRoute.route("/get/:id").get(authMiddleware, adminMiddleware,getById);
adminRoute.route("/update/:id").patch(authMiddleware, adminMiddleware,updateById);
module.exports = adminRoute;