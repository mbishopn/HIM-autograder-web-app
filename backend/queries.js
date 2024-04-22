// returns teachers names
usersQry = (x) => {
  let qry=""
  switch (x){
      case '1':  // selects users from auxiliary db
        qry = "select username from users;"
      break;
      case '2':  // to import new users from med2020, gets all users with abstracts
        qry="select distinct a.codernumberdesc, bb.UserName from i10_amcare_vr a,"+
        " (select b.usercode, b.recordid, b.UserDescription,c.username from user_profile b, user_authenticate c"+
        " where b.usercode='100719' and b.RecordID=c.RecordID) bb where a.codernumberdesc=bb.userdescription"
  }


    // "select distinct codernumberdesc from i10_amcare_vr where codernumber!='' and codernumber='100719' and isAbstractdeleted='n' order by codernumberdesc";
  return qry;
};

// returns student names
studentsQry = () => {
  qry =
    "select distinct codernumberdesc as studentName from i10_amcare_vr" +
    " where codernumberdesc!=''" +
    " and codernumber not in ('100719','100664','100667','100835','100665','100748','1','2','4','55555','77777','88888','99999','100000','100001')" +
    " and IsAbstractDeleted='n'" +
    " order by codernumberdesc";
  return qry;
};

// returns abtracts for teachers and students according to parameters passed
const abstractsQry = (teacher, pacient, iStu, sName) => {
  // console.log(teacher+"-"+pacient+"-"+student)
  qry =
    "select distinct a.zzAbstractLink,a.CoderNumberDesc,a.codernumber," +
    //  /*  ------- abstract headers -------*/
    "a.ChartNumber,a.RegistrationNumber,convert(date,a.DispositionDate) as DispositionDate,convert(char(5),convert(time,a.DispositionTime)) as DispositionTime," +
    "a.DispositionTimeUnknown,a.InstitutionNumberDesc,a.LastName,a.FirstName,a.GenderDesc," +
    "convert(date,a.BirthDate) as BirthDate,a.ResponsiblityForPayment,a.PostalCode,a.ArrivalModeDesc,convert(date,a.ArrivalDate) as ArrivalDate," +
    "convert(char(5),convert(time,a.ArrivalTime)) as ArrivalTime,a.InstitutionFromDesc,a.MISCodeDesc,a.ContactModeDesc,a.AdmitbyAmbulanceDesc," +
    "convert(date,a.AmbulanceArrivalDate) as AmbulanceArrivalDate,convert(char(5),convert(time,a.AmbulanceArrivalTime)) as AmbulanceArrivalTime," +
    "a.AmbulanceArrivalTimeUnknown," +
    "convert(date,a.AmbulanceTransferCareDate) as AmbulanceTransferCareDate,convert(char(5),convert(time,a.AmbulanceTransferCareTime)) as AmbulanceTransferCareTime," +
    "a.AmbulanceTransferCareTimeUnknown,a.ReferredFromDesc,a.TriageLevelDesc," +
    "convert(date,a.TriageDate) as TriageDate,convert(char(5),convert(time,a.TriageTime)) as TriageTime," +
    "a.TriageTimeUnknown,convert(date,a.AssessmentDate) as AssessmentDate," +
    "convert(char(5),convert(time,a.AssessmentTime)) as AssessmentTime,a.AssessmentTimeUnknown," +
    "convert(date,a.DateLeftER) as DateLeftER,convert(char(5),convert(time,a.TimeLeftER)) as TimeLeftER," +
    "a.TimeLeftERUnknown,a.DischargeDispositionDesc,a.ReferredToDesc,a.InstitutionToDesc," +
    /*------------ other fields -------------*/
    " a.TransfusionGiven,a.RedBloodCell,a.Platelets,a.Plasma,a.Albumin,a.OtherBlood,a.AutoTransfusion," +
    //  /*  ------- abstract consult -------*/
    " c.ConsultOccurrence,c.Consultnumberdesc,c.ConsultServiceDesc,convert(date,c.ConsultRequestDate) as ConsultRequestDate," +
    " convert(char(5),convert(time,c.ConsultRequestTime)) as ConsultRequestTime,c.ConsultArrivalTimeUnknown," +
    " convert(date,c.ConsultArrivalDate) as ConsultArrivalDate,convert(char(5),convert(time,c.ConsultArrivalTime)) as ConsultArrivalTime, " +
    //  /*  ------- abstract providers -------*/
    " p.ProviderOccurrence,p.ProviderNumber,p.ProviderSpecialtyDesc,p.ProviderTypeDesc," +
    //  /*  ------- abstract diagnosis -------*/
    " d.DiagnosisOccurrence,d.diagnosisprefix,d.diagnosiscode,d.diagnosissuffix,d.diagnosistype," +
    //  /*  ------- abstract intervention -------*/
    " i.InterventionOccurrence,convert(date,i.InterventionDate) as InterventionDate,i.InterventionCode,i.InterventionSuffixDesc," +
    " i.InterventionAttributeStatus,i.InterventionAttributeLocation,i.InterventionAttributeExtent," +
    " i.InterventionProviderNumberDesc,i.InterventionProviderSpecialty,convert(date,i.IntervDateIn) as IntervDateIn," +
    " convert(char(5),convert(time,i.InterventionTimeIn)) as InterventionTimeIn,convert(date,i.IntervDateOut) as IntervDateOut," +
    " convert(char(5),convert(time,i.InterventionTimeOut)) as InterventionTimeOut,i.InterventionLocation,i.AnesthetistIDDesc,i.AnestheticTechniqueDesc" +
    " from i10_Amcare_vr a " +
    " join i10_amcare_and_consult_vr c on a.zzAbstractlink=c.zzabstractlink and a.CoderNumber=c.codernumber and a.FullName=c.FullName " +
    " join i10_amcare_and_provider_vr p on a.zzAbstractLink=p.zzAbstractLink and a.CoderNumber=p.CoderNumber and a.FullName=p.FullName " +
    " join i10_amcare_and_diagnosis_vr d on a.zzAbstractLink=d.zzAbstractLink and a.CoderNumber=d.CoderNumber and a.FullName=d.FullName " +
    " join I10_Amcare_And_Intervention_VR i on a.zzAbstractLink=i.zzAbstractLink and a.CoderNumber=i.CoderNumber and a.FullName=i.FullName " +
    " where a.IsAbstractDeleted='n'" +
    //  " /*and a.CoderNumber='100719'*/"+
    " and a.CoderNumber not in ('100664','100667','100835','100665','100748','1','2','4','55555','77777','88888','99999','100000','100001') " +
    " and a.codernumberdesc !=''" +
    // //  --and a.ChartNumber like '%33501%'
    // //  --and a.DischargeDisposition in ('06','07')
    (pacient !== "" ? " and a.FullName like '%" + pacient + "%'" : " ") +
    // //  --and zzAbstractLink>=69841
    (iStu && teacher != ""
      ? " and a.codernumberdesc not in(select distinct codernumberdesc from i10_amcare_vr where codernumber='100719' and codernumberdesc not like '%" +
        teacher +
        "%')" +
        " and a.fullname in (select distinct fullname from i10_amcare_vr where codernumber!='' and IsAbstractDeleted='n' and codernumberdesc like '%" +
        teacher +
        "%')"
      : "") +
    " " +
    (iStu
      ? sName !== ""
        ? " and a.codernumberdesc like '%" + sName + "%' "
        : " "
      : " and a.codernumber='100719' and a.CoderNumberDesc like '%" +
        teacher +
        "%'") +
    " order by CoderNumberDesc, firstname, lastname, zzabstractlink";

  return qry;
};

module.exports = { abstractsQry, studentsQry, usersQry };
