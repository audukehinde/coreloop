import sel from '../fixtures/selector';

describe('Documents', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.userLogin('qa@coreloops.ai');
        cy.clickElement(sel.loginPage.loginButton2);
        cy.verifyUrl('/dashboard');
    });

    it('should upload valid document', () => {
        cy.navigateToDocuments();
        cy.openUploadDocumentModal();
        cy.uploadDocument(
            'cypress/fixtures/Demolition_contractor.pdf'
        );
        cy.verifyText('Document Uploaded');
    });
    it('should not upload invalid document type(.mp4)', () => {
        cy.navigateToDocuments();
        cy.openUploadDocumentModal();
        cy.uploadDocument(
            'cypress/fixtures/Samson.mp4'
        );
        cy.verifyInvalidDocumentUpload();
    });
});
