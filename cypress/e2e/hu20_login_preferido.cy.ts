require('@4tw/cypress-drag-drop')

describe('Visualizar Estadisticas Funcionalidad', () => {
    it('Passed', () => {
        cy.viewport(1440, 900);
        cy.visit('https://dreamlab.azurewebsites.net/pattern');
        cy.get('.rt-TextFieldInput').type("A01721881")
        cy.get('.grid > :nth-child(1)').drag('.grid > :nth-child(2)',{force:true});
        cy.get('.grid > :nth-child(2)').drag('.grid > :nth-child(1)')
    })    
})