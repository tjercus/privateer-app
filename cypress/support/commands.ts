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

const getBySel = (selector: any, ...args: any[]) =>
  cy.get(`[data-test=${selector}]`, ...args);
Cypress.Commands.add("getBySel", getBySel);
// @ts-ignore
cy.getBySel = getBySel;

const getBySelLike = (selector: any, ...args: any[]) =>
  cy.get(`[data-test*=${selector}]`, ...args);
Cypress.Commands.add("getBySelLike", getBySelLike);
// @ts-ignore
cy.getBySelLike = getBySelLike;

const selectShouldHaveText = (selector: any, text: any, ...args: any[]) =>
  cy.get(`${selector} option:selected`, ...args).should("have.text", text);
Cypress.Commands.add("selectShouldHaveText", selectShouldHaveText);
// to make sure Intellij understands the extension we also assign it directly
// @ts-ignore
cy.selectShouldHaveText = selectShouldHaveText;

const textInputShouldHaveLength = (selector: any, length: number) => {
  cy.get(selector).should(($input) => {
    expect($input.val()).to.have.length(length);
  });
};
Cypress.Commands.add("textInputShouldHaveLength", textInputShouldHaveLength);
// @ts-ignore
cy.textInputShouldHaveLength = textInputShouldHaveLength;

export {};
