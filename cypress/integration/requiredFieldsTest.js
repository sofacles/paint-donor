describe("navigates..", () => {

    it('Posts and goes to thank you if all fields are valid', function() {
        cy.fixture('paint/happyPath').then((json) => {
            cy.visit('http://localhost:3000/giveawaypaint')
            cy.get("#brand").select(json.brand);
            cy.get("#name").type(json.name);
            cy.get("#quantity").select(json.quantity);
            cy.get("#email").type(json.email);
            cy.get("#confirmEmail").type(json.confirmEmail);
            cy.get("#rgbDisplay").type(json.rgb);
            cy.get("#zipCode").type(json.zipCode);
            cy.get("#save").click();
            cy.url().should('include', '/ThankYou')
            cy.get("div").should('contain', 'Thanks for posting your paint');
        })
    })

    it('Informs you that emails need to match', function() {
        cy.fixture('paint/happyPath').then((json) => {
            cy.visit('http://localhost:3000/giveawaypaint')
            cy.get("#brand").select(json.brand);
            cy.get("#name").type(json.name);
            cy.get("#quantity").select(json.quantity);
            cy.get("#email").type(json.email);
            cy.get("#confirmEmail").type("notTheSame");
            cy.get("#rgbDisplay").click();
           
            cy.get("span[data-testid='confirm-email-error']").should('contain', 'match');
        })
    })
});