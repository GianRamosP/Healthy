describe('Golden_path_login.cy', () => {
  it('tests Golden_path_login.cy', () => {
    cy.viewport(1041, 679)
    cy.visit('http://localhost:3000/#/login')
    cy.get('div.mb-3 > input').click()
    cy.get('div.mb-3 > input').type('aldo@gmail.com')
    cy.get('div.mb-4 > input').type('123456')
    cy.get('div:nth-of-type(1) > button').click()
  })
})
