import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <h1>Landing Page</h1>
      <div>
        Welcome to HIM Auto-grader
        <ul>
          <li>
            <Link to="/grading1">Grading</Link>
          </li>
          <li>
            <Link to="/makeGroup">Groups</Link>
          </li>
          <li>
            <Link to="/createUser">Admin Users</Link>
          </li>
          <li>
            <Link to="/">Log Out</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
