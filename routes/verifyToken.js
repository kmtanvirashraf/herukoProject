const jwt=require('jsonwebtoken');


module.exports=function(req,res,next){
    const tocen= req.header('auth-tocken');

    if(!token){
        return res.status(401).json('Access Denied');
    }

    try{
        const varified =jwt.verify(token,process.env.TOCKEN_SECRET);
        req.user=varified;
        next();
    } catch (error)
    {
        res.status(400).json('Invalid Token');
    }
};