export default () => ({

    type: process.env.TYPE,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DATABASE,
    dbPort: parseInt(process.env.DB_PORT),
    dbUser: process.env.DB_USER,
    password: process.env.PASSWORD,
    port: parseInt(process.env.APP_PORT) || 3000,
    secret: process.env.SECRET,
})
