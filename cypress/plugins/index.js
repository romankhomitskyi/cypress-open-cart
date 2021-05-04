/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const mysql = require('mysql2')
/**
 * @type {Cypress.PluginConfig}
 */
/*module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}*/

// in plugins/index.js

// the connection strings for different databases could
// come from a config file, or from environment variables

// querying the database from Node
function queryDB(connectionInfo, query) {
  const connection = mysql.createConnection(connectionInfo)

  connection.connect()

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error)
      }

      connection.end()

      return resolve(results)
    })
  })
}

module.exports = (on, config) => {
  on('task', {
    // destructure the argument into the individual fields
    queryDatabase({ query }) {
      const connectionInfo = config.env.opencartDb;

      if (!connectionInfo) {
        throw new Error(`Do not have DB connection under name ${dbName}`)
      }

      return queryDB(connectionInfo, query)
    },

    deleteData({ item, entity }) {
      const connectionInfo = config.env.opencartDb;

      const query = `DELETE FROM opencart.${entity} WHERE NAME LIKE "${item}";`

      if (!connectionInfo) {
        throw new Error(`Do not have DB connection under name ${dbName}`)
      }

      return queryDB(connectionInfo, query)
    },
    getCategoryParentId({ item, entity }) {


      const connectionInfo = config.env.opencartDb;

      const query = `SELECT category_id from opencart.oc_category_description pd WHERE NAME LIKE "${item}";`

      if (!connectionInfo) {
        throw new Error(`Do not have DB connection under name ${dbName}`)
      }

      return queryDB(connectionInfo, query)
    }
  })
}

