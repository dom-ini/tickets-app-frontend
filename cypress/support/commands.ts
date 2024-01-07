/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { AUTH_COOKIE_KEY } from "../../src/lib/constants";

type EventData = {
  name: string;
  place: string;
  city: string;
  date: Date;
  slug: string;
};

type GetEventOptions = {
  onlyWithTickets?: boolean;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
      getEvent({ onlyWithTickets }?: GetEventOptions): Chainable<EventData>;
      logout(): Chainable<void>;
      loginFromApi(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("getByData", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getEvent", (options) => {
  const withTickets = options && options.onlyWithTickets;
  const url = `${Cypress.env("apiUrl")}/events${
    withTickets ? "?only_with_available_tickets=true" : ""
  }`;
  return cy.request("GET", url).then((res) => {
    const event = res.body.items[0];
    return {
      name: event.name,
      place: event.location.name,
      city: event.location.city,
      date: new Date(event.held_at),
      slug: event.slug,
    };
  });
});

Cypress.Commands.add("loginFromApi", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/auth/login`,
    form: true,
    body: {
      username: Cypress.env("testUsername"),
      password: Cypress.env("testPassword"),
    },
  }).then((res) => {
    const token = res.body.access_token;
    cy.setCookie(AUTH_COOKIE_KEY, token);
  });
});

Cypress.Commands.add("logout", () => {
  cy.clearCookie(AUTH_COOKIE_KEY);
});
