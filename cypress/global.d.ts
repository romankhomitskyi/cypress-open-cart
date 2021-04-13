/// <reference types="cypress" />

declare namespace Cypress {




  type dbQueryArg = {
    entity: string;
    query: object | [object];
  };

  interface Chainable {

    /**
     * Logs-in user by using UI
     */
    login(): Chainable<Response>;



    /**
     * Logs-in user by using API request
     */
    loginByApi(): Chainable<Response>;

    database(operation: string, entity: string, item: string, log?: boolean): Chainable<any[]>;
  }
}
