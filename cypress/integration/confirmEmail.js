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
      // response.body is automatically serialized into JSON
      expect(response.body).to.have.property(
        'confirmationResult',
        'emailConfirmed'
      );
    });
  });
});
