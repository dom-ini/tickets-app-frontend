import { format } from "date-fns";

describe("event search", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.getByData("search-name").as("name");
    cy.getByData("city-select-btn").as("city-btn");
    cy.getByData("date-picker-btn").as("date-btn");
    cy.getByData("search-submit-btn").as("submit-btn");
  });
  it("allows for selecting city from dropdown", () => {
    cy.get("@city-btn").click();
    cy.getByData("city-select-popover").find("input").type("Gdańsk{enter}");
    cy.get("@city-btn").should("have.text", "Gdańsk");
  });
  it("allows for selecting dates", () => {
    cy.get("@date-btn").click();
    cy.getByData("date-picker-popover").get("button").contains("11").click();
    cy.get("@date-btn")
      .invoke("text")
      .should("match", /^(\d{1,2}) (\w+) \d{4}$/);
    cy.getByData("date-picker-popover").get("button").contains("22").click();
    cy.get("@date-btn")
      .invoke("text")
      .should("match", /^(\d{2}.\d{2}.\d{4}) - (\d{2}.\d{2}.\d{4})$/);
  });
  it("allows for searching by name, city and date", () => {
    cy.getEvent().then((data) => {
      cy.get("@name").type(data.name);
      cy.get("@city-btn").click();
      cy.getByData("city-select-popover")
        .find("input")
        .type(`${data.city}{enter}`);
      cy.get("@submit-btn").click();
      cy.location().should((loc) => expect(loc.pathname).to.eq("/kategorie"));
      cy.url().then((url) => {
        cy.visit(url + "&heldAtFrom=" + format(data.date, "yyyy-MM-dd"));
        cy.getByData("search-results")
          .find("a")
          .first()
          .should("have.attr", "href", `/wydarzenie/${data.slug}`);
      });
    });
  });
  it("allows for searching by ticket availability", () => {
    cy.getEvent({ onlyWithTickets: true }).then((data) => {
      cy.getByData("only-with-tickets-chk").click();
      cy.get("@submit-btn").click();
      cy.getByData("search-results")
        .find("a")
        .first()
        .should("have.attr", "href", `/wydarzenie/${data.slug}`);
    });
  });
});
