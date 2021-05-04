/// <reference types="cypress" />

declare namespace Cypress {


  interface Chainable {

    /**
     * Logs-in user by using UI
     */
    login(): Chainable<Response>;



    /**
     * Logs-in user by using API request
     */
    loginByApi(): Chainable<Response>;

    database(operation: string, item: string, entity?: string, log?: boolean): Chainable<any[]>;
  }
}
