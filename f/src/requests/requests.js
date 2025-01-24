import axios from "axios";

export function ModeSwitch(){
    axios.post('http://localhost:8000/user', { context: 'switchMode' } , { withCredentials: true })
}