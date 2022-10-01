// @ts-ignore
describe("header", () => {
  it("should show a header bar with some buttons", () => {
    cy.visit("/");
    cy.get(".navbar").should("be.visible");

    cy.get('[data-test="link-home"]').contains("Home");
    cy.get('[data-test="link-planet"]').contains("Planet");
    cy.get('[data-test="link-spaceship"]').contains("Spaceship");
  });
});
