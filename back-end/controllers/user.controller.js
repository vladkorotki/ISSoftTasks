
import pool from "../db.js";
class UserController {
	async createUser(req, res) {
		// const { id, username, email, phone, address, gender, birth } = req.body;
		// const newPerson = await pool.query(`INSERT INTO person (id, username, email, phone, address, gender, birth) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [id, username, email, phone, address, gender, birth]);
		const { username, password, email, phone, address, gender, birth } = req.body;
		const newPerson = await pool.query(`INSERT INTO person (username, password, email, phone, address, gender, birth) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [username, password, email, phone, address, gender, birth]);

		res.json(newPerson.rows[0]);
		console.log(username, email);

	}

	async getUsers(req, res) {
		const users = await pool.query(`select * FROM person`);
		res.json(users.rows);
	}

	async getUser(req, res) {
		const id = req.params.id;
		const user = await pool.query(`select * FROM person where id = $1`, [id]);
		res.json(user.rows[0]);
	}

	async updateUser(req, res) {
		const { id, username, phone, address, gender, birth } = req.body;
		const user = await pool.query(`UPDATE person set username = $1, phone = $2, address = $3, gender = $4, birth = $5 where id = $6 RETURNING *`, [username, phone, address, gender, birth, id]);
		res.json(user.rows[0]);
	}

	async deleteUser(req, res) {

	}

	async deleteUsers(req, res) {

	}


}

export default new UserController();