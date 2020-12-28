describe('when you try to confirm your email for a posted paint', () => {
  beforeEach(() => {
    cy.task('db:teardown');
    cy.task('db:seed');
  });
  it(' publishes the paint if you confirm email with a secret', function () {
    let secret = 'yuikn877wusjqvguq';
    cy.request(
      'POST',
      `http://localhost:5000/api/confirm_email?mn=${secret}`
    ).then((response) => {
      expect(response.body).to.have.property(
        'confirmationResult',
        'emailConfirmed'
      );
    });
  });
});

describe('when you try to confirm your email for a posted paint', () => {
  beforeEach(() => {
    cy.setCookie('HasSeenHomeScreen', 'true');
    cy.visit('http://localhost:3000/');
  });
  //TODO - this should fail until email is confirmed
  it('shows the paint I just added', function () {
    cy.get('h1').contains('Available Paint').should('exist');
    cy.get('div').contains('Leopard').should('exist');
  });
});
