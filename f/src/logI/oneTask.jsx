
import { useState } from 'react';

export default function OneTask() {

    const options = (<><button className="primary">UPDATE</button>
        <button className="danger-btn">DELETE</button></>)

    const [option, setOption] = useState('')
    
    function toggleOptions(){
      if(option === ''){setOption(options)} else setOption('')
    }

    return (
        <>
            <div className="taskArea">
                <h3></h3>
                <p>Lorem ipsum dolor sit amet consectecto sunt.</p>


                <div className='options'>
                <button className="primary" onClick={toggleOptions}>OPTIONS</button>{option}
                </div>
            </div>
        </>
    )
}
