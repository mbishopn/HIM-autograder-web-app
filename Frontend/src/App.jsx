import "./App.css";
import LandingPage from "./LandingPage";
import UpdatePassword from "./UpdatePassword";
import LoginUser from "./loginPage";
import ShowAbs from "./ShowAbs";
import Grading1 from "./Grading1";
import MakeGroup from "./MakeGroup";
import EditGroup from "./editGroup";
import CreateUser from "./CreateUser.jsx";
import Grading2 from "./Grading2";

import { BrowserRouter, Route, Routes } from "react-router-dom"; // to use routing
import { getAbs } from "./utilities/dbFunctions";

/*------------ BY NOW I'M PUTTING THIS HERE BUT IT SHOULD BE ON FUNCTIONS LIBRARY */
const records = await getAbs("faryal", "", 1, "");
const students = [
  ...new Set(records.map((x) => x["CoderNumberDesc"].toUpperCase())),
];
const pacients = [
  ...new Set(
    records
      .map(
        (x) =>
          x["FirstName"].replace(/\s+/g, "").toUpperCase() +
          " " +
          x["LastName"].replace(/\s+/g, "").toUpperCase()
      )
      .sort()
  ),
];

const tAbs = records.filter((x) => x["codernumber"] == "100719");
const sAbs = records.filter((x) => x["codernumber"] != "100719");
// console.log(tAbs);
// console.log(sAbs);
let sAb = sAbs[0];
tAbs.forEach((tAb) => {
  let sAb = sAbs.filter(
    (x) =>
      x["FirstName"] == tAb["FirstName"] && x["LastName"] == tAb["LastName"]
  );
  console.log(sAb);
});

// hola
/*--------------------------------------------------------------------------------*/
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/main" element={<LandingPage />} />
          <Route
            path="/showabstracts"
            element={<ShowAbs records={records} />}
          />
          <Route path="/updateuserpass" element={<UpdatePassword />} />
          <Route path="/grading1" element={<Grading1 />} />
          <Route path="/makeGroup" element={<MakeGroup />} />
          <Route path="/editGroup" element={<EditGroup />} />
          <Route path="/createUser" element={<CreateUser />} />

          <Route
            path="/grading2"
            element={
              <Grading2
                tAbs={tAbs}
                sAb={sAb}
                students={students}
                pacients={pacients}
                records={records}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
