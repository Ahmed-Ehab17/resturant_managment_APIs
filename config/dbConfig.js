require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");

const isProduction = process.env.NODE_ENV === "production";

const config = {
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    // Beware! The ssl object is overwritten when parsing the connectionString
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync("./web server key.PEM").toString(),
    },
};
const client = new Client(config);

async function connect() {
    try {
        await client.connect();
        console.log("Connected to PostgreSQL database!");
    } catch (err) {
        console.error("Connection error:", err.stack);
    }
}

connect();

module.exports = { client };
