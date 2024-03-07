 const abstractsqry =(teacher, pacient, student)=>{
    qry=
    "select distinct a.zzAbstractLink,a.CoderNumberDesc,"+
//  /*  ------- abstract headers -------*/
     "a.ChartNumber,a.RegistrationNumber,a.DispositionDate,a.DispositionTime,a.DispositionTimeUnknown,a.DispositionDate,a.DispositionTime,"+
     "a.InstitutionNumberDesc,a.LastName,a.FirstName,a.GenderDesc,a.BirthDate,a.ResponsiblityForPayment,a.PostalCode,a.ArrivalModeDesc,"+
     "a.ArrivalDate,a.ArrivalTime,a.InstitutionFromDesc,a.MISCodeDesc,a.ContactModeDesc,a.AdmitbyAmbulanceDesc,a.AmbulanceArrivalDate,"+
     "a.AmbulanceArrivalTime,a.AmbulanceArrivalTimeUnknown,a.AmbulanceTransferCareDate,a.AmbulanceTransferCareTime,a.AmbulanceTransferCareTimeUnknown,"+
     "a.ReferredFromDesc,a.TriageLevelDesc,a.TriageDate,a.TriageTime,a.TriageTimeUnknown,a.AssessmentDate,a.AssessmentTime,a.AssessmentTimeUnknown,"+
     "a.DateLeftER,a.TimeLeftER,a.TimeLeftERUnknown,a.DischargeDispositionDesc,a.ReferredToDesc,a.InstitutionToDesc,"+
//  /*  ------- abstract consult -------*/
 " c.ConsultOccurrence,c.Consultnumberdesc,c.ConsultServiceDesc,c.ConsultRequestDate,c.ConsultRequestTime,c.ConsultArrivalTimeUnknown,c.ConsultArrivalDate,"+
 " c.ConsultArrivalTime, "+
//  /*  ------- abstract providers -------*/
 " p.ProviderOccurrence,p.ProviderNumber,p.ProviderSpecialtyDesc,p.ProviderTypeDesc,"+
//  /*  ------- abstract diagnosis -------*/
 " d.DiagnosisOccurrence,d.diagnosisprefix,d.diagnosiscode,d.diagnosissuffix,d.diagnosistype,"+
//  /*  ------- abstract intervention -------*/
 " i.InterventionOccurrence,i.InterventionDate,i.InterventionCode,i.InterventionSuffixDesc,"+
 " i.InterventionAttributeStatus,i.InterventionAttributeLocation,i.InterventionAttributeExtent,"+
 " i.InterventionProviderNumberDesc,i.InterventionProviderSpecialty,i.IntervDateIn,"+
 " i.InterventionTimeIn,i.IntervDateOut,i.InterventionTimeOut,i.InterventionLocation,"+
 " i.AnesthetistIDDesc,i.AnestheticTechniqueDesc"+
 
 " from i10_amcare_vr a "+
 " join i10_amcare_and_consult_vr c on a.zzAbstractlink=c.zzabstractlink and a.CoderNumber=c.codernumber and a.FullName=c.FullName "+
 " join i10_amcare_and_provider_vr p on a.zzAbstractLink=p.zzAbstractLink and a.CoderNumber=p.CoderNumber and a.FullName=p.FullName "+
 " join i10_amcare_and_diagnosis_vr d on a.zzAbstractLink=d.zzAbstractLink and a.CoderNumber=d.CoderNumber and a.FullName=d.FullName "+
 " join I10_Amcare_And_Intervention_VR i on a.zzAbstractLink=i.zzAbstractLink and a.CoderNumber=i.CoderNumber and a.FullName=i.FullName "+
 
 " where a.IsAbstractDeleted='n'"+
 " and c.IsAbstractDeleted='n'"+
 " and p.IsAbstractDeleted='n'"+
 " and d.IsAbstractDeleted='n'"+
 " and i.IsAbstractDeleted='n' "+
 " /*and a.CoderNumber='100719'*/"+
  " and a.CoderNumber not in ('100664','100667','100835','100665','100748','1','2','4','55555','77777','88888','99999','100000','100001') "+
  " and a.codernumberdesc !=''"+
// //  --and a.ChartNumber like '%33501%'
// //  --and a.DischargeDisposition in ('06','07')
" and a.FullName like '%"+pacient+"%'" +
// //  --and zzAbstractLink>=69841

(student?" ":" and a.codernumber='100719' and a.CoderNumberDesc like '%"+teacher+"%'")+


// //  --and c.codernumber='100719' and c.CoderNumberDesc='gill, rajan'
// //  --and p.codernumber='100719' and p.CoderNumberDesc='gill, rajan'
// //  --and d.codernumber='100719' and d.CoderNumberDesc='gill, rajan'
// //  --and i.codernumber='100719' and i.CoderNumberDesc='gill, rajan'
 
  " order by CoderNumberDesc"

  return qry
}

module.exports = {abstractsqry}