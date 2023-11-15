Feature: Candidate with file Feature

  Scenario: Verify that the user can upload a txt file for Application Initiated.
    Given the admin logged into the system and prepared data
    When the admin open the recruitment tab
    And search his candidate into the table
    And edit candidate with upload file
    And open candidate page again
    And download the uploaded file
    Then assert the content of the file

    Scenario: Verify that the user can upload a txt file for Hired statuses.
    Given the admin logged into the system and prepared data2
    When the admin open the candidate page
    And search his candidate into the table below
    And make the candidate shortlisted 
    And ScheduleInterview
    And mark interview pass
    And make job offer
    And make Hire
    And edit candidate with upload other file
    And open candidate page for the third time
    And download the uploaded other file
    Then assert the content of the same file
