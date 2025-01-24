/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import moreIcon from '../assets/icons/more.svg'
import editIcon from '../assets/icons/edit.svg'
import deleteIcon from '../assets/icons/delete.svg'
import closeIcon from '../assets/icons/close.svg'

export default function OneTask({ onTaskRemoved, task }) {
    const [updateUiState, setUpdateUiState] = useState(false)
    const [formData, setFormData] = useState(task.description)
    const [option, setOption] = useState('')

    const handleInputChange = (e) => {
        setFormData(e.target.value);
    };

    const switchUpdateUi = () => {
        setUpdateUiState(!updateUiState)
        if (updateUiState) {
            setFormData(task.description) // Reset form data when cancelling edit
        }
    }

    const UpdateUi = (
        <>
            <div className='updateTaskUiMain'>
                <div className='updateTaskUiMainInputArea'>
                    <input type='text'
                        required
                        onChange={handleInputChange}
                        value={formData}
                    ></input>
                </div>
                <div className='updateTaskUiMainOtherArea'>
                    <button className="primary" onClick={updateTask}>Update</button>
                    <div className='moreDiv' onClick={switchUpdateUi}><img src={closeIcon} alt="Edit" /></div>
                </div>
            </div>
        </>
    )

    const options = (
        <>
            <div className='moreDiv' onClick={deleteTask}><img src={deleteIcon} alt="Delete" /></div>
            <div className='moreDiv' onClick={switchUpdateUi}><img src={editIcon} alt="Edit" /></div>
        </>
    )

    function toggleOptions() {
        setOption(option === '' ? options : '')
    }

    function deleteTask() {
        console.log('T : ', task.taskId)
        axios.delete('http://localhost:8000/user/task/', { params: { id: task.taskId }, withCredentials: true })
            .then((response) => {
                console.log(response.data)
                onTaskRemoved()
            })
            .catch((error) => { console.error('Error deleting task:', error) })
    }

    function updateTask() {
        console.log('Updating task', formData);
        axios.put('http://localhost:8000/user/task/', { formData }, {  params: { id: task.taskId }, withCredentials: true })
            .then((response) => {
                console.log(response.data)
                onTaskRemoved()
            })
            .catch((error) => { console.error('Error updating task:', error) })
        switchUpdateUi()
    }

    return (
        <>
            <div className="taskArea">
                <h3></h3>
                {updateUiState ? UpdateUi : <p>{task.description}</p>}
                <div className='options'>{option}
                    <div className='moreDiv' onClick={toggleOptions}><img src={moreIcon} alt="More"></img></div>
                </div>
            </div>
        </>
    )
}
