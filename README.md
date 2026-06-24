# Coreloop QA Automation Assessment

This repository contains automated end-to-end tests for the Coreloop application using Cypress.

## Tech Stack

- Cypress
- JavaScript
- Mochawesome Reporter
- GitHub Actions (CI/CD)

## Prerequisites

Ensure the following are installed on your machine:

- Node.js (v20 or later recommended)
- npm

Verify installation:

```bash
node -v
npm -v
```

## Installation

### Clone the repository

```bash
git clone https://github.com/audukehinde/coreloop.git
cd coreloop
```

### Install dependencies

```bash
npm install
```

## Running Tests

### Open Cypress Test Runner

```bash
npx cypress open
```

### Run Tests in Headless Mode

```bash
npx cypress run
```

### Run a Specific Spec File

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## Project Structure

```text
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
```

## Custom Commands

The framework uses reusable custom commands to improve modularity and maintainability:

```javascript
cy.userLogin()
cy.navigateToDocuments()
cy.openCreateDocumentModal()
cy.addDocumentLineItems()
cy.downloadGeneratedDocument()
cy.uploadDocument()
cy.verifyText()
cy.verifyUrl()
```

## Test Reports

Mochawesome reports are generated after test execution.

### Report Location

```text
cypress/reports/
```

## CI/CD

GitHub Actions is configured to:

- Install dependencies
- Run Cypress tests in headless mode
- Generate test artifacts and reports
- Upload screenshots, videos, and Mochawesome reports

### Workflow File

```text
.github/workflows/cypress.yml
```

## Running the Full Test Suite

```bash
npm test
```

or

```bash
npx cypress run --headless
```

## Author

**Kehinde Audu**  
QA Automation Engineer