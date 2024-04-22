import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import {jwtDecode} from "jwt-decode"

export default function LoggedBar(){
    const navigate = useNavigate()

const loggedUser=jwtDecode(Cookies.get("jwt-cookie")).id    
    return (
            <div className="NavBar">
                <span className="welcome"><img className="logoHIM-navbar" src="./src/assets/logo.jpg"></img>Welcome, {loggedUser}</span>
                <button className="Remove-Button" onClick={()=>{Cookies.remove("jwt-cookie");navigate("/")}}>Logout</button>
            </div>
            )
}