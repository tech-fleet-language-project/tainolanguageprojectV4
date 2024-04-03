const mongoose = require('mongoose');

const { connect } = mongoose;

// connect to MongoDB
// TODO: research connection options
export default async function connectMongoDB() {
  // TODO: update after creating MongoDB accounts
	await mongoose
		.connect(process.env.DB_CONN_STRING, {
			ssl: true,
			sslValidate: false,
		})
		.then(console.log("Successful connected to MongoDB."))
		.catch((error: any) => {
			console.error("Unsuccessful in connecting to MongoDb.", error);
		});
}
