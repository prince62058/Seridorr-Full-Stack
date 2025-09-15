const { neon, neonConfig } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-http');
const schema = require("../shared/schema");

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Optional optimization for connection caching
neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

module.exports = { db };