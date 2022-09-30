
// @ts-ignore
describe("planet edit", () => {
  it("should show a form with a planet in it", () => {
    cy.visit("/planet/edit/1234abcd-bdb8-4e48-abda-5d862199184a");
    cy.get('h2').should("be.visible").contains("Planet Form View");
  });
});