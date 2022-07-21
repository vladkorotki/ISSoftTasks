import { AppDataSource } from "./data-source";
import express from "express";
import path from 'path';
// import routerAvatar from "./routes/avatar.router";
import routerUser from './routes/user.router';
import cors from "cors";
import fs from 'fs';

// const __dirname = path.resolve();
const PORT = 5501;
const app = express();

app.use(express.static(path.resolve(__dirname, 'uploads')));
app.use(express.json());
app.use(cors({
    // origin: 'http://127.0.0.1:5500',
    // origin: ['http://localhost:5500/', 'http://localhost:5500/user'],
    // credentials: true,
}));


async function main() {
    try {
        let initialize = await AppDataSource.initialize();
        
        app.use('/api', routerUser);
        // app.use('/', routerAvatar);

        app.use(function (request, response) {
            response.send("<h2>Hello</h2>");
        });

        app.listen(PORT, () => console.log(`server started ${PORT}`));
    }
    catch (error) {
        console.error(error);

    }



}
main();


// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...");
//     const persona = new Persona();
//     persona.username = "vlad";
//     persona.password = "rdvuiewPRO92";
//     persona.email = "vlad_korotki@mail.ru";
//     persona.phone = "2223344";
//     persona.address = "Minsk";
//     persona.gender = "male";
//     persona.birth = "1992-05-13";

//     await AppDataSource.manager.save(persona);

//     console.log("Saved a new user with id: " + persona.id);


//     console.log("Loading users from the database...");
//     const users = await AppDataSource.manager.find(Persona);


//     console.log("Loaded users: ", persona);

//     console.log("Here you can setup and run express / fastify / any other framework.");

// }).catch(error => console.log(error));
