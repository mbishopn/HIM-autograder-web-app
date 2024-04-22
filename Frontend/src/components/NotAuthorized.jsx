import { Link } from "react-router-dom"

export default function NotAuthorized() {

    return (<>
        {/* <h1>You don't have the right credentials to be here</h1>
        Please login first!
        <Link to="/"><button>Login Page</button></Link> */}
        <div className="not-authorized-container">
            <h2 className="not-authorized-title">You are not Authorized to visit this page</h2>
            <p className="not-authorized-message">Please log in first.</p>
            <p className="not-authorized-link"><Link to="/"><button>Back to Login page</button></Link></p>
        </div>
    </>)


}