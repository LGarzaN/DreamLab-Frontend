describe('Consulta salas disponibles con asistente virtual', () => {
    it('Passed', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('a01721881');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('hola123');
        cy.contains('Iniciar sesión').click();
        cy.contains('Reserva Ahora').click();
        cy.wait(25000)
        cy.contains("¿Hola!, ¿Cómo te puedo ayudar?");
        cy.get('.rt-TextFieldInput').type("Quiero reservar para mañana en el Lego Room a las 6pm");
        cy.get('.rt-TextFieldRoot > .z-10').click()
        cy.wait(30000)
        cy.get('.rt-TextFieldInput').type("Si");
        cy.get('.rt-TextFieldRoot > .z-10').click()
        cy.wait(30000)
        cy.get('.rt-TextFieldInput').type("1 hora y una compu mac");
        cy.get('.rt-TextFieldRoot > .z-10').click()
        cy.wait(30000)
        cy.contains("ha sido creada")
        cy.get('.rt-TextFieldInput').type("Me puedes mostrar mis reservas");
        cy.get('.rt-TextFieldRoot > .z-10').click()
        cy.wait(30000)
        cy.contains("Lego Room")
    })
})
