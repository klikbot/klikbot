import { responseBuilder } from "../helpers/responseBuilder";
import { IUser } from "../interfaces/IUser";
import { Request, Response } from "express";
import { success } from "../constants/en/success";
import { error } from "../constants/en/error";
import userService from "../service/user.service";

class UserController {

	public async createUser(req: Request, res: Response) {

		const user : IUser = req.body.user;

		try {

			const newUser = await userService.create(user);
			
			return responseBuilder(res, "success", success.userCreatedSuccessfully, newUser);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToCreateUser);
		
		}
	
	}

	public async getUser(req: Request, res: Response) {

		const cellphone : string = req.params.cellphone;

		try {

			const user = await userService.getByCellphone(cellphone);

			if (!user) {

				return responseBuilder(res, "error", error.userNotFound);
			
			}

			return responseBuilder(res, "success", success.userFoundSuccessfully, user);
        
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetUser);
        
		}
    
	}

	public async getAllUsers(req: Request, res: Response) {
        
		try {

			const users = await userService.getAll();

			return responseBuilder(res, "success", success.usersFoundSuccessfully, users);
        
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetUser);
        
		}
    

	}

	public async updateUser(req: Request, res: Response) {

		const cellphone : string = req.params.cellphone;
		const user : IUser = req.body.user;

		try {

			const updatedUser = await userService.update(cellphone, user);

			if (!updatedUser) {

				return responseBuilder(res, "error", error.userNotFound);
            
			}

			return responseBuilder(res, "success", success.userUpdatedSuccessfully, updatedUser);
        
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetUser);
        
		}
        
	}

	public async deleteUser(req: Request, res: Response) {

		const cellphone : string = req.params.cellphone;

		try {

			const deletedUser = await userService.delete(cellphone);

			if (!deletedUser) {

				return responseBuilder(res, "error", error.userNotFound);
            
			}

			return responseBuilder(res, "success", success.userDeletedSuccessfully, deletedUser);
        
		} catch (err) {
                
			console.error(err);
    
			return responseBuilder(res, "error", error.unableToGetUser);
            
		}

	}

}

export default new UserController();