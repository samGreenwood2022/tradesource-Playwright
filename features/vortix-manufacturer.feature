# This feature file contains tests for the Vortix manufacturer page
Feature: Vortix manufacturer page

  Background:
    Given I am on the Vortix manufacturer page

  Scenario: h1 header is correct
    Then the h1 header should be "Vortix"

  Scenario: tagline is correct
    Then the tagline should be "Commercial cleaning equipment, built for daily use"

  Scenario: assert the telephone button is correct
    Then the telephone button should be visible
    And the telephone button should have the correct number "08001234567"
    And the telephone button should have the correct link "tel:08001234567"

  Scenario: assert the website link button is correct
    Then the website link button should be visible
    And the website link button should have the correct link "https://www.vortix-commercial.example/overview"
    And the website link button should have the correct text " Website "
    And the website link button should open the website in a new tab