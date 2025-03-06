import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    database: "postgres",
    port: 5432,
    username: "postgres",
    password: "root",
    entities: ["dist/**/*.entity.js"],
    synchronize: false,
    migrations: ['dist/db/migrations/*.js']
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource;
