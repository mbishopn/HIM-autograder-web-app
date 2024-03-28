function compareObjectsManually2(t, s) {
    const result = {};
    Object.keys(t).forEach((key) => {
    if(key==='zzAbstractLink'||key==='CoderNumberDesc'||key==='ChartNumber'||key==='RegistrationNumber'||key==='codernumber')
    {
        result[key]=s[key]
    }
    else{
            //  result['teacher'][key]=t[key]
            //  result['student'][key]=s[key]
            //  result[key]['teacher']=t[key]
            //  result[key]['student']=s[key]
            //  result[key] = {f1_teacher:t[key], f2_student:s[key], f3_mark:t[key] === s[key]?1:0}; 
            result[key] = [t[key], s[key],t[key] === s[key]?1:0];
    }

      // console.log(`${key}, ${t[key]}, ${s[key]}, ${t[key] === s[key]}`); // loging comparison
    });
    return result;
  }
  
  
  
  
  export function compareAllStudents(teacher, studentsAbstracts) {
    const results = [];
    studentsAbstracts.forEach((student) => {
      const result = compareObjectsManually2(teacher, student);
      result["totalGrade"] = Object.values(result).reduce(
        (total, value) => total + value,0);
      results.push(result);
    });
    return results;
  }
  
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
  