const express=require('express');
const router=express    .Router();
const path=require('path');
const { mainModule } = require('process');

router.get('/userPage',(req,res)=>{
    res.sendFile(path.resolve('public/userPage.html'));
});
module.exports=router;

