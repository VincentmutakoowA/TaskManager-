import { Router } from 'express';
const logoutRouter = Router();
import bcrypt from "npm:bcryptjs"
import { addUser } from "../db.js";

logoutRouter.get('/', async (req, res) => {
    res.cookie('authToken','', {
        httpOnly: true, // Prevents access via JavaScript
        secure: false,   // Ensures the cookie is only sent over HTTPS
        sameSite: 'Strict', // Protects against CSRF
        expires: new Date(0), // Expire immediately
    });
    res.json({message: 'Logout successful'});
  });  

export default logoutRouter;