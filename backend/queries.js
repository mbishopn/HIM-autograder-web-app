// returns teachers names --------------------------------------------------------------------------------
usersQry = (x) => {
  let qry=""
  switch (x){
      case '1':  // selects users from auxiliary db
        qry = "select username from users order by username;"
      break
      case '2':  // to import new users from med2020, gets all users with abstracts
        qry="insert into development_usercred.dbo.users (qryname, username) select med2020users.codernumberdesc, med2020users.username" +
        " from (SELECT distinct a.codernumberdesc, bb.username FROM slcv3.dbo.i10_amcare_vr a, " +
        "(select b.userdescription, c.username from slcv3.dbo.user_profile b, slcv3.dbo.USER_Authenticate c where b.usercode='100719' and b.recordid=c.recordid) bb where a.codernumberdesc=bb.userdescription) med2020users " +
        "where med2020users.username collate DATABASE_DEFAULT not in (select username from DEVELOPMENT_USERCRED.dbo.users)"
       break
  }
  return qry
}

// returns groups created by teachers ------------------------------------------------------------------
groupsQry= (teacher, option,groups='') =>{
  console.log(teacher + " -" + option + " - " + groups)
  switch (option){
    case '1':
      qry= "select groups from groups where username='"+teacher+"'"
    break
    case '2':
      qry= "insert into groups(username,groups) values('" + teacher +"','" + groups + "') "
    break
    case '3':
      qry= "update groups set groups='" + groups + "' where username='" + teacher + "'"
    break
  }
  
  return qry
}

// returns student names --------------------------------------------------------------------------------
studentsQry = () => {
  qry =
    "select distinct codernumberdesc as studentName from i10_amcare_vr" +
    " where codernumberdesc!=''" +
    " and codernumber not in ('100719','100664','100667','100835','100665','100748','1','2','4','55555','77777','88888','99999','100000','100001')" +
    " and IsAbstractDeleted='n'" +
    " order by codernumberdesc"
  return qry
};

// returns abtracts for teachers and students according to parameters passed
const abstractsQry = (teacher, pacient, iStu, sName) => {
  qry =
    "select distinct a.zzAbstractLink,a.CoderNumberDesc,a.codernumber," +
    //  /*  ------- abstract headers -------*/
    "a.ChartNumber,a.RegistrationNumber,a.DispositionDate,convert(char(5),convert(time,a.DispositionTime)) as DispositionTime," +
    "a.DispositionTimeUnknown,a.InstitutionNumberDesc,a.LastName,a.FirstName,a.GenderDesc," +
    "a.BirthDate,a.ResponsiblityForPayment,a.PostalCode,a.ArrivalModeDesc,a.ArrivalDate," +
    "convert(char(5),convert(time,a.ArrivalTime)) as ArrivalTime,a.InstitutionFromDesc,a.MISCodeDesc,a.ContactModeDesc,a.AdmitbyAmbulanceDesc," +
    "a.AmbulanceArrivalDate,convert(char(5),convert(time,a.AmbulanceArrivalTime)) as AmbulanceArrivalTime," +
    "a.AmbulanceArrivalTimeUnknown," +
    "a.AmbulanceTransferCareDate,convert(char(5),convert(time,a.AmbulanceTransferCareTime)) as AmbulanceTransferCareTime," +
    "a.AmbulanceTransferCareTimeUnknown,a.ReferredFromDesc,a.TriageLevelDesc," +
    "a.TriageDate,convert(char(5),convert(time,a.TriageTime)) as TriageTime," +
    "a.TriageTimeUnknown,a.AssessmentDate," +
    "convert(char(5),convert(time,a.AssessmentTime)) as AssessmentTime,a.AssessmentTimeUnknown," +
    "a.DateLeftER,convert(char(5),convert(time,a.TimeLeftER)) as TimeLeftER," +
    "a.TimeLeftERUnknown,a.DischargeDispositionDesc,a.ReferredToDesc,a.InstitutionToDesc," +
    /*------------ other fields -------------*/
    " a.TransfusionGiven,a.RedBloodCell,a.Platelets,a.Plasma,a.Albumin,a.OtherBlood,a.AutoTransfusion," +
    //  /*  ------- abstract consult -------*/
    " c.ConsultOccurrence,c.Consultnumberdesc,c.ConsultServiceDesc,c.ConsultRequestDate," +
    " convert(char(5),convert(time,c.ConsultRequestTime)) as ConsultRequestTime,c.ConsultArrivalTimeUnknown," +
    " c.ConsultArrivalDate,convert(char(5),convert(time,c.ConsultArrivalTime)) as ConsultArrivalTime, " +
    //  /*  ------- abstract providers -------*/
    " p.ProviderOccurrence,p.ProviderNumber,p.ProviderSpecialtyDesc,p.ProviderTypeDesc," +
    //  /*  ------- abstract diagnosis -------*/
    " d.DiagnosisOccurrence,d.diagnosisprefix,d.diagnosiscode,d.diagnosissuffix,d.diagnosistype," +
    //  /*  ------- abstract intervention -------*/
    " i.InterventionOccurrence,i.InterventionDate,i.InterventionCode,i.InterventionSuffixDesc," +
    " i.InterventionAttributeStatus,i.InterventionAttributeLocation,i.InterventionAttributeExtent," +
    " i.InterventionProviderNumberDesc,i.InterventionProviderSpecialty,i.IntervDateIn," +
    " convert(char(5),convert(time,i.InterventionTimeIn)) as InterventionTimeIn,i.IntervDateOut," +
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
    " order by CoderNumberDesc, firstname, lastname, zzabstractlink"

  return qry
}

module.exports = { abstractsQry, studentsQry, usersQry, groupsQry }
