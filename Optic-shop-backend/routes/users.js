const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt =require("bcryptjs");
const jwt = require ("jsonwebtoken");


//@route GET api/users
//@desc Get all users
//@access Public
router.get("/",async(req,res)=>{
try {
    const users= await User.find().sort({ date: -1 }).select("-password");
    res.json(users);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Server error"); 
}
});


//@route POST api/users
//@desc Create user
//@access Public
router.post("/",async (req,res)=>{
    try {
    const userFields={};
    userFields.firstName=req.body.firstName;
    userFields.lastName=req.body.lastName;
    userFields.email=req.body.email;
    userFields.password=bcrypt.hashSync(req.body.password,10);
    userFields.isAdmin=req.body.isAdmin;
    userFields.phone=req.body.phone;
    userFields.address={};
    userFields.address.country=req.body.country;
    userFields.address.street=req.body.street;
    userFields.address.city=req.body.city;
    userFields.address.zip=req.body.zip;
    user=new User(userFields);
    await user.save();
    res.json(user);
        
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
})

//@route DELETE api/users/:id
//@desc DELETE by id user
//@access Private

router.delete("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.remove();
      res.json({ message: "User Deleted" });
    } catch (error) {
      console.error(error.message);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ message: "User not Found " });
      }
      res.status(500).send("Server error");
    }
  });

//@route POST api/users/login
//@desc login user
//@access Public
router.post("/login",async (req,res)=>{
    try {
        const user = await User.findOne({email : req.body.email});
        if(!user){
            res.status(400).send("Invalid parameters !")
        }
        if(user && bcrypt.compareSync(req.body.password,user.password)){
            const token = jwt.sign({
                userId:user.id,
            },"secret");
            res.status(200).send({user : user.email,token:token});
        }
        else{
            res.status(400).send("Invalid password!")
        }

        
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
})


module.exports = router;