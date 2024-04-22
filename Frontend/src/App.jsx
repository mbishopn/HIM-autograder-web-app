import "./App.css";
import LandingPage from "./components/LandingPage";
import LoginUser from "./components/loginPage";
import NotAuthorized from "./components/NotAuthorized"
import PrivateRoutes from "./utilities/PrivateRoutes"  // private components
import NotFound from "./components/NotFound"
import { BrowserRouter, Route, Routes } from "react-router-dom"; // to use routing
import Admin from "./components/Admin";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/not-authorized" element={< NotAuthorized />}/>
          <Route path="*" element={<NotFound/>}/>

            <Route element={<PrivateRoutes/>}>
              <Route path="/main" element={<LandingPage/>} />
              <Route path="/admin" element={<Admin />} />
            </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
