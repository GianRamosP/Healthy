describe("Happy_path_register.cy", () => {
  it("tests Happy_path_register.cy", () => {
    cy.viewport(791, 679);
    cy.visit("http://localhost:3000/#/register");
    cy.get("div:nth-of-type(1) > input").click();
    cy.get("div:nth-of-type(1) > input").type("P");
    cy.get("div:nth-of-type(1) > input").type("Pedro G");
    cy.get("div:nth-of-type(1) > input").type("Pedro G");
    cy.get("div:nth-of-type(1) > input").type("Pedro Gó");
    cy.get("div:nth-of-type(1) > input").type("Pedro Gómez");
    cy.get("div:nth-of-type(2) > input").type("pedro@");
    cy.get("div:nth-of-type(2) > input").type("pedro@gmail.com");
    cy.get("div:nth-of-type(3) > input").type("123456");
    cy.get("div.mb-4 > input").click();
    cy.get("div.mb-4 > input").type("123456");
    cy.get("button").click();
  });
});
