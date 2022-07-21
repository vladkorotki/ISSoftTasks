import { NextFunction, Request, Response } from "express";
import { jwtconfig } from "../jwtconfig";
import jwt from "jsonwebtoken";


export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
	const token: string = req.headers.authorization.split(' ')[1];
	try {
		const jwtPayload = await jwt.verify(token, jwtconfig.secret);
	} catch (error) {
		res.status(401).json({ message: "Время вышло" })
		console.error(error);
	}
	next();
}