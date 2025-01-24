import Navbar from "./navbar"
import './hero.css'
import hero1 from "../assets/hero.svg"

// eslint-disable-next-line react/prop-types
export default function Hero({setAuthForm}) {

    return (
        <>
            <Navbar />
            <div className="mainContainer">
                <div className="imageContainer">
                    <img src={hero1}></img>
                    <button className="primary" onClick={setAuthForm}>GET STARTED</button>
                </div>
                <p>App by : Vincent Mutakoowa</p>
            </div>
        </>
    )
}
