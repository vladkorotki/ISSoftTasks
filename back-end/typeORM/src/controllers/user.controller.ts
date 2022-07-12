import { AppDataSource } from "../data-source";
import { Persona } from "../entity/Persona";
import "reflect-metadata";
import { json } from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtconfig, generateJwt } from "../jwtconfig"

class UserController {
	async createUser(req, res) {
		try {
			const { username, password, email, phone, address, gender, birth } = req.body;
			const personRepository = AppDataSource.getRepository(Persona);
			const candidate = await personRepository.findOneBy({ email });
			if (candidate) {
				return res.status(400).json({ message: 'Пользователь с таким e-mail уже существует' });
			}
			const hashPassword = bcrypt.hashSync(password, 5);
			const persona = Persona.create({ username, password: hashPassword, email, phone, address, gender, birth });

			await personRepository.save(persona);
			return res.json({ message: "Регистация прошла успешно" });
		}
		catch (error) {
			console.error(console.error());
			return res.status(400).json({ message: 'Ошибка регистрации' });
		}

	}

	async login(req, res) {
		try {
			const { email, password } = req.body;
			const personRepository = AppDataSource.getRepository(Persona);
			const person = await personRepository.findOneBy({ email });
			if (!person) {
				return res.status(400).json({ message: "Не верный email" });
			}
			const decodePassword = bcrypt.compareSync(password, person.password);
			if (!decodePassword) {
				return res.status(400).json({ message: "Не верный пароль" });
			}
			const token = generateJwt(person.id)
			// console.log("user from the db: ", person);
			res.json({ token });
		} catch (error) {

		}
	}

	async updateUser(req, res) {
		try {
			const personRepository = AppDataSource.getRepository(Persona)
			const user = req.body;
			await personRepository.save(user)
			return res.json({ message: "Данные добавлены" })
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