import { Router } from 'express';
const userRouter = Router();
import jwt from "npm:jsonwebtoken"
const SECRET_KEY = 'dddffgfkjgfrfdfff'
import { getUser, deleteUser, switchMode, addTask, getTasks, updateTask, deleteTask } from "../db.js";

// Middleware to verify token and extract userID and username
const verifyTokenAndExtractUser = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        req.userId = decoded.userId;
        req.userName = decoded.username;
        next();
    });
};

// GET USER DATA (USER ID AND USERNAME)
userRouter.get('/', verifyTokenAndExtractUser, async (req, res) => {
    const result = await getUser(req.userName);
    if (!result[0]) return res.json({ message: 'No user' });
    res.json({ userId: result[0].userId, username: req.userName, mode: result[0].mode });
});



//SWITCHING COLOR MODE
userRouter.post('/', verifyTokenAndExtractUser, async (req, res) => {
    const context = req.body;
    if (context.context == 'switchMode') {
        try {
            const result = await switchMode(req.userName);
            console.log(result);
            res.send(result[0]);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(400).json({ error: 'Invalid context' });
    }
});

//DELETING USER ACCOUNT

userRouter.delete('/deleteAccount', verifyTokenAndExtractUser, async (req, res) => {
    try {
        const result = await deleteUser(req.userId);
        console.log(result);
        res.cookie('authToken','', {
            httpOnly: true, // Prevents access via JavaScript
            secure: false,   // Ensures the cookie is only sent over HTTPS
            sameSite: 'Strict', // Protects against CSRF
            expires: new Date(0), // Expire immediately
        });
        res.send('User deleted successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});








///////////      TASKS          ///////////////////////////////////////////////
//ADD TASK
userRouter.post('/task', verifyTokenAndExtractUser, async (req, res) => {
    const { taskDescription } = req.body;
    try {
        const result = await addTask(req.userId, taskDescription);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
//DELETE TASK
userRouter.delete('/task', verifyTokenAndExtractUser, async (req, res) => {

    const taskId = req.query.id
    console.log('Task ID', taskId)
    if (!taskId) {
        return res.status(400).json({ error: 'No task ID provided' });
    }
    try {
        const result = await deleteTask(taskId);
        console.log(result);
        res.json(result).status(200);;
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
//UPDATE TASK
userRouter.put('/task', verifyTokenAndExtractUser, async (req, res) => {
    const taskId = req.query.id
    console.log(taskId)
    const description  = req.body.formData;
    console.log(description)
    if (!taskId || !description) {
        return res.status(400).json({ error: 'No task ID or description provided' });
    }
    try {
        const result = await updateTask(taskId, description);
        console.log(result);
        res.json(result).status(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
    });

//GET TASKS
userRouter.get('/tasks/', verifyTokenAndExtractUser, async (req, res) => {
    try {
        const result = await getTasks(req.userId);
        console.log(result);
        if (result[0] == null) {
            return res.status(404).send('No tasks available')
        }
        res.json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})







export default userRouter;