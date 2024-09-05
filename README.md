# Playwright JavaScript Project

## Overview

This project uses Playwright to automate browser interactions and perform end-to-end testing.

## Getting Started

### Prerequisites

* Node.js (version 18 or higher)
* Playwright (version 2.46 or higher)

### Installation

1. Clone the repository: `git clone https://github.com/ahmadnab/infeedo-PlayPOC.git`
2. Install dependencies: `npm install`
3. Run the tests: `npx playwright test`

## Project Structure

* `amber/`: End-to-end tests written in JavaScript using Playwright
* `pages/`: Common functions for interacting with the application
* `components/`: Locators for interacting with the page
* `utils/`: Utility functions for supporting the tests

## Writing Tests

Tests are written in JavaScript using the Playwright API. See the [Playwright documentation](https://playwright.dev/docs/intro) for more information on writing tests.

## Running Tests

Tests can be run using the `npx playwright test` command. This will execute all tests in the `tests/` directory.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.

## License

This project is licensed under the MIT License.
