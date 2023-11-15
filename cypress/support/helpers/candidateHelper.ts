import DeleteDataInit from "../init/deleteDataInit";
import CandidateInit from "../init/CandidateInit";
import AddEmployee from "../../support/helpers/addEmployeeHelper";
const baseUrl = Cypress.config().baseUrl;
export const URLs = {
  addJob: `${baseUrl}/web/index.php/api/v2/admin/job-titles`,
  addNewEmployee: `${baseUrl}/web/index.php/api/v2/pim/employees`,
  addVacancy:`${baseUrl}/web/index.php/api/v2/recruitment/vacancies`,
  addCandidate:`${baseUrl}/web/index.php/api/v2/recruitment/candidates`
};
export let empId: any;
export let title: string;
export let jobId: number;
export let VacancyId: number;
export let VacancyName: string;
export let CandidateId:number;

export default class Candidate {

    static addJob(info: any) {
        cy.apis("POST", URLs.addJob, info).then((response) => {
          jobId = response.data.id;
          title = response.data.title;
          console.log(jobId);
          console.log(title);
        });
      }

    static addEmp() {
        return AddEmployee.addNewEmployee().then((resolve) => {
          empId = `${resolve}`;
          console.log(`emp ${empId}`);
        });
      }
      
    static addVacancy() {
        cy.apis("POST", URLs.addVacancy,CandidateInit.initVacancy()).then((response) => {
          VacancyId = response.data.id;
          VacancyName = response.data.name;
          console.log(VacancyId);
          console.log(VacancyName);
        });
      }

      static addCandidate() {
        return cy.apis("POST", URLs.addCandidate,CandidateInit.initCandidate()).then((response) => {
          CandidateId = response.data.id;
          console.log(CandidateId);
        });
      }
      static makeShortlisted() {
          return cy.apis('PUT', `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${CandidateId}/shortlist`,CandidateInit.shortlistCandidate())
      }
      static makeInterviewScheduled() {
        return cy.apis('POST', `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${CandidateId}/shedule-interview`,CandidateInit.interviewScheduledCandidate())
      }

      static deleteJob() {
        cy.apis("DELETE", URLs.addJob, DeleteDataInit.initDelete(jobId));
      }
      static deleteEmployee() {
        cy.apis("DELETE", URLs.addNewEmployee, DeleteDataInit.initDelete(empId));
      }
      static deleteVacancy() {
        cy.apis("DELETE", URLs.addVacancy, DeleteDataInit.initDelete(VacancyId));
      }
      static deleteCandidate() {
        cy.apis("DELETE", URLs.addCandidate, DeleteDataInit.initDelete(CandidateId));
      }
}
