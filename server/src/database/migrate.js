import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import  pool  from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsPath = path.join(__dirname, "migrations");

const runMigrations = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

  
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT NOW()
      );
    `);

    
    const appliedRes = await client.query(
      "SELECT filename FROM schema_migrations"
    );

    const applied = appliedRes.rows.map(r => r.filename);

    
    const files = fs.readdirSync(migrationsPath).sort();

    for (const file of files) {
      if (!applied.includes(file)) {
        console.log(`Running migration: ${file}`);

        const sql = fs.readFileSync(
          path.join(migrationsPath, file),
          "utf8"
        );

        await client.query(sql);

        await client.query(
          "INSERT INTO schema_migrations (filename) VALUES ($1)",
          [file]
        );
      }
    }

    await client.query("COMMIT");
    console.log("Migrations completed successfully.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Migration failed:", err);
  } finally {
    client.release();
    process.exit();
  }
};

runMigrations();
