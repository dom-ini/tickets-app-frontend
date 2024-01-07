describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("displays a search form", () => {
    cy.getByData("search-form").should("exist");
  });
  it("displays a latest events section", () => {
    cy.getByData("events-carousel").should("exist");
  });
});
