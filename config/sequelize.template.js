/**
 * Rename to sequelize.config.js and set the values to your database configuration.
 */
modules.export = {
    database: "",
    username: "",
    password: "",
    options: {
        host: "localhost",
        dialect: "mysql" | "sqlite" | "postgres" | "mssql",
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        // SQLite only
        storage: "path/to/database.sqlite"
    }
};
