describe("ticket reservation and cancellation", () => {
  after(() => {
    cy.logout();
  });
  it("user can log in, reserve ticket and then cancel it", () => {
    cy.visit("http://localhost:3000/");
    cy.getByData("account-btn").click();
    cy.intercept("POST", `${Cypress.env("apiUrl")}/auth/login`).as("login");
    cy.intercept("POST", `${Cypress.env("apiUrl")}/auth/login`).as("search");
    cy.getByData("email-input").type(Cypress.env("testUsername"));
    cy.getByData("password-input").type(
      `${Cypress.env("testPassword")}{enter}`
    );
    cy.wait("@login");
    cy.location().should((loc) => expect(loc.pathname).to.eq("/konto/bilety"));
    cy.getByData("brand").click();
    cy.getByData("only-with-tickets-chk").click();
    cy.getByData("search-submit-btn").click();
    cy.getByData("search-results").find("a").first().click();
    cy.getByData("reserve-ticket-link").click();
    cy.location().should((loc) =>
      expect(loc.pathname).to.match(/wydarzenie\/((\w|-)+)\/zarezerwuj/)
    );
    cy.getByData("ticket-categories").find("button").first().click();
    cy.location().should((loc) => expect(loc.pathname).to.eq("/konto/bilety"));
    cy.getByData("tickets-event-url")
      .should("have.attr", "href")
      .and("include", "/wydarzenie/");
    cy.getByData("generate-qr-btn").click();
    cy.getByData("qr-code").find("img").should("exist").type("{esc}");
    cy.getByData("cancel-ticket-btn").click();
    cy.getByData("cancel-ticket-confirm-btn").click();
    cy.getByData("data-table").find("tbody > tr > td").should("have.length", 4);
  });
});
