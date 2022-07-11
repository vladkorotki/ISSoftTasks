import "reflect-metadata"
import { DataSource } from "typeorm"
import { Persona } from "./entity/Persona"

export const AppDataSource = new DataSource({

    synchronize: true,
    logging: false,
    entities: [Persona],
    // entities: [__dirname + "/entity/*.{js,ts}"],
    migrations: [Persona],
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "typeorm_base",
})
