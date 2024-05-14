import "./App.css"
import LoginForm from "./LoginForm"         // public components
import NotAuthorized from "./NotAuthorized"
import NotFound from "./NotFound"
import CreateUser from "./CreateUser"
import PrivateRoutes from "./utilities/PrivateRoutes"  // private components
import GroceriesApp from "./GroceriesApp"
import InventoryApp from "./InventoryApp"
import { BrowserRouter, Route, Routes } from "react-router-dom"  // to use routing


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path="/not-authorized" element={< NotAuthorized />}/>
        <Route path="/register" element={< CreateUser />}/>
        <Route path="*" element={<NotFound/>}/>
        <Route element={<PrivateRoutes/>}>
                  <Route path="/main" element={<GroceriesApp />}/>
                  <Route path="/addProduct" element={<InventoryApp/>}/>
                  <Route path="/editProduct" element={<InventoryApp/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

      
      
    </>
  );
}

export default App;
