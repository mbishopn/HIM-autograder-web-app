import "./App.css";
import LoginUser from "./loginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // to use routing

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
