import cors from "npm:cors"
const corsOptions = {
    origin: 'http://localhost:5173',  // Set your frontend domain
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Allow cookies and authorization headers
    optionsSuccessStatus: 204  // Default status code for successful OPTIONS responses
};
import jwt from "npm:jsonwebtoken"
import bcrypt from "npm:bcryptjs"
import cookieParser from 'npm:cookie-parser';

import express from "npm:express@4.21.1"
const app = express()
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json())

//  DATABASE BEGIN /////////////////////////////////////
import { getUser, addUser } from "./db.js";
// DATABASE END ////////////////////////////////////////

const SECRET_KEY = 'dddffgfkjgfrfdfff'

app.get('/', async (req, res) => {
    res.send('JO')
    console.log('Request W')
})
app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await addUser(username, email, hashedPassword)
        console.log(result)
        res.json({ message: result })
    } catch (error) {
        console.log(error)
        res.json({message: 'Internal Error'})
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let userData;
    try {
        userData = await getUser(username)
        console.log(userData[0].passwordHash)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: 'Na: Invalid credentials' })
    }
    const isPasswordValid = await bcrypt.compare(password, userData[0].passwordHash);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1hr' });
    res.cookie('authToken', token, {
        httpOnly: true, // Prevents access via JavaScript
        secure: false,   // Ensures the cookie is only sent over HTTPS
        sameSite: 'Strict', // Protects against CSRF
    });
    res.send('Login successful');
})

app.get('/user', async (req, res) => {
    const token = req.cookies
    console.log(token)
    if (!token) return res.status(403).json({ error: 'No token provided' });
    jwt.verify(token.authToken, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        //res.json({ message: 'Protected data', user: decoded });
    });
    const result = await getUser('B')
    console.log(result)
    res.json(result)
});
app.post('/logout', (req, res) => {
    res.clearCookie('authToken'); // Clear the cookie
    res.json({ message: 'Logout successful' });
});

app.listen(8000)

//const token = req.headers.cookie