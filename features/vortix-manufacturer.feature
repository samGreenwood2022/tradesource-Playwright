# This feature file contains tests for the Vortix manufacturer page
Feature: Vortix manufacturer page

  Background:
    Given I am on the Vortix manufacturer page

  Scenario: h1 header is correct
    Then the h1 header should be "Vortix"

  Scenario: tagline is correct
    Then the tagline should be "Commercial cleaning equipment, built for daily use"