describe('when browsing paints', () => {
  beforeEach(() => {
    cy.task('db:teardown');
    cy.task('db:seed');
    cy.setCookie('HasSeenHomeScreen', 'true');
    cy.visit('http://localhost:3000/');
  });
  it('only shows paints whose emails are confirmed', function () {
    cy.get('[data-testid="4df8f82568aca435b9abed7e"]')
      .contains('WithConfirmedEmail')
      .should('exist');

    cy.get('[data-testid="5df8f82568aca435b9abed7f"]').should('not.exist');
  });
});
