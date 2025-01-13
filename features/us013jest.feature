# US013 - Non-registered user view comments thread

Feature: Non-registered user views comments
    
    As a non-registered user
    I want to view comments on a post
    So that I can read the discussion without logging in

Scenario: Verify user is non-registered
    Given I am not logged in
    When I attempt to access a post
    Then I should be recognized as a non-registered user

Scenario: Non-registered user views post content
    Given I am not logged in
    When I access a post
    Then I should be able to see the content of the post

Scenario: Non-registered user views comments thread on a post
    Given I am not logged in
    When I access a post
    And I navigate to the comments section
    Then I should be able to see all comments on the post
    And the comments should be displayed in the order they are stored