describe('Compatibilidad Credenciales Correctas', () => {
  it('Login en Dispositivo Movil', () => {
    cy.viewport('iphone-8');
    cy.visit('https://dreamlab.azurewebsites.net/login');
    cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
    cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
    cy.contains('Iniciar sesión').click();
    cy.contains('Sumérgete en la educación del futuro');
  })})

describe('Compatibilidad Credenciales Incorrectas', () => {
  it('Login en Dispositivo Movil', () => {
    cy.viewport('iphone-8');
    cy.visit('https://dreamlab.azurewebsites.net/login');
    cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
    cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('aaa');
    cy.contains('Iniciar sesión').click();
    cy.contains('Error');
  })})

describe('Compatibilidad Credenciales faltantes', () => {
  it('Login en Dispositivo Movil', () => {
    cy.viewport('iphone-8');
    cy.visit('https://dreamlab.azurewebsites.net/login');
    cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
    cy.contains('Iniciar sesión').click();
    cy.contains('Por favor llena todos los campos');
  })})


