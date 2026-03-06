// import  pool from "./config/db.js";

// const requiredTables = [
//   "users",
//   "refresh_tokens",
//   "interview_sessions",
//   "ai_questions",
//   "answers",
//   "session_analysis",
//   "session_security",
//   "schema_migrations"
// ];

// const runTest = async () => {
//   try {
//     console.log("🔍 Testing database connection...");

//     // 1️⃣ Test connection
//     const timeRes = await pool.query("SELECT NOW()");
//     console.log("✅ DB Connected at:", timeRes.rows[0].now);

//     // 2️⃣ Fetch all tables
//     const tablesRes = await pool.query(`
//       SELECT tablename
//       FROM pg_tables
//       WHERE schemaname = 'public';
//     `);

//     const existingTables = tablesRes.rows.map(row => row.tablename);

//     console.log("\n📋 Existing Tables:");
//     existingTables.forEach(t => console.log(" -", t));

//     // 3️⃣ Check required tables
//     console.log("\n🔎 Verifying required tables...");

//     const missingTables = requiredTables.filter(
//       table => !existingTables.includes(table)
//     );

//     if (missingTables.length === 0) {
//       console.log("✅ All required tables exist.");
//     } else {
//       console.log("❌ Missing tables:");
//       missingTables.forEach(t => console.log(" -", t));
//     }

//     console.log("\n🎉 Database structure verification complete.");

//   } catch (error) {
//     console.error("❌ Error during DB test:", error);
//   } finally {
//     await pool.end();
//     process.exit();
//   }
// };

// runTest();
console.log(new Date())