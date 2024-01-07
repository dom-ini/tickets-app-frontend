describe("event page", () => {
  beforeEach(() => {
    cy.getEvent().then((data) => {
      cy.visit(`http://localhost:3000/wydarzenie/${data.slug}`);
    });
  });
  it("displays name, date and place", () => {
    cy.getEvent().then((data) => {
      cy.getByData("event-date").should("not.be.empty");
      cy.getByData("event-name").should("have.text", data.name);
      cy.getByData("event-location")
        .should("contain.text", data.place)
        .should("contain.text", data.city);
    });
  });
  it("redirects unauthenticated users to login page when trying to reserve a ticket", () => {
    cy.getByData("reserve-ticket-link").should(
      "have.attr",
      "href",
      "/logowanie"
    );
  });
  it("does have a location url", () => {
    cy.getByData("location-link")
      .should("have.attr", "href")
      .and("not.be.empty");
  });
});
