describe('Reservación Funcionalidad', () => {
    beforeEach(() => {
        cy.Login().then(() => {
            cy.visit('https://dreamlab.azurewebsites.net/login', {
                onBeforeLoad: function(window) {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
        }) 
    })

    it('Reserva con requerimientos', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net');
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Social Networking').click();
        cy.contains('Reservar').click();
        cy.contains('Lunes').click();
        cy.get('.grid > :nth-child(n)').then($elements => {
            const randomIndex = Math.floor(Math.random() * $elements.length);
            cy.get('.grid > :nth-child(n)').eq(randomIndex).click();
        });
        cy.contains('Siguiente').click();
        cy.contains('Número de Mesas');
        cy.contains('Número de Personas');
        cy.get(':nth-child(1) > .lg\\\:w-28 > .flex-col > .rounded-tr-xl > .lg\\\:w-6').click();
        cy.get(':nth-child(2) > .lg\\\:w-28 > .flex-col > .rounded-tr-xl > .lg\\\:w-6').click();
        cy.contains("Reservar").click();
        cy.get('.rt-variant-surface').click();
        cy.contains("Reservación creada con exito");
    })
})
