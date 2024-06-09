describe('Visualizar Estadisticas Funcionalidad', () => {
    it('Passed General', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.wait(2000);
        cy.get('.w-\\\[45px\\\]').click();
        cy.contains("Estadisticas");
        cy.contains("Reservaciones Canceladas");
        cy.contains("Reservaciones Tardias");
    })

    it('Passed Espacios Abiertos', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.wait(2000);
        cy.get('.w-\\\[45px\\\]').click();
        cy.contains("Espacios Abiertos").click();
        cy.contains("Reservaciones Canceladas");
        cy.contains("Reservaciones Tardias");
    })

    it('Passed Garage Valley', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.wait(2000);
        cy.get('.w-\\\[45px\\\]').click();
        cy.contains("Garage valley").click();
        cy.contains("Reservaciones Canceladas");
        cy.contains("Reservaciones Tardias");
    })

    it('Passed Zona de X-ploracion', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.wait(2000);
        cy.get('.w-\\\[45px\\\]').click();
        cy.contains("Zona de X-ploracion").click();
        cy.contains("Reservaciones Canceladas");
        cy.contains("Reservaciones Tardias");
    })
})