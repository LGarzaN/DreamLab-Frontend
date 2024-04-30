describe('Información de Sala Funcionalidad', () => {
    it('Passed', () => {
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Lego Room').click();
        cy.contains('Espacio creativo para estudiantes del área, con reserva previa para construir y diseñar con bloques Lego.');
    })})

describe('Información de Sala Compatibilidad', () => {
    it('Passed', () => {
        cy.viewport('iphone-8');
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Lego Room').click({force: true});
        cy.contains('Espacio creativo para estudiantes del área, con reserva previa para construir y diseñar con bloques Lego.');
    })})