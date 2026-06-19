let sel;

before(() => {
    cy.on('uncaught:exception', () => {
        return false;
    });
    cy.fixture('selector').then((data) => {
        sel = data;
    });
});
Cypress.Commands.add('verifyUrl', (path) => {
    cy.url().should('include', path);
});
// -- This command validates texts on the page --
Cypress.Commands.add('verifyText', (text) => {
    cy.contains(text).should('be.visible');
});
// -- This command fills the input field --
Cypress.Commands.add('InputElement', (ele, value) => {
    cy.get(ele).should('exist').and('be.visible').type(value);
});
// -- This command clicks on the element --
Cypress.Commands.add('clickElement', (ele) => {
    cy.get(ele).should('exist').and('be.visible').click();
});
// -- login method  --
Cypress.Commands.add('userLogin', (email) => {
    cy.InputElement(sel.loginPage.emailField, email);
    cy.clickElement(sel.loginPage.loginButton);
    cy.verifyUrl(`/verify-code?email=${encodeURIComponent(email)}`);
    cy.verifyText('2 Factor Authentication');
    cy.verifyText('Please enter the 6-digit code we emailed you below.');
});
// -- Invalid login method  --
Cypress.Commands.add('invalidlogin', (email) => {
    cy.InputElement(sel.loginPage.emailField, email);
    cy.clickElement(sel.loginPage.loginButton);
    cy.verifyUrl('/login');
});
// Invalid secure code method  --
Cypress.Commands.add('invalidSecureCode', (code) => {
    cy.userLogin('qa@coreloops.ai');
    cy.get(sel.loginPage.secureCodeField).clear().type(code);
    cy.clickElement(sel.loginPage.loginButton2);
    cy.verifyUrl('/verify-code');
    cy.verifyText('Incorrect secure code');
});
// -- This command is used to navigate to the documents page --
Cypress.Commands.add('navigateToDocuments', () => {

    cy.get('button')
        .filter(':contains("Dashboard")')
        .click();

    cy.clickElement(sel.dashboardPage.documentsButton);

    cy.verifyUrl('/documents');
    cy.verifyText('Documents');
    cy.contains('button', 'Add').should('be.visible');
});

// -- This command is used to open the create document modal --
Cypress.Commands.add('openCreateDocumentModal', () => {

    cy.get('button')
        .filter(':contains("Add")')
        .eq(1)
        .click();

    cy.verifyText('Add Document');

    cy.contains('button', 'Create New')
        .click();

    cy.verifyText('Document Builder');

});
// -- This command is used to add line items to the document --
Cypress.Commands.add('addDocumentLineItems', (count) => {

    cy.clickElement(sel.documentsPage.addLineItemButton);

    Cypress._.times(count, (i) => {

        cy.get(sel.documentsPage.addLineItemButton)
            .click();

        cy.get(sel.documentsPage.lineItemDescription)
            .should('have.length', i + 1);

    });

    cy.get(sel.documentsPage.lineItemDescription)
        .each(($input, index) => {

            cy.wrap($input)
                .should('exist')
                .type(`Test Document ${index + 1}`);

        });

});
// -- This command is used to generate the document --
Cypress.Commands.add('generateDocument', () => {

    cy.contains('Generate Document')
        .click();

});
// -- This command is used to download the generated document --
Cypress.Commands.add('downloadGeneratedDocument', () => {

    cy.intercept('GET', '**/*.pdf').as('pdfDownload');

    cy.contains('Download').click();

    cy.wait('@pdfDownload', { timeout: 15000 });

    cy.get('@pdfDownload')
        .its('response.statusCode')
        .should('eq', 200);

});
// -- This command is used to verify the document is downloaded successfully --
Cypress.Commands.add('verifyDocumentDownloaded', () => {

    cy.verifyText('Document downloaded successfully')
        .scrollIntoView()
        .should('be.visible');

});
// -- This command is used to open the upload document modal --
Cypress.Commands.add('openUploadDocumentModal', () => {

    cy.get('button')
        .filter(':contains("Add")')
        .eq(1)
        .click();

    cy.verifyText('Add Document');

    cy.contains('button', 'Upload')
        .click();

    cy.verifyText('Upload Document');

});
// -- This command is used to upload a document --
Cypress.Commands.add('uploadDocument', (filePath) => {

    cy.contains('span', 'Drag & Drop or')
        .click();

    cy.get('input[type="file"]')
        .selectFile(filePath, { force: true });

    cy.get('.justify-end > .bg-primary')
        .click();
});
// -- This command is used to verify invalid document upload --
Cypress.Commands.add('verifyInvalidDocumentUpload', () => {

    cy.contains('Document Uploaded')
        .should('not.exist');

    cy.contains('Unsupported file type')
        .should('be.visible');

});