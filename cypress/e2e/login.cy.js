describe('template spec', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Verify login page', () => {
    cy.verifyUrl('/login');
    cy.verifyText('Login');
    cy.verifyText('Enter your email below to login to your account.');
  });

  // -- User login with Valid Credentials  --
  it('Login with valid credentials', () => {
    cy.userValidLogin('qa@coreloops.ai');
  });



});