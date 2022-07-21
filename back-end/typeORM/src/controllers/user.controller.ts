import Router from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

import { AppDataSource } from "../data-source";
import { Persona } from "../entity/Persona";
import "reflect-metadata";
import { json } from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtconfig, generateJwt } from "../jwtconfig"
import { Request, Response } from "express";
import fs from 'fs';
import { Unique } from 'typeorm';

class UserController {

	storage() {
		const storage = multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, 'uploads');
			},
			filename: function (req, file, cb) {
				const name = crypto.randomUUID();
				cb(null, name + path.extname(file.originalname));
			}
		});
		return multer({ storage: storage }).single("NAME");
	}

	async middleware(req, res, next) {
		const filedata = req.file;
		if (!filedata) {
			console.log(("Ошибка при загрузке файла"));
		}
		else {
			console.log("Файл загружен");
			const email: string = req.headers.key;
			const personRepository = AppDataSource.getRepository(Persona);
			const person = await personRepository.findOneBy({ email });
			const avatarUrl = filedata.path;
			personRepository.merge(person, { avatarUrl });
			await personRepository.save(person);

			const file = fs.readFileSync(filedata.path, { encoding: 'base64' });
			const response = res.json(`data:image/png;base64,${file}`);
			return response;
		}
		next();
	}
	async getAvatar(filedataPath: string) {
		const file = fs.readFileSync(filedataPath, { encoding: 'base64' });
		return file;
	}

	async createUser(req: Request, res: Response) {
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

	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const personRepository = AppDataSource.getRepository(Persona);
			const person = await personRepository.findOneBy({ email });
			if (!email) {
				return res.status(400).json();
			}
			if (!person) {
				return res.status(400).json({ message: "Не верный email" });
			}
			const decodePassword = bcrypt.compareSync(password, person.password);
			if (!decodePassword) {
				return res.status(400).json({ message: "Не верный пароль" });
			}
			const token = generateJwt(person.id);

			personRepository.merge(person, { token });
			await personRepository.save(person);
			console.log("user from the db: ", person);
			res.json({
				token,
				email,
			});
		} catch (error) {
			console.error(error);
		}
	}


	async updateUser(req: Request, res: Response) {
		try {
			const personRepository = AppDataSource.getRepository(Persona);
			const user = req.body;
			const email = user.email;
			const person = await personRepository.findOneBy({ email });
			personRepository.merge(person, { ...user });
			await personRepository.save(user);
			return res.json({ message: "Данные добавлены" });
		}
		catch (error) {
			console.error(error);
		}
	}

	async getUsers(req: Request, res: Response) {
		const personRepository = AppDataSource.getRepository(Persona);
		const allPerson = await personRepository.find();
		try {
			for (let i = 0; i < allPerson.length; i++) {
				let file = undefined;
				let person = allPerson[i];
				try {
					if (person.avatarUrl != null) {
						file = fs.readFileSync(person.avatarUrl, { encoding: 'base64' });
						person.avatarUrl = `data:image/png;base64, ${file}`;
					} else {
						file = '../img/avatar/dafaultAvatar.png';
						person.avatarUrl = file;
					}
				} catch (error) {
					file = '../img/avatar/dafaultAvatar.png';
					person.avatarUrl = file;
				}

			}
			return res.json(allPerson);
		}
		catch (error) {
			console.error(error);
			return res.json(allPerson);
		}

	}

	async getUser(req: Request, res: Response) {
		try {
			const email: any = req.headers.email;
			const personRepository = AppDataSource.getRepository(Persona);
			const person = await personRepository.findOneBy({ email });
			let file = undefined;

			try {
				file = fs.readFileSync(person.avatarUrl, { encoding: 'base64' });
				person.avatarUrl = `data:image/png;base64, ${file}`;
			}
			catch (error) {
				file = '../img/avatar/dafaultAvatar.png';
				person.avatarUrl = file;
			}

			console.log("user from the db: ", email);
			return res.json(person);
		}
		catch (error) {
			console.error(error);
		}
	}

	async deleteUser(req, res) {
		let id = req.body;

		try {
			const personRepository = AppDataSource.getRepository(Persona)
			const user = await personRepository.findOneBy(id);
			await personRepository.remove(user);
			res.json(user);
		}
		catch (error) {
			console.error(console.error());
		}
	}

	async deleteUsers(req, res) {
	}
}

export default new UserController();