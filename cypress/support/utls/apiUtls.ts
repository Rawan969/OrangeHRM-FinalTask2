import { method } from "cypress/types/bluebird";
declare global{
    namespace Cypress{
        interface Chainable{
            apis: (Method: string, requestUrl: string, Payload: any) => Chainable<any>
        }
    }
}

Cypress.Commands.add('apis', (Method: string, requestUrl: string, Payload: any) => {
     return cy.request({
        method: Method,
        url: requestUrl,
        body: Payload,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .its('body')
})
 