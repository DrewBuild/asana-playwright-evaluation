# Asana-like Playwright Evaluation

This project contains a data-driven Playwright test suite for validating task cards in an Asana-like demo application.

## Demo App

https://create-asana-like-pr-39y5.bolt.host/

## Tech Stack

- TypeScript
- Playwright
- Node.js

## Objective

The goal of this project is to validate multiple task scenarios while minimizing duplicated test code.

Test scenarios are stored in a reusable data object, allowing new cases to be added without rewriting the core test logic.

## Test Coverage

The suite validates the following:

- Successful login
- Navigation to the correct project
- Task appears in the expected column
- Task contains the expected tags

## Test Scenarios

The scenarios are defined in:

```text
data/taskScenarios.ts