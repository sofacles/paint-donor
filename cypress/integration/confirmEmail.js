describe('when you try to confirm your email for a posted paint', () => {
  beforeEach(() => {
    console.log('In beforeEach');
    cy.task('db:teardown');
    cy.task('db:seed');
  });

  it(' publishes the paint if you confirm email with a secret', function () {
    let secret = '9a933639-c7a5-4a3f-8f32-2a51041866b8';
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

describe('when you get the paints again', () => {
  beforeEach(() => {
    cy.setCookie('HasSeenHomeScreen', 'true');
    cy.visit('http://localhost:3000/');
  });

  it('shows the paint I just added', function () {
    cy.get('h1').contains('Available Paint').should('exist');
    cy.get(`[data-testid="WithoutConfirmedEmail"]`).should('exist');
  });
});
