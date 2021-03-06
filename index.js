const express=require('express');
const app =express();
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const pages=require('./routes/pages');
const port = process.env.PORT || 3000;
dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{useUnifiedTopology:true,useNewUrlParser:true},()=>{
    console.log(('Connected to DB'));
});

const authRoute=require('./routes/auth');
const secureRoute=require('./routes/secure');
app.use(express.json());
app.use(express.static('public'));
app.use('/api/user',authRoute);
app.use('/api/secure',secureRoute);
app.use('/',pages);

 app.listen(port,()=>{
     console.log('Server running');
});