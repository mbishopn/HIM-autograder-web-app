import "./App.css";
import LandingPage from "./LandingPage";
import UpdatePassword from "./UpdatePassword";
import LoginUser from "./loginPage";
import ShowAbs from "./ShowAbs";

import { BrowserRouter, Route, Routes } from "react-router-dom"; // to use routing
import { getAbs } from "./utilities/dbFunctions";

const records= await getAbs("faryal","",1,"")


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/main" element={<LandingPage />}/>
          <Route path="/showabstracts" element={<ShowAbs records={records}/>}/>
          <Route path="/updateuserpass" element={<UpdatePassword/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
