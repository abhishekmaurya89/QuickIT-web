const User = require("../models/auth-model");
const Contact = require("../models/contact-model");
const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};


const getContact = async (req, res, next) => {
  try {
    const users = await Contact.find({});
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Contact found" });
    }
    return res.status(200).json(users); 
  } catch (error) {
    return next(error);
  }
};
const deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await Contact.findByIdAndDelete(id);
   if (!user) {
  return res.status(404).json({ message: "Contact not found" }); // ✅ Correct
}
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getById=async(req,res)=>{
  try {
    const id=req.params.id;
    const user = await User.findOne({_id:id});
    return res.status(200).json(user); 
  } catch (error) {
    next(error);
  }
}
const updateById=async(req,res)=>{
  try {
    const id=req.params.id;
    const updatedUserData = req.body; 

    const updateUser = await User.updateOne({_id:id},
     { $set: updatedUserData},
    );
    return res.status(200).json(updateUser); 
  } catch (error) {
    next(error);
  }
}



module.exports={getAllUser,getContact,deleteById,getById,updateById,deleteContact};