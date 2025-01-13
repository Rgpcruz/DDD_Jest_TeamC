Feature: Popular Posts Management

  As a user
  I want to view and interact with popular posts
  So that I can engage with the most popular content

  Scenario: Verify user is non-registered
    Given I am not logged in
    When I access the popular posts section
    Then I should be recognized as a non-registered user

  Scenario: Display popular posts
    When I navigate to the popular posts section
    Then I should see a list of popular posts

  Scenario: Display only 15 most popular posts
    When there are more than 15 popular posts available
    Then I should see only the top 15 popular posts

  Scenario: Organize posts by number of votes
    Given I am viewing the popular posts section
    When posts are displayed
    Then the posts should be ordered by number of votes in descending order

  Scenario: Handle posts with same number of votes
    Given there are posts with the same number of votes
    Then the posts with more comments should appear higher in the list

  Scenario: No popular posts available
    Given there are no popular posts available
    Then I should see a message stating "No popular posts available"

  Scenario: Error loading popular posts
    Given there is a system error
    Then I should see an error message stating "Unable to load popular posts. Please try again later"
