describe('Salas disponibles', () => {
    beforeEach(() => {
        cy.Login().then(() => {
            cy.visit('https://dreamlab.azurewebsites.net/login', {
                onBeforeLoad: function(window) {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
        }) 
    })

    it('Passed Salas Disponibles General', () => {
        cy.visit('https://dreamlab.azurewebsites.net');
        cy.contains('Sumérgete en la educación del futuro');
        cy.scrollTo('bottom');
    })

    it('Salas Disponibles Espacios Abiertos', () => {
        cy.visit('https://dreamlab.azurewebsites.net');
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Espacios Abiertos').click();
        cy.contains('Social Networking');
        cy.contains('Lego Room');
    })

    it('Salas Disponibles Garage Valley', () => {
        cy.visit('https://dreamlab.azurewebsites.net');
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Garage Valley').click();
        cy.contains('Electric Garage');
        cy.contains('Dimension Forge');
        cy.contains('New Horizons');
        cy.contains('Deep Net');
        cy.contains('Graveyard');
        cy.contains('PCB Factory');
        cy.contains('The Matrix');
    })

    it('Salas Disponibles Zona de Xploración', () => {
        cy.visit('https://dreamlab.azurewebsites.net');
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Zona de Xploracion').click()
        cy.contains('Hack-Battlefield');
        cy.contains('Testing-Land');
        cy.contains('War Headquarter');
        cy.contains('Biometrics Flexible');
        cy.contains('Beyon-Digits');
        cy.contains('Open Innovation Lab');
    })

    it('Buscar Sala Disponible', () => {
        cy.visit('https://dreamlab.azurewebsites.net');
        cy.contains('Sumérgete en la educación del futuro');
        cy.get('.mb-6 > .flex').type('Social')
        cy.contains('Social Networking')
    })


})

