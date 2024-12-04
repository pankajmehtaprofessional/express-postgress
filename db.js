const Sequelize = require("sequelize")

let sequelize;

(async () => {

    
    try {
            sequelize = new Sequelize(
                process.env.DB_NAME, // Database
                process.env.DB_USER, // username
                process.env.DB_PASS, // password
                {
                    host: process.env.DB_HOST, // host
                    dialect: process.env.DB_DIALECT/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
                }
            );
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();

module.exports = sequelize;