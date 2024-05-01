describe('Hacer Reserva de Sala Funcionalidad', () => {
    it('Passed', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Social Networking').click();
        cy.contains('Reservar').click();
        cy.contains('Mañana').click();
        cy.get('.grid > :nth-child(n)').then($elements => {
            const randomIndex = Math.floor(Math.random() * $elements.length);
            cy.get('.grid > :nth-child(n)').eq(randomIndex).click();
        });
        cy.contains('Siguiente').click();
        cy.get(':nth-child(1) > .lg\\\:w-28 > .flex-col > .rounded-tr-xl > .lg\\\:w-6').click();
        cy.get(':nth-child(2) > .lg\\\:w-28 > .flex-col > .rounded-tr-xl > .lg\\\:w-6').click();
        cy.contains("Reservar").click();
        cy.contains("Reservación realizada con éxito");
    })
})