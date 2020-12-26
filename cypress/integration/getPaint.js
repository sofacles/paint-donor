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
