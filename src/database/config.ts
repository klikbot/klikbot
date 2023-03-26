import mongoose from "mongoose";
import autoincrementService from "../service/autoincrement.service";

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

			let mongodbURI : string;

			if(process.env.APP_ENVIRONMENT === "development") {

				mongodbURI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@localhost:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=admin`;

			} else {

				mongodbURI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=admin`;

			}
			
			const moongoosee = await mongoose.connect(mongodbURI);
		
			this.connection = moongoosee.connection;

			console.log("Database connected successfully.");

			this.initCollections();

		} catch(error) {

			console.log("Unable to connect to the database:");
			console.log(error);
		
		}

			
	
	}

	private initCollections() : void {
		
		const collections = ["users"];
		
		collections.forEach(async (collectionName) => {

			const collection = await autoincrementService.getByCollectionName(collectionName);

			if (!collection) {

				await autoincrementService.create({ collectionName, id: 0 });
			
			}

		});

	}

}

export default Database;