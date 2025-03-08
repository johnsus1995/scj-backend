import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle/migrations",
  dialect: "postgresql",
  schema: "./src/db/schema.js",

  // driver: "pg",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },

  extensionsFilters: ["postgis"],
  schemaFilter: "public",
  tablesFilter: "*",

  introspect: {
    casing: "camel",
  },

  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});
