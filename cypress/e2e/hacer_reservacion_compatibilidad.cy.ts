describe('Reservación Funcionalidad', () => {
    beforeEach(() => {
        cy.Login().then(() => {
            cy.visit('https://dreamlab.azurewebsites.net/login', {
                onBeforeLoad: function(window) {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
        }) 
    })

    it('Reserva con toda la información correcta', () => {
        cy.viewport("iphone-6+");
        cy.visit('https://dreamlab.azurewebsites.net');
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Social Networking').click({force:true});
        cy.contains('Reservar').click();
        cy.contains('Lunes').click();
        cy.get('.grid > :nth-child(n)').then($elements => {
            const randomIndex = Math.floor(Math.random() * $elements.length);
            cy.get('.grid > :nth-child(n)').eq(randomIndex).click();
        });
        cy.contains('Siguiente').click();
        cy.get(':nth-child(1) > .lg\\\:w-28 > .flex-col > .rounded-tr-xl > .lg\\\:w-6').click();
        cy.get(':nth-child(2) > .lg\\\:w-28 > .flex-col > .rounded-tr-xl > .lg\\\:w-6').click();
        cy.contains("Reservar").click();
        cy.contains("Reservación realizada con éxito");
    })

    it('Reserva sin Horario', () => {
        cy.viewport("iphone-6+");
        cy.visit('https://dreamlab.azurewebsites.net');
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Social Networking').click({force:true});
        cy.contains('Reservar').click();
        cy.contains('Lunes').click();
        cy.contains('Siguiente').click();
        cy.contains('Favor de seleccionar un Horario');
    })

    it('Reserva sin Requerimientos', () => {
        cy.viewport("iphone-6+");
        cy.visit('https://dreamlab.azurewebsites.net');
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Social Networking').click({force:true});
        cy.contains('Reservar').click();
        cy.contains('Lunes').click();
        cy.get('.grid > :nth-child(n)').then($elements => {
            const randomIndex = Math.floor(Math.random() * $elements.length);
            cy.get('.grid > :nth-child(n)').eq(randomIndex).click();
        });
        cy.contains('Siguiente').click();
        cy.contains("Reservar").click();
        cy.contains("Favor de seleccionar los requerimientos necesarios");
    })
    


})