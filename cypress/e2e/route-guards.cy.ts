const { _ } = Cypress;
const routesForAuthenticatedOnly = [
  "/konto",
  "/konto/bilety",
  "/konto/dane-logowania",
];
const routesForUnauthenticatedOnly = [
  "/logowanie",
  "/rejestracja",
  "/nie-pamietam-hasla",
  "/reset-hasla",
];

describe("route guards", () => {
  context("authenticated users", () => {
    beforeEach(() => {
      cy.loginFromApi();
    });
    afterEach(() => {
      cy.location().should((loc) => expect(loc.pathname).to.eq("/"));
      cy.logout();
    });
    _.each(routesForUnauthenticatedOnly, (route) => {
      it(`should redirect from "${route}" to home page`, () => {
        cy.visit("http://localhost:3000" + route);
      });
    });
  });
  context("unauthenticated users", () => {
    afterEach(() => {
      cy.location().should((loc) => expect(loc.pathname).to.eq("/logowanie"));
    });
    _.each(routesForAuthenticatedOnly, (route) => {
      it(`should redirect from "${route}" to login page`, () => {
        cy.visit("http://localhost:3000" + route);
      });
    });
  });
});
