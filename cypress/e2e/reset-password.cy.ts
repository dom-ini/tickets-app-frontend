describe("reset password page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/nie-pamietam-hasla");
    cy.getByData("email-input").as("email");
  });
  it("does NOT allow an invalid email address", () => {
    cy.get("@email")
      .type("invalid{enter}")
      .should("have.attr", "aria-invalid", "true");
  });
  it("displays toast on success", () => {
    cy.get("@email").type("dummy@email.com{enter}");
    cy.getByData("notifications").should("not.be.empty");
  });
});
