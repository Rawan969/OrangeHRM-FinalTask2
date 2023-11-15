import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../support/pageObject/LoginPage";
import CandidateHelper from "../../support/helpers/candidateHelper";
import Candidate from "../../support/pageObject/CandidatePage";
import {VacancyName} from "../../support/helpers/candidateHelper"

const loginObj: LoginPage = new LoginPage();

beforeEach(()=>{
  cy.visit("/web/index.php/auth/login");
    cy.fixture("LoginAdmin").as("user");
    cy.get("@user").then((userLogin: any) => {
      loginObj.userLogin(userLogin[0].username, userLogin[0].password);
    });
    //create job
    cy.fixture("AddJob").as("job");
    cy.get("@job").then((info: any) => {
      CandidateHelper.addJob(info);
    });
    //create Employee and vacancy
    CandidateHelper.addEmp().then(()=>{
      CandidateHelper.addVacancy();
    }).then(()=>{
      CandidateHelper.addCandidate().then(()=>{
        CandidateHelper.makeShortlisted().then(()=>{
          CandidateHelper.makeInterviewScheduled()
        })
      })
    })

})

//Scenario1
Given("the admin logged into the system and prepared data",()=>{
  

})
When("the admin open the recruitment tab",()=>{
  Candidate.openCandidatePage()
})
When("search his candidate into the table",()=>{
  Candidate.openApplicationStage(VacancyName)
})
When("make interview Pass",()=>{
  Candidate.makeInterviewPass();
})
Then("the status will be:Interview Passed",()=>{
  Candidate.verifyInterviewPassStatus();
  Candidate.assertionPassBtn();
})

///Scenario2
Given("the admin logged into the system and prepared data to check",()=>{
  

})
When("the admin open the Candidate page",()=>{
  Candidate.openCandidatePage()
})
When("search his candidate into the table below",()=>{
  Candidate.openApplicationStage(VacancyName)
})
When("make interview fail",()=>{
  Candidate.makeInterviewFail();
})
Then("the status will be:Interview Failed",()=>{
  Candidate.verifyInterviewFailStatus();
  Candidate.assertionFailBtn();
})


afterEach(()=>{
  CandidateHelper.deleteJob();
  CandidateHelper.deleteEmployee();
  CandidateHelper.deleteVacancy();
  CandidateHelper.deleteCandidate();
})