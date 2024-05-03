describe('Información de Sala', () => {
    beforeEach(() => {
        cy.Login().then(() => {
            cy.visit('https://dreamlab.azurewebsites.net/login', {
                onBeforeLoad: function(window) {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
        }) 
    })

    it('Información de Sala Funcionalidad', () => {
        cy.visit('https://dreamlab.azurewebsites.net')
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Lego Room').click();
        cy.contains('Espacio creativo para estudiantes del área, con reserva previa para construir y diseñar con bloques Lego.');
    })

    it('Información de Sala Compatibilidad', () => {
        cy.visit('https://dreamlab.azurewebsites.net')
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Lego Room').click({force: true});
        cy.contains('Espacio creativo para estudiantes del área, con reserva previa para construir y diseñar con bloques Lego.');
    })

})