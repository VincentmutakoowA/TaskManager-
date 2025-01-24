/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const NewTask = ({ onTaskAdded }) => {

    const [taskDescription, setTaskDescription] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const popupRef = useRef(null);

    const togglePopup = () => {
        setIsVisible((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(taskDescription)
            await axios.post('http://localhost:8000/user/task', {taskDescription}, {withCredentials: true})
            .then(() => {
                setTaskDescription('');
                setIsVisible(false);
                console.log('Task added successfully')
                onTaskAdded()
            })
            .catch((error) => {
                console.log(error)
            })
    };

    return (
        <div>
            <div className='headerTitle'>
                <button onClick={togglePopup} className='primary'>+ New Task</button>
            </div>

            {isVisible && (
                <div  className='newTaskAreaMain'>
                    <div ref={popupRef} className="newTaskArea">
                        <h3>Add New Task</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="taskInput">
                                <label>Task: </label>
                                <input 
                                    type="text"
                                    name="taskName" 
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                    required 
                                />
                            </div>
                            <div>
                                
                            </div>
                        </form>
                        <button onClick={handleSubmit} type="submit" className="primary">Add Task</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewTask;
