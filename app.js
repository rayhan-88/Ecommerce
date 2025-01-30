import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import hpp from "hpp";
import helmet from "helmet";
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import {DATABASE, MAX_JSON_SIZE, PORT, REQUEST_TIME, URL_ENCODE, WEB_CACHE} from "./src/config/Config.js";
import router from "./src/routes/api.js";
import path from "path";



export const app = express();
app.use(cors());
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());
app.use(hpp())
app.use(mongoSanitize())
app.use(xss())
app.use(cookieParser())


const limiter = rateLimit({windowMs: REQUEST_TIME,max:REQUEST_TIME});
app.use(limiter)


mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("MongoDB Connected");
}).catch(err=>{
    console.log({'mongodb disconnect':err.toString()});
})

app.set('etag',WEB_CACHE);


app.use('/api',router);

app.use(express.static('client/dist'));

// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})
