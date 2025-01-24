//ENVIRONMENT
const port = Deno.env.get('PORT') || "8000"

import cors from "npm:cors"
const corsOptions = {
    origin: Deno.env.get("APP_FRONT_DOMAIN"),
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  
    optionsSuccessStatus: 204 
};
import cookieParser from 'npm:cookie-parser';

import express from "npm:express@4.21.1"
const app = express()
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json())


//////////////ROUTES //////////////////////////////////
import userRouter from "./routes/user.js"
import regiserRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import logoutRouter from "./routes/logout.js";
import resetRouter from "./routes/reset.js";

const SECRET_KEY = 'dddffgfkjgfrfdfff'

app.use('/register', regiserRouter)
app.use('/login', loginRouter)
app.use('/user', userRouter);
app.use('/logout', logoutRouter)
app.use('/reset', resetRouter);



app.listen(port)