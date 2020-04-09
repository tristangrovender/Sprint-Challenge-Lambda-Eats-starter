describe("Testing my form", function() {
    beforeEach(function() {
        cy.visit("http://localhost:3000/pizza");
    });
    it("Add test to form inputs and submit form", function() {
        cy.get("#name")
            .type("Tristan")
            .should("have.value", "Tristan");
        cy.get("#instructions")
            .type("More mushrooms please!")
            .should("have.value", "More mushrooms please!");
        cy.get(".sausage > input")
            .check()
            .should("be.checked");
        cy.get(".mushroom > input")
            .check()
            .should("be.checked");
        cy.get("button").click();
    });
    it("Test for invalid fields", function() {
        cy.get("button").should("be.disabled");
    });
});
