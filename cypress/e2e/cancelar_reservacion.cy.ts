describe('Cancelar Reservación Funcionalidad', () => {
    it('Passed', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Reservaciones').click();
        cy.get('[aria-controls="radix-:r2v:"] > .justify-center > .rounded-lg').click();
        cy.contains("Cancelar Reservación").click();
        cy.contains("Reservación Cancelada con exito!");
    })
})

describe('Cancelar Reservación Compatibilidad', () => {
    it('Passed', () => {
        cy.viewport("iphone-xr");
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.get('.w-\\\[40px\\\]').click();
        cy.contains('Reservaciones').click({force:true});
        cy.contains('Social Networking').click();
        cy.contains("Cancelar Reservación").click();
        cy.contains("Reservación Cancelada con exito!");
    })
})