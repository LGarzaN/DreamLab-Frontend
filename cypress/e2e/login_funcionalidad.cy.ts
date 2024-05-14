describe('Login Funcionalidad', () => {
  it('Credenciales Correctas', () => {
    cy.visit('https://dreamlab.azurewebsites.net/login');
    cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
    cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
    cy.contains('Iniciar sesión').click();
    cy.contains('Sumérgete en la educación del futuro');
  })

  it('Credenciales Incorrectas', () => {
    cy.visit('https://dreamlab.azurewebsites.net/login');
    cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
    cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('aaa');
    cy.contains('Iniciar sesión').click();
    cy.contains('Error');
  })

  it('Credencial Faltante', () => {
    cy.visit('https://dreamlab.azurewebsites.net/login');
    cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
    cy.contains('Iniciar sesión').click();
    cy.contains('Por favor llena todos los campos');
  })
})



