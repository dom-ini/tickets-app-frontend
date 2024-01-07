import { AUTH_COOKIE_KEY } from "../../src/lib/constants";

describe("login form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/logowanie");
    cy.getByData("email-input").as("email");
    cy.getByData("password-input").as("password");
  });
  context("successful login", () => {
    beforeEach(() => {
      cy.intercept("POST", `${Cypress.env("apiUrl")}/auth/login`).as("login");
      cy.get("@email").type(Cypress.env("testUsername"));
      cy.get("@password").type(`${Cypress.env("testPassword")}{enter}`);
      cy.wait("@login");
    });
    afterEach(() => {
      cy.logout();
    });
    it("sets cookie on success", () => {
      cy.getCookie(AUTH_COOKIE_KEY).should("exist");
    });
    it("redirects to account page on success", () => {
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/konto/bilety");
      });
    });
  });
  context("unsuccessful login", () => {
    it("does NOT allow invalid credentials", () => {
      cy.get("@email").type("invalid@email.com");
      cy.get("@password").type("invalid{enter}");
      cy.getByData("login-error").should("be.visible");
    });
  });
});
