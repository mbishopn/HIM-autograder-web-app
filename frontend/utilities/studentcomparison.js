// For each key in the teacher's abstract we check if the respective keys matching in students abstract, we check if they match or not with boolean.
// we also calculate  totalGrade by summing up all the values which is true therefore matching. so we get a how much right answers did students gave us

const teacher = {
    // "zzAbstractLink": 77699,
    // "CoderNumberDesc": "Faryal Hakim",
    // "ChartNumber": "KEYER0102",
    // "RegistrationNumber": "0102",
    DispositionDate: "2023-07-28T00:00:00.000Z",
    DispositionTime: "1900-01-01T01:04:00.000Z",
    InstitutionNumberDesc: "ST. LAWRENCE COLLEGE Ambulatory Care",
    LastName: "Aimee",
    FirstName: "Duncan",
    GenderDesc: "Male",
    BirthDate: "1992-04-12T00:00:00.000Z",
    ResponsiblityForPayment: "07",
    PostalCode: "K0H2H0",
    ArrivalModeDesc: "WALK IN",
    ArrivalDate: "2023-07-28T00:00:00.000Z",
    ArrivalTime: "1900-01-01T00:13:00.000Z",
    MISCodeDesc: "General Emergency",
    ContactModeDesc:
      "Visit (Face-To-Face) With Individual Client/Family At Facility",
    AdmitbyAmbulanceDesc: "No Ambulance",
    ReferredFromDesc: "Self/Family",
    TriageLevelDesc: "Urgent",
    TriageDate: "2023-07-28T00:00:00.000Z",
    TriageTime: "1900-01-01T00:14:00.000Z",
    AssessmentDate: "2023-07-28T00:00:00.000Z",
    AssessmentTime: "1900-01-01T00:43:00.000Z",
    DateLeftER: "2023-07-28T00:00:00.000Z",
    TimeLeftER: "1900-01-01T01:04:00.000Z",
    DischargeDispositionDesc:
      "Discharge to private home, condo, apt without support service/referral",
    ReferredToDesc: "Ambulatory Care Service (Facility Based)",
    TransfusionGiven: "N",
    Provider: {
      1: {
        ProviderNumber: "1067",
        ProviderSpecialtyDesc: "Emergency Medicine",
        ProviderTypeDesc: "Most Responsible",
      },
    },
    Diagnosis: {
      1: {
        diagnosiscode: "T23.2  ",
        diagnosistype: "M",
      },
      2: {
        diagnosiscode: "T31.00 ",
      },
      3: {
        diagnosiscode: "X10   ",
        diagnosistype: "9",
      },
      4: {
        diagnosiscode: "U98.5  ",
        diagnosistype: "9",
      },
      5: {
        diagnosiscode: "U99.2  ",
        diagnosistype: "9",
      },
    },
  };
  
  //http://localhost:3000/abstracts?t=hakim&s=1&sn=Bita&p=Duncan
  
  const students = [
    {
      // "zzAbstractLink": 51842,
      // "CoderNumberDesc": "Bita Haghiri",
      // "ChartNumber": "BH220102",
      // "RegistrationNumber": "0102",
      DispositionDate: "2021-07-28T00:00:00.000Z",
      DispositionTime: "1900-01-01T00:56:00.000Z",
      InstitutionNumberDesc: "ST. LAWRENCE COLLEGE Ambulatory Care",
      LastName: "Aimee",
      FirstName: "Duncan",
      GenderDesc: "Male",
      BirthDate: "1992-04-12T00:00:00.000Z",
      ResponsiblityForPayment: "07",
      PostalCode: "K0H2H0",
      ArrivalModeDesc: "WALK IN",
      ArrivalDate: "2021-07-28T00:00:00.000Z",
      ArrivalTime: "1900-01-01T00:13:00.000Z",
      MISCodeDesc: "General Emergency",
      ContactModeDesc:
        "Visit (Face-To-Face) With Individual Client/Family At Facility",
      AdmitbyAmbulanceDesc: "No Ambulance",
      ReferredFromDesc: "Self/Family",
      TriageLevelDesc: "Urgent",
      TriageDate: "2021-07-28T00:00:00.000Z",
      TriageTime: "1900-01-01T00:15:00.000Z",
      AssessmentDate: "2021-07-28T00:00:00.000Z",
      AssessmentTime: "1900-01-01T00:56:00.000Z",
      DateLeftER: "2021-07-28T00:00:00.000Z",
      TimeLeftER: "1900-01-01T01:04:00.000Z",
      DischargeDispositionDesc:
        "Discharge to private home, condo, apt without support service/referral",
      TransfusionGiven: "N",
      Provider: {
        1: {
          ProviderNumber: "1067",
          ProviderSpecialtyDesc: "Emergency Medicine",
          ProviderTypeDesc: "Most Responsible",
        },
      },
      Diagnosis: {
        1: {
          diagnosiscode: "T23.2  ",
          diagnosistype: "M",
        },
        2: {
          diagnosiscode: "T31.00 ",
          diagnosistype: "3",
        },
        3: {
          diagnosiscode: "X12   ",
          diagnosistype: "9",
        },
        4: {
          diagnosiscode: "U98.5  ",
          diagnosistype: "9",
        },
        5: {
          diagnosiscode: "U99.2  ",
          diagnosistype: "9",
        },
      },
    },
    {
      // "zzAbstractLink": 51842,
      // "CoderNumberDesc": "Bita Haghiri",
      // "ChartNumber": "BH220102",
      // "RegistrationNumber": "0102",
      DispositionDate: "2021-07-28T00:00:00.000Z",
      DispositionTime: "1900-01-01T00:56:00.000Z",
      InstitutionNumberDesc: "ST. LAWRENCE COLLEGE Ambulatory Care",
      LastName: "Aim",
      FirstName: "Duncan",
      GenderDesc: "Female",
      BirthDate: "1992-04-12T00:00:00.000Z",
      ResponsiblityForPayment: "07",
      PostalCode: "K0H2H",
      ArrivalModeDesc: "WALK IN",
      ArrivalDate: "2021-07-28T00:00:00.000Z",
      ArrivalTime: "1900-01-01T00:13:00.000Z",
      MISCodeDesc: "General Emergency",
      ContactModeDesc: "",
      AdmitbyAmbulanceDesc: "No Ambulance",
      ReferredFromDesc: "Self/Family",
      TriageLevelDesc: "Urgent",
      TriageDate: "2021-07-28T00:00:00.000Z",
      TriageTime: "1900-01-01T00:15:00.000Z",
      AssessmentDate: "2021-07-28T00:00:00.000Z",
      AssessmentTime: "1900-01-01T00:56:00.000Z",
      DateLeftER: "2021-07-28T00:00:00.000Z",
      TimeLeftER: "1900-01-01T01:04:00.000Z",
      DischargeDispositionDesc:
        "Discharge to private home, condo, apt without support service/referral",
      TransfusionGiven: "N",
      Provider: {
        1: {
          ProviderNumber: "1067",
          ProviderSpecialtyDesc: "Emergency Medicine",
          ProviderTypeDesc: "Most Responsible",
        },
      },
      Diagnosis: {
        1: {
          diagnosiscode: "T23.2  ",
          diagnosistype: "M",
        },
        2: {
          diagnosiscode: "T31.00 ",
          diagnosistype: "3",
        },
        3: {
          diagnosiscode: "X12   ",
          diagnosistype: "9",
        },
        4: {
          diagnosiscode: "U98.5  ",
          diagnosistype: "9",
        },
        5: {
          diagnosiscode: "U99.2  ",
          diagnosistype: "9",
        },
      },
    },
    {
      // "zzAbstractLink": 51842,
      // "CoderNumberDesc": "Bita Haghiri",
      // "ChartNumber": "BH220102",
      // "RegistrationNumber": "0102",
      DispositionDate: "2021-07-28T00:00:00.000Z",
      DispositionTime: "1900-01-01T00:56:00.000Z",
      InstitutionNumberDesc: "ST. LAWRENCE COLLEGE Ambulatory Care",
      LastName: "Aim",
      FirstName: "Duncan",
      GenderDesc: "Female",
      BirthDate: "1992-04-12T00:00:00.000Z",
      ResponsiblityForPayment: "07",
      PostalCode: "K0H2H",
      ArrivalModeDesc: "WALK IN",
      ArrivalDate: "2021-07-28T00:00:00.000Z",
      ArrivalTime: "1900-01-01T00:13:00.000Z",
      MISCodeDesc: "General Emergency",
      ContactModeDesc: "",
      AdmitbyAmbulanceDesc: "No Ambulance",
      ReferredFromDesc: "Self/Family",
      TriageLevelDesc: "Urgent",
      TriageDate: "2021-07-28T00:00:00.000Z",
      TriageTime: "1900-01-01T00:15:00.000Z",
      AssessmentDate: "2021-07-28T00:00:00.000Z",
      AssessmentTime: "1900-01-01T00:56:00.000Z",
      DateLeftER: "2021-07-28T00:00:00.000Z",
      TimeLeftER: "1900-01-01T01:04:00.000Z",
      DischargeDispositionDesc:
        "Discharge to private home, condo, apt without support service/referral",
      TransfusionGiven: "N",
      Provider: {
        1: {
          ProviderNumber: "1067",
          ProviderSpecialtyDesc: "Emergency Medicine",
          ProviderTypeDesc: "Most Responsible",
        },
      },
      Diagnosis: {
        1: {
          diagnosiscode: "T23.2  ",
          diagnosistype: "M",
        },
        2: {
          diagnosiscode: "T31.00 ",
          diagnosistype: "3",
        },
        3: {
          diagnosiscode: "X12   ",
          diagnosistype: "9",
        },
        4: {
          diagnosiscode: "U98.5  ",
          diagnosistype: "9",
        },
        5: {
          diagnosiscode: "U99.2  ",
          diagnosistype: "9",
        },
      },
    },
    {
      // "zzAbstractLink": 51842,
      // "CoderNumberDesc": "Bita Haghiri",
      // "ChartNumber": "BH220102",
      // "RegistrationNumber": "0102",
      DispositionDate: "2021-07-28T00:00:00.000Z",
      DispositionTime: "1900-01-01T00:56:00.000Z",
      InstitutionNumberDesc: "ST. LAWRENCE COLLEGE Ambulatory Care",
      LastName: "Aim",
      FirstName: "Duncan",
      GenderDesc: "Female",
      BirthDate: "1992-04-12T00:00:00.000Z",
      ResponsiblityForPayment: "07",
      PostalCode: "K0H2H",
      ArrivalModeDesc: "WALK IN",
      ArrivalDate: "2021-07-28T00:00:00.000Z",
      ArrivalTime: "1900-01-01T00:13:00.000Z",
      MISCodeDesc: "General Emergency",
      ContactModeDesc: "",
      AdmitbyAmbulanceDesc: "No Ambulance",
      ReferredFromDesc: "Self/Family",
      TriageLevelDesc: "Urgent",
      TriageDate: "2021-07-28T00:00:00.000Z",
      TriageTime: "1900-01-01T00:15:00.000Z",
      AssessmentDate: "2021-07-28T00:00:00.000Z",
      AssessmentTime: "1900-01-01T00:56:00.000Z",
      DateLeftER: "2021-07-28T00:00:00.000Z",
      TimeLeftER: "1900-01-01T01:04:00.000Z",
      DischargeDispositionDesc:
        "Discharge to private home, condo, apt without support service/referral",
      TransfusionGiven: "N",
      Provider: {
        1: {
          ProviderNumber: "1067",
          ProviderSpecialtyDesc: "Emergency Medicine",
          ProviderTypeDesc: "Most Responsible",
        },
      },
      Diagnosis: {
        1: {
          diagnosiscode: "T23.2  ",
          diagnosistype: "M",
        },
        2: {
          diagnosiscode: "T31.00 ",
          diagnosistype: "3",
        },
        3: {
          diagnosiscode: "X12   ",
          diagnosistype: "9",
        },
        4: {
          diagnosiscode: "U98.5  ",
          diagnosistype: "9",
        },
        5: {
          diagnosiscode: "U99.2  ",
          diagnosistype: "9",
        },
      },
    },
    {
      // "zzAbstractLink": 51842,
      // "CoderNumberDesc": "Bita Haghiri",
      // "ChartNumber": "BH220102",
      // "RegistrationNumber": "0102",
      DispositionDate: "2021-07-28T00:00:00.000Z",
      DispositionTime: "1900-01-01T00:56:00.000Z",
      InstitutionNumberDesc: "ST. LAWRENCE COLLEGE Ambulatory Care",
      LastName: "Aim",
      FirstName: "Duncan",
      GenderDesc: "Female",
      BirthDate: "1992-04-12T00:00:00.000Z",
      ResponsiblityForPayment: "07",
      PostalCode: "K0H2H",
      ArrivalModeDesc: "WALK IN",
      ArrivalDate: "2021-07-28T00:00:00.000Z",
      ArrivalTime: "1900-01-01T00:13:00.000Z",
      MISCodeDesc: "General Emergency",
      ContactModeDesc: "",
      AdmitbyAmbulanceDesc: "No Ambulance",
      ReferredFromDesc: "Self/Family",
      TriageLevelDesc: "Urgent",
      TriageDate: "2021-07-28T00:00:00.000Z",
      TriageTime: "1900-01-01T00:15:00.000Z",
      AssessmentDate: "2021-07-28T00:00:00.000Z",
      AssessmentTime: "1900-01-01T00:56:00.000Z",
      DateLeftER: "2021-07-28T00:00:00.000Z",
      TimeLeftER: "1900-01-01T01:04:00.000Z",
      DischargeDispositionDesc:
        "Discharge to private home, condo, apt without support service/referral",
      TransfusionGiven: "N",
      Provider: {
        1: {
          ProviderNumber: "1067",
          ProviderSpecialtyDesc: "Emergency Medicine",
          ProviderTypeDesc: "Most Responsible",
        },
      },
      Diagnosis: {
        1: {
          diagnosiscode: "T23.2  ",
          diagnosistype: "M",
        },
        2: {
          diagnosiscode: "T31.00 ",
          diagnosistype: "3",
        },
        3: {
          diagnosiscode: "X12   ",
          diagnosistype: "9",
        },
        4: {
          diagnosiscode: "U98.5  ",
          diagnosistype: "9",
        },
        5: {
          diagnosiscode: "U99.2  ",
          diagnosistype: "9",
        },
      },
    },
    {
      // "zzAbstractLink": 51842,
      // "CoderNumberDesc": "Bita Haghiri",
      // "ChartNumber": "BH220102",
      // "RegistrationNumber": "0102",
      DispositionDate: "2021-07-28T00:00:00.000Z",
      DispositionTime: "1900-01-01T00:56:00.000Z",
      InstitutionNumberDesc: "ST. LAWRENCE COLLEGE Ambulatory Care",
      LastName: "Aim",
      FirstName: "Duncan",
      GenderDesc: "Female",
      BirthDate: "1992-04-12T00:00:00.000Z",
      ResponsiblityForPayment: "07",
      PostalCode: "K0H2H",
      ArrivalModeDesc: "WALK IN",
      ArrivalDate: "2021-07-28T00:00:00.000Z",
      ArrivalTime: "1900-01-01T00:13:00.000Z",
      MISCodeDesc: "General Emergency",
      ContactModeDesc: "",
      AdmitbyAmbulanceDesc: "No Ambulance",
      ReferredFromDesc: "Self/Family",
      TriageLevelDesc: "Urgent",
      TriageDate: "2021-07-28T00:00:00.000Z",
      TriageTime: "1900-01-01T00:15:00.000Z",
      AssessmentDate: "2021-07-28T00:00:00.000Z",
      AssessmentTime: "1900-01-01T00:56:00.000Z",
      DateLeftER: "2021-07-28T00:00:00.000Z",
      TimeLeftER: "1900-01-01T01:04:00.000Z",
      DischargeDispositionDesc:
        "Discharge to private home, condo, apt without support service/referral",
      TransfusionGiven: "N",
      Provider: {
        1: {
          ProviderNumber: "1067",
          ProviderSpecialtyDesc: "Emergency Medicine",
          ProviderTypeDesc: "Most Responsible",
        },
      },
      Diagnosis: {
        1: {
          diagnosiscode: "T23.2  ",
          diagnosistype: "M",
        },
        2: {
          diagnosiscode: "T31.00 ",
          diagnosistype: "3",
        },
        3: {
          diagnosiscode: "X12   ",
          diagnosistype: "9",
        },
        4: {
          diagnosiscode: "U98.5  ",
          diagnosistype: "9",
        },
        5: {
          diagnosiscode: "U99.2  ",
          diagnosistype: "9",
        },
      },
    },
    {
      // "zzAbstractLink": 51842,
      // "CoderNumberDesc": "Bita Haghiri",
      // "ChartNumber": "BH220102",
      // "RegistrationNumber": "0102",
      DispositionDate: "2021-07-28T00:00:00.000Z",
      DispositionTime: "1900-01-01T00:56:00.000Z",
      InstitutionNumberDesc: "ST. LAWRENCE COLLEGE Ambulatory Care",
      LastName: "Aim",
      FirstName: "Duncan",
      GenderDesc: "Female",
      BirthDate: "1992-04-12T00:00:00.000Z",
      ResponsiblityForPayment: "07",
      PostalCode: "K0H2H",
      ArrivalModeDesc: "WALK IN",
      ArrivalDate: "2021-07-28T00:00:00.000Z",
      ArrivalTime: "1900-01-01T00:13:00.000Z",
      MISCodeDesc: "General Emergency",
      ContactModeDesc: "",
      AdmitbyAmbulanceDesc: "No Ambulance",
      ReferredFromDesc: "Self/Family",
      TriageLevelDesc: "Urgent",
      TriageDate: "2021-07-28T00:00:00.000Z",
      TriageTime: "1900-01-01T00:15:00.000Z",
      AssessmentDate: "2021-07-28T00:00:00.000Z",
      AssessmentTime: "1900-01-01T00:56:00.000Z",
      DateLeftER: "2021-07-28T00:00:00.000Z",
      TimeLeftER: "1900-01-01T01:04:00.000Z",
      DischargeDispositionDesc:
        "Discharge to private home, condo, apt without support service/referral",
      TransfusionGiven: "N",
      Provider: {
        1: {
          ProviderNumber: "1067",
          ProviderSpecialtyDesc: "Emergency Medicine",
          ProviderTypeDesc: "Most Responsible",
        },
      },
      Diagnosis: {
        1: {
          diagnosiscode: "T23.2  ",
          diagnosistype: "M",
        },
        2: {
          diagnosiscode: "T31.00 ",
          diagnosistype: "3",
        },
        3: {
          diagnosiscode: "X12   ",
          diagnosistype: "9",
        },
        4: {
          diagnosiscode: "U98.5  ",
          diagnosistype: "9",
        },
        5: {
          diagnosiscode: "U99.2  ",
          diagnosistype: "9",
        },
      },
    },
    {
      // "zzAbstractLink": 51842,
      // "CoderNumberDesc": "Bita Haghiri",
      // "ChartNumber": "BH220102",
      // "RegistrationNumber": "0102",
      DispositionDate: "2021-07-28T00:00:00.000Z",
      DispositionTime: "1900-01-01T00:56:00.000Z",
      InstitutionNumberDesc: "ST. LAWRENCE COLLEGE Ambulatory Care",
      LastName: "Aim",
      FirstName: "Duncan",
      GenderDesc: "Female",
      BirthDate: "1992-04-12T00:00:00.000Z",
      ResponsiblityForPayment: "07",
      PostalCode: "K0H2H",
      ArrivalModeDesc: "WALK IN",
      ArrivalDate: "2021-07-28T00:00:00.000Z",
      ArrivalTime: "1900-01-01T00:13:00.000Z",
      MISCodeDesc: "General Emergency",
      ContactModeDesc: "",
      AdmitbyAmbulanceDesc: "No Ambulance",
      ReferredFromDesc: "Self/Family",
      TriageLevelDesc: "Urgent",
      TriageDate: "2021-07-28T00:00:00.000Z",
      TriageTime: "1900-01-01T00:15:00.000Z",
      AssessmentDate: "2021-07-28T00:00:00.000Z",
      AssessmentTime: "1900-01-01T00:56:00.000Z",
      DateLeftER: "2021-07-28T00:00:00.000Z",
      TimeLeftER: "1900-01-01T01:04:00.000Z",
      DischargeDispositionDesc:
        "Discharge to private home, condo, apt without support service/referral",
      TransfusionGiven: "N",
      Provider: {
        1: {
          ProviderNumber: "1067",
          ProviderSpecialtyDesc: "Emergency Medicine",
          ProviderTypeDesc: "Most Responsible",
        },
      },
      Diagnosis: {
        1: {
          diagnosiscode: "T23.2  ",
          diagnosistype: "M",
        },
        2: {
          diagnosiscode: "T31.00 ",
          diagnosistype: "3",
        },
        3: {
          diagnosiscode: "X12   ",
          diagnosistype: "9",
        },
        4: {
          diagnosiscode: "U98.5  ",
          diagnosistype: "9",
        },
        5: {
          diagnosiscode: "U99.2  ",
          diagnosistype: "9",
        },
      },
    },
  ];
  
  
  
  function compareObjectsManually2(t, s) {
    const result = {};
    Object.keys(t).forEach((key) => {
      result[key] = t[key] === s[key];
      // console.log(`${key}, ${t[key]}, ${s[key]}, ${t[key] === s[key]}`); // loging comparison
    });
    return result;
  }
  
  
  
  
  export function compareAllStudents(studentsAbstracts) {
    const results = [];
    studentsAbstracts.forEach((student) => {
      const result = compareObjectsManually2(teacher, student);
      result["totalGrade"] = Object.values(result).reduce(
        (total, value) => total + value,
        0
      );
      results.push(result);
    });
    return results;
  }
  
  console.log("-------------------------------------------")
  const comparisonFinalResults = compareAllStudents(students)
  
  
  // 
  comparisonFinalResults.forEach((result, index) => {
    console.log(`Comparison Result ${index + 1}:`);
    Object.entries(result).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
    console.log("--------------------------------------");
  });
  