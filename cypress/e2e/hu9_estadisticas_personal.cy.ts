describe('Estadisticas Personal', () => {
    it('Passed', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('a01721881');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('hola123');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.get('.w-\\\[45px\\\]').click()
        cy.contains("Estadísticas")
    })
})
