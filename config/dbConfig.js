require("dotenv").config();
const { Client } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const client = new Client({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
});

async function connect (){
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database!');
    } catch (err) {
        console.error('Connection error:', err.stack);
    } 
};

connect();

module.exports = { client };
