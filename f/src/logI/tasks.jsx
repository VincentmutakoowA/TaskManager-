import { useState, useEffect } from "react";
import './tasks.css'
import NewTask from "./newTask";
import OneTask from "./oneTask";
import axios from "axios";

export default function Tasks() {
    const [tasksList, setTasksList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:8000/user/tasks', { withCredentials: true });
            setTasksList(response.data);
            setError(null);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.log('No tasks found');
                setTasksList([]);
            } else {
                console.error('Error fetching tasks:', err);
                setError('Failed to fetch tasks. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="container1">
                <NewTask onTaskAdded={fetchTasks} />
                {isLoading ? (
                    <p>Loading tasks...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : tasksList.length === 0 ? (
                    <p>You currently have no tasks</p>
                ) : (
                    tasksList.map(task => <OneTask onTaskRemoved={fetchTasks} task={task} key={task.taskId} />)
                )}

            </div>
        </>
    );
}