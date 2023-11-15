import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../support/pageObject/LoginPage";
import CandidateHelper from "../../support/helpers/candidateHelper";
import Candidate from "../../support/pageObject/CandidatePage";
import CandidateWithFile from "../../support/pageObject/candidateWithFile"
import scheduleInterview from "../../support/pageObject/sechudleInterview"
import {VacancyName} from "../../support/helpers/candidateHelper"

const scheduleInterviewObj :scheduleInterview=new scheduleInterview();
const loginObj: LoginPage = new LoginPage();
let filePath : string ='cypress/fixtures/test.txt';
let downloadedFilePath : string ='cypress/downloads/test.txt';

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
      CandidateHelper.addCandidate()
    })
})

Given("the admin logged into the system and prepared data",()=>{


})
When("the admin open the recruitment tab",()=>{
  Candidate.openCandidatePage();
})
When("search his candidate into the table",()=>{
  Candidate.openApplicationStage(VacancyName);
})
When("edit candidate with upload file",()=>{
  CandidateWithFile.editCandidateWithFile(filePath)
})
When("open candidate page again",()=>{
  cy.wait(5000);
  Candidate.openCandidatePage();
})
When("download the uploaded file",()=>{
  CandidateWithFile.openApplicationStage(VacancyName);
})

Then("assert the content of the file",()=>{
  cy.wait(5000);
  CandidateWithFile.verifyFilesContent(downloadedFilePath,filePath);
})
/////Scenario2
Given("the admin logged into the system and prepared data2",()=>{

})
When("the admin open the candidate page",()=>{
  Candidate.openCandidatePage();
})
When("search his candidate into the table below",()=>{
  Candidate.openApplicationStage(VacancyName);
})
When("make the candidate shortlisted",()=>{
  CandidateWithFile.clickShortlist();
})
When("ScheduleInterview",()=>{
  scheduleInterviewObj.scheduleInterviewDetails();
  cy.wait(5000);
})
When("mark interview pass",()=>{
  Candidate.makeInterviewPass();
  cy.wait(5000);
})
When("make job offer",()=>{
  Candidate.makeJobOffer();
  cy.wait(5000);
})
When("make Hire",()=>{
  Candidate.makeHire();
  cy.wait(5000);
})
When("edit candidate with upload other file",()=>{
  CandidateWithFile.editCandidateWithFile(filePath)
})
When("open candidate page for the third time",()=>{
  cy.wait(5000);
  Candidate.openCandidatePage();
})
When("download the uploaded other file",()=>{
  CandidateWithFile.openApplicationStage(VacancyName);
})

Then("assert the content of the same file",()=>{
  cy.wait(5000);
  CandidateWithFile.verifyFilesContent(downloadedFilePath,filePath);
})

afterEach(()=>{
  CandidateHelper.deleteJob();
  CandidateHelper.deleteEmployee();
  CandidateHelper.deleteVacancy();
  CandidateHelper.deleteCandidate();
})