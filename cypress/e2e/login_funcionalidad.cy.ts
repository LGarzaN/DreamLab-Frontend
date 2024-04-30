describe('Credenciales Correctas', () => {
  it('passes', () => {
    cy.visit('https://dreamlab.azurewebsites.net/login');
    cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
    cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
    cy.contains('Iniciar sesión').click();
    cy.wait(5000);
    cy.contains('Sumérgete en la educación del futuro');
  })
})

describe('Credenciales Incorrectas', () => {
  it('passes', () => {
    cy.visit('https://dreamlab.azurewebsites.net/login');
    cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
    cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('aaa');
    cy.contains('Iniciar sesión').click();
    cy.wait(4000);
    cy.contains('Error');
  })
})

describe('Credencial faltante', () => {
  it('passes', () => {
    cy.visit('https://dreamlab.azurewebsites.net/login');
    cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
    cy.contains('Iniciar sesión').click();
    cy.wait(500);
    cy.contains('Por favor llena todos los campos');
  })
})


