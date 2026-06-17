import sel from '../fixtures/selector';
describe('Create document manually', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.userLogin('qa@coreloops.ai');
        cy.clickElement(sel.loginPage.loginButton2);
        cy.verifyUrl('/dashboard');
        cy.get('button')
            .filter(':contains("Dashboard")')
            .click();
        cy.clickElement(sel.dashboardPage.documentsButton);
        cy.wait(2000);
    });
    it('should create document manually', () => {
        cy.verifyUrl('/documents');
        cy.get('button')
            .filter(':contains("Add")')
            .eq(1)
            .click();
        cy.verifyText('Add Document');
        cy.contains('button', 'Create New').click();
        cy.wait(2000);
        cy.verifyText('Document Builder');
        cy.clickElement(sel.documentsPage.addLineItemButton);
        // cy.InputElement(sel.documentsPage.lineItemDescription, 'Test Document 1');
        // for (let i = 1; i <= 4; i++) {
        //     cy.get(sel.documentsPage.lineItemDescription)
        //         .click();

        //     cy.get(sel.documentsPage.lineItemDescription)
        //         .clear()
        //         .type(`Test Document ${i}`);
        // }

        // for (let i = 1; i <= 4; i++) {
        //     cy.clickElement(sel.documentsPage.addLineItemButton);

        //     cy.get(sel.documentsPage.lineItemDescription)
        //         .last()
        //         .type(`Test Document ${i}`);
        //     cy.wait(1000);
        // }
        Cypress._.times(4, (i) => {
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

        cy.contains("Generate Document").click();
        cy.wait(2000);
        cy.intercept('GET', '**/*.pdf').as('pdfDownload');

        cy.contains('Download').click();

        cy.wait('@pdfDownload')
            .its('response.statusCode')
            .should('eq', 200);

        cy.verifyText('Document downloaded successfully')
            .scrollIntoView()
            .should('be.visible');
        // cy.get('[data-cy="badge-input-quantity"] p')
        //     .dblclick();

        // cy.focused();

        // cy.get('[data-cy="badge-input-quantity"]').type('100');

        // cy.get('[data-cy="badge-input-quantity"]')
        //     .click();

        // cy.focused()
        //     .type('100');

        // cy.get('[data-cy="badge-input-quantity"]')
        //     .invoke('attr', 'data-state')
        //     .then(console.log);
        // cy.pause();
        // cy.get("[data-cy='badge-input-quantity']").type('100');
        // cy.clickElement(sel.documentsPage.lineItemQuantity);
        // cy.InputElement(sel.documentsPage.lineItemQuantity, 'Test Document 1');
        // cy.InputElement(sel.documentsPage.lineItemQuantity, 100);
        // cy.InputElement(sel.documentsPage.lineItemRate, 109);
        // cy.InputElement(sel.documentsPage.lineItemDiscount, 0.5);
    });

});