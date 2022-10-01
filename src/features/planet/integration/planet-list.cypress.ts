// @ts-ignore
describe("planets list", () => {
  it("should show a list of planets", () => {
    cy.visit("/planet");
    cy.get("article").should("be.visible");

    cy.get("thead > tr > :nth-child(1)").contains("Name");
    cy.get("thead > tr > :nth-child(2)").contains("Coordinates");
    cy.get("thead > tr > :nth-child(3)").contains("Actions");

    cy.get('table [data-test="link-planet"]:first'); //.should("have.attr", "href", "http://localhost:3000/planet/edit/1234abcd-bdb8-4e48-abda-5d862199184a");
    cy.get('table [data-test="link-planet"]:last'); //.should("have.attr", "href", "http://localhost:3000/planet/edit/5678dcba-6884-411d-88f1-94d3fd4deed6");

    cy.get(
      ':nth-child(1) > :nth-child(3) > [data-test="btn-delete-planet"]'
    ).contains("Delete");
    cy.get(
      ':nth-child(2) > :nth-child(3) > [data-test="btn-delete-planet"]'
    ).contains("Delete");

    cy.get('[data-test="btn-add-planet"]').contains("Add a planet").click();
    cy.get('[data-test="form-planet"]').should("be.visible");
  });
});
