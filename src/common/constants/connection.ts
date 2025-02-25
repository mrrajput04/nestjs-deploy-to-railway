export const connection : Connection = {
    CONNECTION_STRING:"MYSQL://23456/agn",
    DB:"MYSQL",
    DB_NAME:"TEST"
}


export type Connection = {
    CONNECTION_STRING: string,
    DB:string,
    DB_NAME:string
}