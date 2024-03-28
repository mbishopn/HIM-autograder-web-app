import "./App.css";
import LandingPage from "./LandingPage";
import UpdatePassword from "./UpdatePassword";
import LoginUser from "./loginPage";
import ShowAbs from "./ShowAbs";
import Grading2 from "./Grading2";

import { BrowserRouter, Route, Routes } from "react-router-dom"; // to use routing
import { getAbs } from "./utilities/dbFunctions";
import { compareObjectsManually2 } from "./utilities/compare";

/*------------ BY NOW I'M PUTTING THIS HERE BUT IT SHOULD BE ON FUNCTIONS LIBRARY */
const records = await getAbs("bailey", "", 1, ""); // get the abstracts from API
console.log(records);
// fix pacient names by removing extra spaces and uniforming to uppecase
records.forEach((x) => {
  x["FirstName"] = x["FirstName"].replace(/\s+/g, "").toUpperCase();
  x["LastName"] = x["LastName"].replace(/\s+/g, "").toUpperCase();
});
// split records in teacher-students abstracts
const tAbs = records.filter((x) => x["codernumber"] === "100719"); // teacher's abstracts
const sAbs = records.filter((x) => x["codernumber"] !== "100719"); // students' abstracts
// putting students and pacients names into arrays to feed dropdown lists in grading2 component
const students = [
  ...new Set(sAbs.map((x) => x["CoderNumberDesc"].toUpperCase())),
];
const patients = [
  ...new Set(tAbs.map((x) => x["FirstName"] + " " + x["LastName"]).sort()),
];

console.log(patients.length + " patients");
console.log(students.length + " students");
console.log(tAbs);
console.log(sAbs);

let gradedAbs = []; // this array will hold all students's abracts once they get graded

tAbs.forEach((tAb) => {
  // loop through tearchs abstracts to grade all students abstracts
  let sAb = sAbs.filter(
    (x) =>
      x["FirstName"] == tAb["FirstName"] && x["LastName"] == tAb["LastName"]
  );
  sAb.forEach((student) => {
    let result = compareObjectsManually2(tAb, student);
    gradedAbs.push(result);
  });
});
console.log(gradedAbs);

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
          {/* <Route path="/grading2" element={<Grading2 sAbs={sAbs} tAbs={tAbs} students={students} pacients={pacients} records={records}/>} /> */}
          <Route
            path="/grading2"
            element={
              <Grading2
                gradedAbs={gradedAbs}
                students={students}
                patients={patients}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
