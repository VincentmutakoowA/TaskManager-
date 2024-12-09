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

//////////////////////////////////////////////TO DATABASE
const users = [{username: 'A', password:''}]

const SECRET_KEY = 'dddffgfkjgfrfdfff'

app.get('/', async (req, res )=>{
    res.send('JO')
    console.log('Request W')
})
app.post('/register', async (req, res)=>{
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, username, password: hashedPassword});
    res.json({message: 'Successfully Registered'})
    console.log({ email, username, password: hashedPassword})
})

app.post('/login', async (req, res)=> {
    console.log(req.body)
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (!user) return res.status(400).json({error: 'Invalid credentials'})

    //const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = true;
    if (!isPasswordValid) return res.status(400).json({error: 'Invalid credentials'})

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1hr' });
    res.cookie('authToken', token, {
        httpOnly: true, // Prevents access via JavaScript
        secure: false,   // Ensures the cookie is only sent over HTTPS
        sameSite: 'Strict', // Protects against CSRF
    });
    res.send('Login successful');
})
app.get('/user', (req, res) => {
    
    const token = req.cookies
    console.log(token)

    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token.authToken, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        res.json({ message: 'Protected data', user: decoded });
    });
    
});
app.post('/logout', (req, res) => {
    res.clearCookie('authToken'); // Clear the cookie
    res.json({ message: 'Logout successful' });
});

app.listen(8000)

//const token = req.headers.cookie