import React, { useState, useRef, useEffect } from 'react';

const NewTask = () => {
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

    return (
        <div>
            <div className='headerTitle'>
                <button onClick={togglePopup} className='primary'>+ New Task</button>
            </div>

            {isVisible && (
                <div ref={popupRef} className='newTaskAreaMain'>

                    <div className="newTaskArea">
                        <h3>Add New Task</h3>
                        <form>
                            <div className="taskInput">
                                <label>Task: </label>
                                <input type="text" name="taskName" required />
                            </div>

                            <div>
                                <button type="submit" className="primary">Add Task</button>
                            </div>
                        </form>
                    </div>

                </div>
            )}
        </div>
    );
};

export default NewTask;
