import sel from '../fixtures/selector';

describe('Documents', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.userLogin('qa@coreloops.ai');
        cy.clickElement(sel.loginPage.loginButton2);
        cy.verifyUrl('/dashboard');
    });

    it('should upload valid document', () => {
        cy.clickElement(sel.dashboardPage.dashboardButton);
        cy.clickElement(sel.dashboardPage.documentsButton);
        cy.wait(2000);
        cy.verifyUrl('/documents');
        cy.verifyText('Documents');
        cy.wait(2000);
        cy.get('button')
            .filter(':contains("Add")')
            .eq(1)
            .click();
        cy.verifyText('Add Document');
        // cy.clickElement(sel.documentsPage.uploadButton);
        cy.contains('button', 'Upload').click();
        cy.verifyText('Upload Document');
        cy.contains('span', 'Drag & Drop or').click();
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/Demolition_contractor.pdf', { force: true });
        cy.get('.justify-end > .bg-primary').click();
        cy.verifyText('Document Uploaded');
    });
    it('should not upload invalid document', () => {
        cy.clickElement(sel.dashboardPage.dashboardButton);
        cy.clickElement(sel.dashboardPage.documentsButton);
        cy.wait(2000);
        cy.verifyUrl('/documents');
        cy.verifyText('Documents');
        cy.wait(2000);
        cy.get('button')
            .filter(':contains("Add")')
            .eq(1)
            .click();
        cy.verifyText('Add Document');
        // cy.clickElement(sel.documentsPage.uploadButton);
        cy.contains('button', 'Upload').click();
        cy.verifyText('Upload Document');
        cy.contains('span', 'Drag & Drop or').click();
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/Samson.mp4', { force: true });
        cy.get('.justify-end > .bg-primary').click();
        // cy.verifyText('Document Uploaded');
    });
});
