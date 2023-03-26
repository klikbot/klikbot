import mongoose from "mongoose";

class Database {

	public connection : mongoose.Connection;

	constructor() {

		this.config();
		this.connect();
	
	}

	private config() : void {

		mongoose.set({strictQuery : false});
	
	}

	private async connect() : Promise<void> {

		try {

			const mongodbURI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@localhost:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=admin`;
			
			const moongoosee = await mongoose.connect(mongodbURI);
		
			this.connection = moongoosee.connection;

			console.log("Database connected successfully.");

		} catch(error) {

			console.log("Unable to connect to the database:");
			console.log(error);
		
		}

			
	
	}

}

export default Database;