import mongoose from "mongoose";

class Database {

	constructor() {

		this.config();
		this.connect();
	
	}

	private config() : void {

		mongoose.set({strictQuery : false});
	
	}

	private connect() : void {

		mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=admin`)
			.then(() => {

				console.log("Database connected successfully.");
			
			})
			.catch((error) => {

				console.log("Unable to connect to the database:");
				console.log(error);
			
			});
	
	}

}

export default Database;