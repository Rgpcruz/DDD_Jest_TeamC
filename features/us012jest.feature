# US012 - Registered user views comments thread

Feature: View User Comments

  As a registered user
  I want to view the comments thread on a post
  So that I can see the comments made against a post

  Scenario: User views comments on a post
    Given the user is logged in
    And the user navigates to a post with comments
    When the user clicks on the "View Comments" button
    Then the user should see a list of comments for that post

  Scenario: User views comments on a post with no comments
    Given the user is logged in
    And the user navigates to a post with no comments
    When the user clicks on the "View Comments" button
    Then the user should see a message saying "No comments available"

  Scenario: User views comments on a post with multiple pages of comments
    Given the user is logged in
    And the user navigates to a post with multiple pages of comments
    When the user clicks on the "View Comments" button
    Then the user should see the first page of comments
    And the user should see a "Next" button to navigate to the next page of comments
