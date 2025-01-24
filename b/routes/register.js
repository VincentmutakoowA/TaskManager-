import { Router } from 'express';
const regiserRouter = Router();
import bcrypt from "npm:bcryptjs"
import { addUser } from "../db.js";
import Joi from "npm:joi@17.13.3"

const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email({minDomainSegments: 2}),
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(8).max(50).required(),
})

regiserRouter.post('/', async (req, res) => {

    const { email, username, password } = req.body;
    console.log(email, username, password)
    
    const result = schema.validate({username: username, email: email, password: password}) 
    if(result.error){ res.status(400).json({message: result.error.message}) 
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await addUser(username, email, hashedPassword)
        console.log(result)
        res.json({ message: result })
    } catch (error) {
        console.log(error)
        res.json({ message: 'Internal Error' })
    }
})

export default regiserRouter;
