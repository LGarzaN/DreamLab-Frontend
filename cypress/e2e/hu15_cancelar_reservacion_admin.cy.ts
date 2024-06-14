describe('Cancelar Reservación Admin', () => {
    it('Passed', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.wait(2000)
        cy.contains('Reservaciones').click();
        cy.wait(2000)
        cy.contains('Deep Net').click();
        cy.contains("Cancelar Reserva").click({force:true});
        cy.contains("Reservación cancelada");
    })
})
