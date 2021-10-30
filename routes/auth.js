const router=require('express').Router();

// import user Model
const User=require('../model/User');
//import validation function
const {registerValidation,loginValidation }=require('../validation')

const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');

router.post('/register',async(req,res)=>{ // /api/user/register 
  
 const {error}=registerValidation(req.body);
 if (error){
     return res.status(400).json({error:error.details[0].message})
 }
// if existing password
 const emailExist=await User.findOne({email: req.body.email});
 if (emailExist){
     return res.status(400).json({error: 'Email Exist'});
 }

 // Hash password

 const salt =await bcrypt.genSalt(10);
 const hashPassword=await bcrypt.hash(req.body.password,salt);

 // create user

 const user=new User({
     name :req.body.name,
     email:req.body.email,
     password: hashPassword
 })
 try {
     const saveUser= await user.save();
     const token =jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
     res.json({user : user._id,redirect: 'batcave',token});
 } catch(error) {
   res.status(400).json(error);
 }
});
// eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzNTQ0ODAzNCwiaWF0IjoxNjM1NDQ4MDM0fQ.SPtpMvWW_4WHohF32ZpmFHhNVpTD9jgk3OvSfbvjEAk
router.post('/login',async(req,res)=>{ // /api/user/login
    const {error}= loginValidation(req.body);
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }
    //if existing email
    const user =await User.findOne({email: req.body.email});

    if (!user){
        return res.status(400).json({error:'Email not found'});
    }
    //password correect
    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        return res.status(400).json({error:'Invalid password'});
    }
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).json({token,redirect:'userPage'});
});

module.exports=router;