const router=require('express').Router();
const verify=require('./verifyToken');

router.get('/',verify,(req,res)=>{
    res.redirect('/public/userPage.html');
});
module.exports=router;