
import jwt from "jsonwebtoken";
export const jwtconfig = {
	secret: "a"
}

export const generateJwt = (id) => {
	const payload = {
		id,
	}
	return jwt.sign(payload, jwtconfig.secret, { expiresIn: 10 })
}