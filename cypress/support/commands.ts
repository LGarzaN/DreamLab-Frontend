

Cypress.Commands.add("Login", () => {
    cy.fixture('login').then((data)=> {
    
        cy.request("POST", "https://dreamlab.azurewebsites.net/api/login", data)        
        .then(function(resp){        
            expect(resp.status).to.eq(200)            
            Cypress.env('token', resp.body.token)        
        })    
    })    
})
    
    