describe("Happy_path_login", () => {
  it("tests Happy_path_login", () => {
    cy.viewport(1005, 627);
    cy.visit("http://localhost:3000/");
    cy.get("div.mb-3 > input").click();
    cy.get("div.mb-3 > input").type("ernesto@test.com");
    cy.get("div.mb-4 > input").click();
    cy.get("div.mb-4 > input").type("123456");
    cy.get("div:nth-of-type(1) > button").click();
    cy.get("div.sidebar-nav div:nth-of-type(1) > a").click();
  });
});
