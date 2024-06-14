describe('Videowall', () => {
    it('Mapa', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.viewport(3840, 1080);
        cy.visit('https://dreamlab.azurewebsites.net/videowall');
        cy.contains('Social Networking')
        cy.contains('0/5')
    })
})