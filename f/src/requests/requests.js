import axios from "axios";

export function logOut(){
    axios.post('http://localhost:8000/logout')
}