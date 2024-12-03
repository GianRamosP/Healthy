describe("Unhappy_path_register", () => {
  it("tests Unhappy_path_register", () => {
    cy.viewport(1005, 627);
    cy.visit("http://localhost:3000/#/register");
    cy.get("div:nth-of-type(1) > input").click();
    cy.get("div:nth-of-type(1) > input").type("Amy paredes");
    cy.get("div:nth-of-type(2) > input").type("amy@");
    cy.get("div:nth-of-type(2) > input").type("amy@gmail.com");
    cy.get("div:nth-of-type(3) > input").type("123456gian");
    cy.get("div:nth-of-type(3) > input").type("123456");
    cy.get("div.mb-4 > input").type("123456");
    cy.get("button").click();
  });
});
