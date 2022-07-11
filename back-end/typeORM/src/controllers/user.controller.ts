import { AppDataSource } from "../data-source";
import { Persona } from "../entity/Persona";
import "reflect-metadata";
import { json } from "body-parser";
class UserController {
	async createUser(req, res) {
		try {
			const { username, password, email, phone, address, gender, birth } = req.body;
			const persona = Persona.create({ username, password, email, phone, address, gender, birth });
			const personRepository = AppDataSource.getRepository(Persona)
			await personRepository.save(persona)
			return res.json(persona)
		}
		catch (error) {
			console.error(console.error());
		}

	}

	async getUsers(req, res) {
		try {
			const personRepository = AppDataSource.getRepository(Persona)
			const allPerson = await personRepository.find()
			console.log("All users from the db: ", allPerson)
			res.json(allPerson);
		}
		catch (error) {
			console.error(console.error());
		}

	}

	async getUser(req, res, id: any) {
		try {
			const personRepository = AppDataSource.getRepository(Persona)
			const person = await personRepository.findOneBy({ id: id })
			console.log("user from the db: ", person)
			res.json(person);
		}
		catch (error) {
			console.error(console.error());
		}

	}

	async updateUser(req, res) {
		try {
			const personRepository = AppDataSource.getRepository(Persona)
			const user = req.body;
			await personRepository.save(user)
			return res.json(user)
		}
		catch (error) {
			console.error(console.error());
		}

	}

	async deleteUser(req, res) {
		let id = req.body;
		console.log(id);
		console.log(typeof id);
		try {
			const personRepository = AppDataSource.getRepository(Persona)
			const user = await personRepository.findOneBy(id)
			console.log(user);
			await personRepository.remove(user);
			res.json(user)
		}
		catch (error) {
			console.error(console.error());
		}

	}

	async deleteUsers(req, res) {

	}


}

export default new UserController();