require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true }
});

async function checkTables() {
    try {
        await client.connect();

        const result = await client.query(`
            SELECT COUNT(*)::int AS table_count
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_type = 'BASE TABLE'
        `);

        console.log("Vendure tables:", result.rows[0].table_count);
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        await client.end();
    }
}

checkTables();
