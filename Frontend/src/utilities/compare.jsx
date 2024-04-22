import { getAbs } from "./dbFunctions";

//-------------- THIS FUNCTION PERFORMS TEACHERS - STUDENTS ABSTRACTS COMPARISON ------------------------------

export function compareObjectsManually2(t, s) {
  const result = {};
  Object.keys(t).forEach((key) => {
    if (
      key === "zzAbstractLink" ||
      key === "CoderNumberDesc" ||
      key === "ChartNumber" ||
      key === "RegistrationNumber" ||
      key === "codernumber"
    ) {
      result[key] = [key, t[key], s[key], ""]; // the NON-GRADED fields. WE NEED TO REVIEW THIS WITH CLIENT BECAUSE THEY GRADE SOME OF THEM
    } else {
      result[key] = [key, t[key], s[key], t[key] === s[key] ? 1 : 0]; // all the others, assigning 1 point per correct field
    }
  });
  return result;
}

// ---------- THIS FUNCTION GETS ALL ABSTRACTS RELATED TO A TEACHER - STUDENTS, COMPARES THEM AND SENDS THEM BACK ----------
export async function gradeAbstracts(teacher) 
{
  const records = await getAbs(teacher, "", 1, ""); // get the abstracts from API

  // fix patient names by removing extra spaces and uniforming to uppecase
  records.forEach((x) => {
    x["FirstName"] = x["FirstName"].replace(/\s+/g, "").toUpperCase();
    x["LastName"] = x["LastName"].replace(/\s+/g, "").toUpperCase();
  });
  // split records in teacher-students abstracts
  const tAbs = records.filter((x) => x["codernumber"] === "100719"); // teacher's abstracts
  const sAbs = records.filter((x) => x["codernumber"] !== "100719"); // students' abstracts
  // putting students and patients names into arrays to feed dropdown lists in grading2 component
  const students = [
    ...new Set(sAbs.map((x) => x["CoderNumberDesc"].toUpperCase())),
  ];
  const patients = [
    ...new Set(tAbs.map((x) => x["FirstName"] + " " + x["LastName"]).sort()),
  ];

  let gradedAbs = []; // this array will hold all students's abracts once they get graded

  tAbs.forEach((tAb) => {
    // loop through tearchs abstracts to grade all students abstracts
    let sAb = sAbs.filter(
      (x) =>
        x["FirstName"] == tAb["FirstName"] && x["LastName"] == tAb["LastName"]
    );
    sAb.forEach((student) => {
      let result = compareObjectsManually2(tAb, student); // comparing abstracts!
      gradedAbs.push(result);
    });
  });

  const result={gradedAbs,students,patients}  // put all together in an array (abstracts,students and patients)
  return [result]
}
