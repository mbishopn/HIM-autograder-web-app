import "./App.css";
import LandingPage from "./LandingPage";
import UpdatePassword from "./UpdatePassword";
import Grading1 from "./grading1";
import Grading2 from "./grading2";
import LoginUser from "./loginPage";
import MakeGroup from "./makeGroup.jsx";
import EditGroup from "./editGroup";
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
          <Route path="/makeGroup" element={<makeGroup/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
