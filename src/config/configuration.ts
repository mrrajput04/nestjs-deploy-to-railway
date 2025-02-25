export default () =>({
    type:process.env.TYPE,
    dbHost:process.env.DB_HOST,
    database:process.env.DATABASE,
    dbPort:parseInt(process.env.DB_PORT),
    username:process.env.USERNAME,
    password:process.env.PASSWORD,
})