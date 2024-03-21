export default function LandingPage() {
  return (
    <>
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
          }

          h1 {
            text-align: center;
            margin-top: 50px;
          }

          div {
            text-align: center;
            margin-top: 20px;
          }

          ul {
            list-style-type: none;
            padding: 0;
          }

          li {
            margin-top: 10px;
          }
        `}
      </style>
      <h1>Landing Page</h1>
      <div>
        Welcome to HIM Auto-grader
        <ul>
          <li>Grading</li>
          <li>Groups</li>
          <li>Admin Users</li>
          <li>Exit</li>
        </ul>
      </div>
    </>
  );
}
