let sel;
let credentials;
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
    cy.get(ele).should('exist').and('be.visible').clear().type(value);
});
// -- This command clicks on the element --
Cypress.Commands.add('clickElement', (ele) => {
    cy.get(ele).should('exist').and('be.visible').click();
});

// -- Valid login method  --
Cypress.Commands.add('userValidLogin', (email) => {

    cy.InputElement(sel.loginPage.emailField, email);
    cy.clickElement(sel.loginPage.loginButton);
    cy.verifyUrl(`/verify-code?email=${encodeURIComponent(email)}`);
    cy.verifyText('2 Factor Authentication');
    cy.verifyText('Please enter the 6-digit code we emailed you below.');
    cy.clickElement(sel.loginPage.loginButton2);
    cy.verifyUrl; ('/dashboard');
});