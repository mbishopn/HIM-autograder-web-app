import "./App.css";
import LandingPage from "./LandingPage";
import UpdatePassword from "./UpdatePassword";
import LoginUser from "./loginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // to use routing

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/main" element={<LandingPage />}/>
          <Route path="/updateuserpass" element={<UpdatePassword/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
