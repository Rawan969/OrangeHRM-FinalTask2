Feature: Candidate Feature

  Scenario: Candidate Interview Result Verification (Pass)
    Given the admin logged into the system and prepared data
    When the admin open the recruitment tab
    And search his candidate into the table
    And make interview Pass
    Then the status will be:Interview Passed

    Scenario: Candidate Interview Result Verification (Fail)
    Given the admin logged into the system and prepared data to check
    When the admin open the Candidate page
    And search his candidate into the table below
    And make interview fail
    Then the status will be:Interview Failed