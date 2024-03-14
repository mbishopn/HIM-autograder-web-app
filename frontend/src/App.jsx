import "./App.css";
import LandingPage from "./LandingPage.jsx";
import UpdatePassword from "./UpdatePassword.jsx";
import LoginUser from "./LoginPage.jsx";
import Grading1 from "./Grading1.jsx";
import Grading2 from "./Grading2.jsx";
import MakeGroup from "./makeGroup.jsx";
import EditGroup from "./EditGroup.jsx";
import CreateUser from "./CreateUser.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom"; // to use routing

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/main" element={<LandingPage />} />
          <Route path="/updateuserpass" element={<UpdatePassword />} />
          <Route path="/grading1" element={<Grading1 />} />
          <Route path="/grading2" element={<Grading2 />} />
          <Route path="/makeGroup" element={<MakeGroup />} />
          <Route path="/editGroup" element={<EditGroup />} />
          <Route path="/createUser" element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
