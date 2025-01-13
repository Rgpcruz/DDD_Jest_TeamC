# US011 - Registered user sees popular posts

Feature: Registered user views popular posts

  As a registered user
  I want to see the popular posts
  So that I can see the most popular posts amongst the users

  Scenario: User must be logged in to view popular posts
    Given I am not logged inn
    When I navigate to the popular posts sectionn
    Then I should be redirected to the login page

  Scenario: Display the 15 most popular posts
    Given I am logged in
    When I navigate to the popular posts section
    Then I should see a list of 15 posts
    And the posts should be ordered by number of votes in descending orderr

  Scenario: Posts with the same number of votes are ordered by comments
    Given I am logged in
    And there are posts with the same number of votess
    When I navigate to the popular posts section
    Then the posts with more comments should appear higher in the lists

  Scenario: Posts display timestamps
    Given I am logged in
    When I navigate to the popular posts sectionn
    Then each post should display its creation timestamp

  Scenario: More than 15 popular posts are available
    Given I am logged in
    When there are more than 15 popular posts availablee
    Then only the 15 most popular posts should be displayed

  Scenario: Upvote a post
    Given I am logged in
    And I am viewing the popular posts section
    When I upvote a post
    Then the post's vote count should increase by 1

  Scenario: Downvote a post
    Given I am logged in
    And I am viewing the popular posts section
    When I downvote a post
    Then the post's vote count should decrease by 1
