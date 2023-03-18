/* eslint-disable no-undef */
const mongoose = require('mongoose');





function connect() {

	mongoose.connect(process.env.MONGO_URL)

	const  db = mongoose.connection;

	db.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
	});
	db.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});
}



module.exports = { connect }

