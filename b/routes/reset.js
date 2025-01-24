import jwt from "jsonwebtoken"
import { Router } from 'express';
const resetRouter = Router();
import { resetPassword } from '../db.js';
import bcrypt from "npm:bcryptjs"
import Joi from "npm:joi@17.13.3"
import { sendResetEmail } from "../passwordReset.js";

const schemaEmail = Joi.object({ email: Joi.string().min(6).max(50).required().email({ minDomainSegments: 2 }),})
const schemaResetCode = Joi.object({ resetPasswordCode: Joi.string().min(5).max(5).required() });
const schemaResetPassword = Joi.object({newPassword: Joi.string().min(8).max(50).required()})

const emailCodeKey = 'dkjfddfdnfsnfdf'
const emailAuthedKey = 'gkjjtilbdfkuf456ds'
const code = '23546'

// REQUEST 1:  RETURN TOKEN WITH EMAIL AND CONFIRMATION CODE IN IT //////////////////////////////////////////////////////////////////////////
resetRouter.post('/', async (req, res) => {
  const { email } = req.body
  console.log(email)

  const result = schemaEmail.validate({ email: email })
  if (result.error) {
    res.status(400).json({ message: result.error.message })
    return;
  }

  console.log(email)
  //sendResetEmail()

  const token = jwt.sign({ email: email, code: code }, emailCodeKey, { expiresIn: '2m' });
  res.cookie('emailToken', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'Strict',
  })
  res.send('Email received')
});


// REQUEST 2:   VERIFY SEND CODE AGAINST CODE IN TOKEN BODY . RETURN AUTHORIZATION TOKEN/////////////////////////////////////////////////////////////
resetRouter.post('/auth', async (req, res) => {

  const emailToken = req.cookies
  if (Object.getPrototypeOf(emailToken) === null) return res.status(400).json({ error: 'No token provided' });

  const { email } = req.body
  const code = String(email)

  const result = schemaResetCode.validate({ resetPasswordCode: code })
  if (result.error) return res.status(400).json({ message: result.error.message })


  jwt.verify(emailToken.emailToken, emailCodeKey, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    //res.json({ message: 'Protected data', user: decoded });
    console.log('decoded: ', decoded)
    if (decoded.code !== code) {
      return res.status(401).json({ error: 'Invalid confirmation code' });
    }
    else {
      console.log('Authentication successful')
      const authedUser = jwt.sign({ decoded }, emailAuthedKey, { expiresIn: '2m' })
      res.cookie('authedUser', authedUser, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
      })
      res.cookie('emailToken', '', {
        httpOnly: true, // Prevents access via JavaScript
        secure: false,   // Ensures the cookie is only sent over HTTPS
        sameSite: 'Strict', // Protects against CSRF
        expires: new Date(0), // Expire immediately
      });
      res.send('Correct Authentication Code')
    }
  });
})


// REQUEST 3     CHECK AUTHORIZATION TOKEN AND UPDATE PASSWORD //////////////////////////////////////////////////////////////////
resetRouter.post('/authed', async (req, res) => {

  const authedToken = req.cookies
  if (Object.getPrototypeOf(authedToken) === null) return res.status(403).json({ error: 'No token provided' });

  let emailReturned
  const data = req.body; //PASSWORD
  const password = data.password
  console.log(password)

  const result = schemaResetPassword.validate({ newPassword: password })
  if (result.error) return res.status(400).json({ message: result.error.message })

  jwt.verify(authedToken.authedUser, emailAuthedKey, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' })
    emailReturned = decoded.email
    resetPasswordOne()
  });

  async function resetPasswordOne() {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await resetPassword(emailReturned, hashedPassword)
      console.log('Password reset successfully')

      res.cookie('authedUser', '', {
        httpOnly: true, // Prevents access via JavaScript
        secure: false,   // Ensures the cookie is only sent over HTTPS
        sameSite: 'Strict', // Protects against CSRF
        expires: new Date(0), // Expire immediately
      });
      res.send('Password reset successfully')

    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Internal Error' })
    }
  }
})

const code2 = '23546'

export default resetRouter;