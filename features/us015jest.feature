Feature: Non-registered user interacting with homepage and posts

  Scenario: Non-registered user visits the homepage with no new posts
    Given I am a non-registered user
    When I visit the homepage
    Then I should see a message stating "No new posts available"

  Scenario: Non-registered user clicks on a new post
    Given there are new posts available
    When I click on a new post
    Then I should be redirected to the post's detail page
    And I should see the full content of the post

  Scenario: Error loading new posts
    When there is a system error loading new posts
    Then I should see an error message stating "Unable to load new posts. Please try again later"

  Scenario: Non-registered user tries to interact with a post
    Given I am viewing a post's detail page
    When I try to like or comment on the post
    Then I should be prompted to register or log in
