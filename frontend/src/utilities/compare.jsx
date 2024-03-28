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
