import fs from "fs/promises";
import path from "path";
import postgres from "postgres";
import "dotenv/config";
// const sql = postgres();
console.log({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const sql = postgres({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function migrate() {
  try {
    console.log("Starting migration...");

    const sqlFile = await fs.readFile(
      path.join(process.cwd(), "db/schemadump2.sql"),
      "utf-8"
    );

    await sql.unsafe(sqlFile);

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await sql.end();
  }
}

migrate();
