describe('when trying to access an admin page like active-paints', () => {
  beforeEach(() => {
    cy.task('db:teardown');
    cy.task('db:seed');
  });

  it('redirects to the log in page', function () {
    cy.visit('http://localhost:3000/admin/active-paints');
    cy.location('pathname').should('eq', '/admin/login');
  });

  // Just changing these values to valid creds after you've run the test and then letting cypress automatically
  // re-run the tests doesn't work like I expected.  But if you close cypress's browser window and click "stop"
  // in the cypress ui and then re-run it works.
  it('it stays on login with invalid credentials ', function () {
    cy.location('pathname').should('eq', '/admin/login');
    cy.get('input[name=userName]').type('vern');
    cy.get('input[name=password]').type('fonk');
    cy.get('input[type=submit]').click();

    cy.location('pathname').should('eq', '/admin/login');
  });

  it('brings you to active-paints after successful login', function () {
    cy.visit('http://localhost:3000/admin/active-paints');
    cy.get('input[name=userName]').type('j');
    cy.get('input[name=password]').type('k');
    cy.get('input[type=submit]').click();

    cy.location('pathname').should('eq', '/admin/active-paints');
  });
});
