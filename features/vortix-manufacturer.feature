#            .-''''''-.
#         .'  .-''''-.  '.
#        /  .'  o  o  '.  \
#       |  /  o      o  \  |
#       | |  o   ()   o  | |
#       |  \  o      o  /  |
#        \  '.  o  o  .'  /
#         '.  '-....-'  .'
#            '-......-'
#
# This feature file contains tests for the Vortix manufacturer page
Feature: Vortix manufacturer page

  Background:
    Given I am on the Vortix manufacturer page

  @signed-in
  Scenario: h1 header is correct
    Then the h1 header should be "Vortix"

  @signed-in
  Scenario: tagline is correct
    Then the tagline should be "Commercial cleaning equipment, built for daily use"

  @signed-in
  Scenario: assert the telephone button is correct
    Then the telephone button should be visible
    And the telephone button should have the correct number "08001234567"
    And the telephone button should have the correct link "tel:08001234567"

  @signed-in
  Scenario: assert the website link button is correct
    Then the website link button should be visible
    And the website link button should have the correct link "https://www.vortix-commercial.example/overview"
    And the website link button should have the correct text " Website "
    And the website link button should open the website in a new tab

  @signed-out
  Scenario: assert the contact manufacturer button is correct
    Then the contact manufacturer button should be visible
    And the contact manufacturer button should have the correct text " Contact manufacturer "
    And clicking the contact manufacturer button will open the sign in modal

  @signed-out
  Scenario: assert the sign-in process works as expected
    When i click sign in and follow the sign in process
    Then I should be signed in successfully

  @signed-out
  Scenario: scan the manufacturer page for accessibility violations
    Then the page should have no accessibility violations

  
