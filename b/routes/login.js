const SECRET_KEY = 'dddffgfkjgfrfdfff'

import { Router } from 'express';
const loginRouter = Router();
import bcrypt from "npm:bcryptjs"
import jwt from "npm:jsonwebtoken"
import { getUser } from '../db.js';
import Joi from "npm:joi@17.13.3"

const schema = Joi.object({
    username: Joi.string().max(50).required(),
    password: Joi.string().max(50).required(),
})

loginRouter.post('/', async (req, res) => {

    const { username, password } = req.body;

    const result = schema.validate({username: username, password: password}) 
    if(result.error){ res.status(400).json({message: result.error.message}) 
        return;
    }

    let userData;
    try {
        userData = await getUser(username)
        if(userData == null) return res.status(400).json({message: 'Invalid username or password'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mesasage: 'Internal Server Error' })
    }
    const isPasswordValid = await bcrypt.compare(password, userData[0].passwordHash);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ userId: userData[0].userId ,username }, SECRET_KEY, { expiresIn: '1hr' });
    res.cookie('authToken', token, {
        httpOnly: true, 
        secure: false,  
        sameSite: 'Strict',
    });
    res.send('Login successful');
})

export default loginRouter;