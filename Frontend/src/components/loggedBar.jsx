import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import {jwtDecode} from "jwt-decode"

export default function LoggedBar(){
    const navigate = useNavigate()

const loggedUser=jwtDecode(Cookies.get("jwt-cookie")).id    
  // decodes cookie to get user id

    return (

            <div className="NavBar">
                Wellcome, {loggedUser}
                <button className="Remove-Button" onClick={()=>{Cookies.remove("jwt-cookie");navigate("/")}}>Logout</button>
            </div>
    )
}