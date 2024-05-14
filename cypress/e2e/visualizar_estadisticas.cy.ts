describe('Visualizar Estadisticas Funcionalidad', () => {
    it('Passed', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.get('.w-\\\[45px\\\]').click();
        cy.contains("Estadísticas");
        cy.contains("Reservaciones");
        cy.contains("Horas de Aprendizaje");
        cy.contains("Áreas Descubiertas");
    })
})

describe('Visualizar Estadisticas Compatibilidad', () => {
    it('Passed', () => {
        cy.viewport('iphone-xr');
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.get('.w-\\\[40px\\\]').click();
        cy.contains("Reservaciones").click({force:true});
        cy.contains("Estadísticas");
        cy.contains("Reservaciones");
        cy.contains("Horas de Aprendizaje");
        cy.contains("Áreas Descubiertas");
    })
})