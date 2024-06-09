describe('Cancelar Reservación Funcionalidad', () => {
    it('Passed', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('a01721881');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('hola123');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Reservaciones').click();
        cy.wait(2000)
        cy.contains('Social Networking').click();
        cy.contains("Cancelar Solicitud").click({force:true});
        cy.contains("Solicitud cancelada");
    })
})
