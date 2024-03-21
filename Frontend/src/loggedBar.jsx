import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import {jwtDecode} from "jwt-decode"

export default function LoggedBar(/* {login} */){
    const navigate = useNavigate()
    
const login = jwtDecode(Cookies.get("jwt-cookie")).id  // decodes cookie to get user id

    return (

            <div className="NavBar">
                Wellcome, {login}
                <button className="Remove-Button" onClick={()=>{Cookies.remove("jwt-cookie");navigate("/")}}>Logout</button>
            </div>
    )
}