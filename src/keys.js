module.exports = {
    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER || 'youruser',
        password: process.env.DATABASE_PASSWORD || 'yourpassword',
        database: process.env.DATABASE_NAME || 'db_reports'
    }
};