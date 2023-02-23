import { Response } from "express";

interface IConstant {
	status: number,
	code: number,
	title: string,
	description: string
}

export const responseBuilder = (res: Response, type : "error" | "success", constant : IConstant, data ?: unknown) => {

	switch (type) {

	case "error":
		return res.status(constant.status).json({
			status: constant.status,
			error: {
				code: constant.code,
				title: constant.title,
				description: constant.description
			}
		});
	case "success":
		return res.status(constant.status).json({
			status: constant.status,
			success: {
				code: constant.code,
				title: constant.title,
				description: constant.description,
				data
			}
		});
		
	}

};