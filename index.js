import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connect from './utils/db.js';
import methodOverride  from 'method-override';
import passportConfig from './config/passport-local.js';
import session from "express-session";
import passport from 'passport';

import { isUser } from './config/auth.js';


dotenv.config();
const app = express();


app.set('views','./views')
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(session({
    secret: '123',

}))

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session())


app.get('*',function(req,res,next){
    res.locals.user = req.user || null;
    console.log('locals user:' + req.user)
    next();
})



import BaseRouter from './Routes/base.js';
import AddAdminRouter from './Routes/adminAdd.js';
import AuthRouter from './Routes/auth.js';


app.use('/',BaseRouter);
app.use('/addadmin',isUser,AddAdminRouter);
app.use('/auth',AuthRouter);





app.listen(3000,()=>{
    connect();
    console.log('server is running (3000)')
})