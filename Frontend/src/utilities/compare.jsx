import { getAbs } from "./dbFunctions";

// once we get the custom grading array, we should apply it here
// I think we must allow custom grading template by group/pacient

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

/*------------ BY NOW I'M PUTTING THIS HERE BUT IT SHOULD BE ON FUNCTIONS LIBRARY */
export async function gradeAbstracts(teacher) 
{
  const records = await getAbs(teacher, "", 1, ""); // get the abstracts from API
  // console.log(records);
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
  // console.log(gradedAbs);
  const result={gradedAbs,students,patients}
  return [result]
}

/*--------------------------------------------------------------------------------*/

/// -------------------------- NO USED ANYMORE, MOVED THE LOGIC OUTSIDE, BY NOW IN APP.JSX ------------
// export function compareAllStudents(teacher, studentsAbstracts) {
//   //const results = [];
//   studentsAbstracts.forEach((student) => {
//     const result = compareObjectsManually2(teacher, student);
//     // result["totalGrade"] = Object.values(result).reduce(
//     //   (total, value) => total + value,0);
//     // results.push(result);
//     return result;
//   });
//   //return results;
// }

//   console.log("-------------------------------------------")
//   const comparisonFinalResults = compareAllStudents(students)

//
//   comparisonFinalResults.forEach((result, index) => {
//     console.log(`Comparison Result ${index + 1}:`);
//     Object.entries(result).forEach(([key, value]) => {
//       console.log(`${key}: ${value}`);
//     });
//     console.log("--------------------------------------");
//   });
