let sel;
describe('template spec', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.fixture('selector').then((data) => {
      sel = data;
    });
  });

  it('Verify login page', () => {
    cy.verifyUrl('/login');
    cy.verifyText('Login');
    cy.verifyText('Enter your email below to login to your account.');
  });
  // -- User login with Invalid Credentials  --
  it('Login with Invalid credentials', () => {
    cy.invalidlogin('invalidqa@coreloops.ai');
    cy.verifyText('Uh oh! Something went wrong!');
  });
  // -- User login with Invalid secure code  --
  it('Login with Invalid secure code', () => {
    cy.invalidSecureCode('123456');
  });
  // -- User login with Valid Credentials  --
  it('Login with valid credentials', () => {
    cy.userLogin('qa@coreloops.ai');
    cy.clickElement(sel.loginPage.loginButton2);
    cy.verifyUrl('/dashboard');
  });

});