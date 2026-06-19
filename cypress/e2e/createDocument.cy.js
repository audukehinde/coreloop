import sel from '../fixtures/selector';
describe('Create document manually', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.userLogin('qa@coreloops.ai');
        cy.clickElement(sel.loginPage.loginButton2);
        cy.verifyUrl('/dashboard');
    });

    it('should create and download a document successfully', () => {

        cy.navigateToDocuments();

        cy.openCreateDocumentModal();

        cy.addDocumentLineItems(4);

        cy.generateDocument();

        cy.downloadGeneratedDocument();

        cy.verifyDocumentDownloaded();

    });

});