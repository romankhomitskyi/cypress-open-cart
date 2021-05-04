// @ts-check
import '@testing-library/cypress/add-commands';
///<reference path="../global.d.ts" />
import * as url from "url";

Cypress.Commands.add('loginByApi', () => {

  Cypress.log({
    name: 'loginByForm',
    message: `${Cypress.env("username")} | ${Cypress.env("password")}`,
  });

  const options: Partial<Cypress.RequestOptions> = {
    method: 'POST',
    url: `/${Cypress.env("adminUrl")}`,
    form: true,
    followRedirect: false,
    body: {
      username: Cypress.env("username"),
      password: Cypress.env("password"),

    },
    qs: {
      route: 'common/login'
    },

  };

  cy.request(options).then(response => {
    console.log('RESPONSE', response);

    if (!response.redirectedToUrl) {
      return Cypress.log({

        message: `${'URL IS INCORRECT'} | URL is ${response.redirectedToUrl}`,
      });
    }

    const token = url.parse(response.redirectedToUrl, true).query.user_token;
    console.log('TOKEN ', token);
    if (!token || typeof token !== 'string') {
      return Cypress.log({

        message: `${'TOKEN IS INCORRECT'} |  Token is ${token}`,
      });
    }
    cy.wrap(token).as('token1');

    cy.request({
      method: 'GET',
      followRedirect: false,
      url: `/${Cypress.env("adminUrl")}`,
      qs: {
        route: 'common/login',
        user_token: token,
      }
    });

    cy.intercept({
      method: 'GET',
      url: `/${Cypress.env('adminUrl')}`,
      query: {
        route: 'extension/dashboard/chart/chart',
        user_token: token,
        range: 'month'
      }
    },
      { fixture: 'orders' }).as('charts');


    cy.visit(`/${Cypress.env('adminUrl')}`, {
      qs: {
        route: 'common/dashboard',
        user_token: token
      }
    });

    cy.wait('@charts');
  });
});

Cypress.Commands.add("database", (operation, item, entity) => {
  const params = {
    entity,
    item
  };

  const log = Cypress.log({
    name: "database",
    displayName: "DATABASE",
    message: [`🔎 ${operation} within ${entity} data`],
    // @ts-ignore
    autoEnd: false,
    consoleProps() {
      return params;
    },
  });

  return cy.task(`${operation}`, params).then((data) => {
    log.snapshot();
    log.end();
    return data;
  });
});

