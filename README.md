Coreloop QA Automation Assessment

This repository contains automated end-to-end tests for the Coreloop application using Cypress.

Tech Stack
Cypress
JavaScript
Mochawesome Reporter
GitHub Actions (CI/CD)
Prerequisites

Ensure the following are installed on your machine:

Node.js (v20 or later recommended)
npm

Verify installation:

node -v
npm -v
Installation

Clone the repository:

git clone <https://github.com/audukehinde/coreloop.git>
cd coreloop

Install dependencies:

npm install
Running Tests
Open Cypress Test Runner
npx cypress open
Run Tests in Headless Mode
npx cypress run
Run a Specific Spec File
npx cypress run --spec "cypress/e2e/login.cy.js"

Project Structure
cypress/
├── e2e/
│   ├── login.cy.js
│   ├── documents.cy.js
│   └── createDocument.cy.js
├── fixtures/
├── support/
│   ├── commands.js
│   └── e2e.js
├── downloads/
├── screenshots/
└── videos/

.github/
└── workflows/
    └── cypress.yml
Custom Commands

The framework uses reusable custom commands to improve modularity and maintainability:

cy.userLogin()
cy.navigateToDocuments()
cy.openCreateDocumentModal()
cy.addDocumentLineItems()
cy.downloadGeneratedDocument()
cy.uploadDocument()
cy.verifyText()
cy.verifyUrl()
Test Reports

Mochawesome reports are generated after test execution.

Report location:

cypress/reports/
CI/CD

GitHub Actions is configured to:

Install dependencies
Run Cypress tests in headless mode
Generate test artifacts and reports
Upload screenshots, videos, and Mochawesome reports

Workflow file:

.github/workflows/cypress.yml
Running the Full Test Suite
npm test

or

npx cypress run --headless
Author

Kehinde Audu
QA Automation Engineer