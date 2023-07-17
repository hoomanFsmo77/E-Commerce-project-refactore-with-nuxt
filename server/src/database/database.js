const mongoose = require('mongoose')
const dbURL=process.env.PRODUCTION == 1 ? process.env.DB_P_URL :process.env.DB_URL
const dbName=process.env.PRODUCTION == 1 ? '' : process.env.DB_NAME


//////////////////////
const init = async () => {
    await mongoose.connect(dbURL+dbName);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("mongodb connected.");
    });
}


module.exports={
    init
}