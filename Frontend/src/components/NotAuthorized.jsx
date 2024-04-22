import { Link } from "react-router-dom"

export default function NotAuthorized() {

    return (<>
        <div className="not-authorized-container">
            <h2 className="not-authorized-title">You are not Authorized to visit this page</h2>
            <p className="not-authorized-message">Please log in first.</p>
            <p className="not-authorized-link"><Link to="/"><button>Back to Login page</button></Link></p>
        </div>
    </>)


}