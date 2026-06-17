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
    cy.InputElement(sel.loginPage.secureCodeField, code);
    cy.clickElement(sel.loginPage.loginButton2);
    cy.verifyUrl('/verify-code');
    cy.verifyText('Incorrect secure code');
});