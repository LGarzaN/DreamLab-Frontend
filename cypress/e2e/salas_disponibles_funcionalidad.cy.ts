describe('Salas disponibles General', () => {
    it('Passed', () => {
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.scrollTo('bottom');
    })})

describe('Salas disponibles Espacios Abiertos', () => {
    it('Passed', () => {
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Espacios Abiertos').click();
        cy.contains('Social Networking');
        cy.contains('Lego Room');
    })})
    
describe('Salas disponibles Garage Valley', () => {
    it('Passed', () => {
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Garage Valley').click();
        cy.contains('Electric Garage');
        cy.contains('Dimension Forge');
        cy.contains('New Horizons');
        cy.contains('Deep Net');
        cy.contains('Graveyard');
        cy.contains('PCB Factory');
        cy.contains('The Matrix');
    })})

describe('Salas disponibles Zona de Xploracion', () => {
    it('Passed', () => {
        cy.visit('https://dreamlab.azurewebsites.net/login');
        cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
        cy.contains('Iniciar sesión').click();
        cy.contains('Sumérgete en la educación del futuro');
        cy.contains('Zona de Xploracion').click()
        cy.contains('Hack-Battlefield');
        cy.contains('Testing-Land');
        cy.contains('War Headquarter');
        cy.contains('Biometrics Flexible');
        cy.contains('Beyon-Digits');
        cy.contains('Open Innovation Lab');
    })})

    describe('Buscar Sala Disponible', () => {
        it('Passed', () => {
            cy.visit('https://dreamlab.azurewebsites.net/login');
            cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
            cy.get('.mt-4 > .rt-TextFieldRoot > .rt-TextFieldInput').type('admin');
            cy.contains('Iniciar sesión').click();
            cy.contains('Sumérgete en la educación del futuro');
            cy.get('.mb-6 > .flex').type('Social')
            cy.contains('Social Networking')
        })})