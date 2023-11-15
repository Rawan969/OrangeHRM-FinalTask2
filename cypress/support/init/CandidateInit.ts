import GenericHelper from "../helpers/genericFunctions";
import {VacancyPayload} from "../../support/API/payload/addVacancyPayload";
import {CandidatePayload} from "../API/payload/addCandidatePayload";
import {ICreateInterviewPayload} from "../API/payload/interviewPayload"
import {empId,jobId,VacancyId} from "../../support/helpers/candidateHelper";

let VacancyName=`test${GenericHelper.genericRandomString()}`;
export default class CandidateInit {
    static initVacancy(): VacancyPayload {
        return {
            description: "",
  
            employeeId: empId,
          
            isPublished: true,
          
            jobTitleId: jobId,
          
            name: VacancyName,
        
            numOfPositions:5,
            
            status:true
        };
      }
      static initCandidate(): CandidatePayload {
        return {
             
                 comment:null,
                 consentToKeepData:false,
                 contactNumber:null,
                 dateOfApplication:"2023-10-14",
                 email:`salam${GenericHelper.genericRandomString()}@test.com`,
                 firstName:`salam${GenericHelper.genericRandomString()}`,
                 keywords:null,
                 lastName:`alaa${GenericHelper.genericRandomString()}`,
                 middleName:null,
                 vacancyId:VacancyId
             
         }
         
     }
     static shortlistCandidate():any {
         let createCandidatePayload = {
             note: null
         }
         return createCandidatePayload
     }
     static interviewScheduledCandidate(): ICreateInterviewPayload {
        let InterviewPayload: ICreateInterviewPayload = {
            interviewDate: "2023-10-14",
            interviewName: "best",
            interviewTime: null,
            interviewerEmpNumbers: [empId],
            note: null
        }
        return InterviewPayload
    }
}
