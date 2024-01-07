describe("registration form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/rejestracja");
    cy.getByData("registration-form").as("form");
    cy.getByData("email-input").as("email");
    cy.getByData("password-input").as("password1");
    cy.getByData("repeat-password-input").as("password2");
  });
  it("does NOT allow an invalid email address", () => {
    cy.get("@email").type("not-an-email-address");
    cy.get("@form").submit();
    cy.get("@email").should("have.attr", "aria-invalid", "true");
  });
  it("does NOT allow an existing email address", () => {
    cy.get("@email").type(Cypress.env("testUsername"));
    cy.get("@password1").type(Cypress.env("testPassword"));
    cy.get("@password2").type(Cypress.env("testPassword"));
    cy.get("@form").submit();
    cy.getByData("registration-error").should("be.visible");
  });
  it("does NOT allow not complex enough password", () => {
    cy.get("@password1").type("notsecure").blur();
    cy.get("@password1").should("have.attr", "aria-invalid", "true");
  });
  it("does NOT allow two different passwords", () => {
    cy.get("@password1").type(Cypress.env("testPassword"));
    cy.get("@password2").type("notsecure").blur();
    cy.get("@password2").should("have.attr", "aria-invalid", "true");
  });
  it("can show password", () => {
    cy.get("@password1").should("have.attr", "type", "password");
    cy.get("@password1").siblings("button").click();
    cy.get("@password1").should("have.attr", "type", "text");
  });
});
