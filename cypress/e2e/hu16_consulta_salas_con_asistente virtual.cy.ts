describe('Consulta salas disponibles con asistente virtual', () => {
    it('Passed', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('a01721881');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('hola123');
        cy.contains('Iniciar sesión').click();
        cy.contains('Reserva Ahora').click();
        cy.wait(15000)
        cy.contains("¿Hola!, ¿Cómo te puedo ayudar?");
        cy.get('.rt-TextFieldInput').type("Me puedes decir cuales salas hay");
        cy.get('.rt-TextFieldRoot > .z-10').click()
        cy.wait(10000)
        cy.contains("Espacios Abiertos:")
        cy.contains("Social Networking")
        cy.contains("Zonas de X-Ploración:")
    })
})
