import "./App.css";
<<<<<<< Updated upstream:frontend/src/App.jsx
=======
import UpdatePassword from "./UpdatePassword";
>>>>>>> Stashed changes:Frontend/src/App.jsx
import LoginUser from "./loginPage";
import LandingPage from "./landingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // to use routing

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
<<<<<<< Updated upstream:frontend/src/App.jsx
=======
          <Route path="/main" element={<LandingPage />} />
          <Route path="/updateuserpass" element={<UpdatePassword />} />
>>>>>>> Stashed changes:Frontend/src/App.jsx
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
