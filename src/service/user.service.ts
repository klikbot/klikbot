import User from "../database/schemas/user.schema";
import { IUser } from "../interfaces/IUser";

class UserService {

	async create(user: IUser): Promise<IUser> {

		try {

			return await User.create(user);
		
		} catch (error) {

			throw new Error(`Failed to create user. Error: ${error}`);
		
		}
	
	}

	async getByCellphone(cellphone: string): Promise<IUser | null> {

		try {

			return await User.findOne({ cellphone });
		
		} catch (error) {

			throw new Error(`Failed to get user. Error: ${error}`);
		
		}
	
	}

	async getAll(): Promise<IUser[]> {

		try {

			return await User.find();
		
		} catch (error) {

			throw new Error(`Failed to get user. Error: ${error}`);
		
		}
	
	}

	async update(cellphone: string, user: IUser): Promise<IUser | null> {

		try {

			return await User.findOneAndUpdate({cellphone}, user, { new: true });
		
		} catch (error) {

			throw new Error(`Failed to update user. Error: ${error}`);
		
		}
	
	}

	async delete(cellphone: string): Promise<IUser | null> {
            
		try {
    
			return await User.findOneAndDelete({cellphone});
            
		} catch (error) {
    
			throw new Error(`Failed to delete user. Error: ${error}`);
            
		}
	
	}
            
}
  
export default new UserService();