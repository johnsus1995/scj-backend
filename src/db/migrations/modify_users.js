import { sql } from "drizzle-orm";

export const up = async (db) => {
  await db.execute(sql`
    ALTER TABLE users
    DROP COLUMN isActive,
    ADD COLUMN roleId INTEGER;
  `);
};

export const down = async (db) => {
  await db.execute(sql`
    ALTER TABLE users
    DROP COLUMN roleId;
  `);
};