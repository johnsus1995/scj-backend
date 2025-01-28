import { sql } from "drizzle-orm";

export const up = async (db) => {
  await db.execute(sql`
    ALTER TABLE users
    ADD COLUMN scjId INTEGER NOT NULL,
  `);
};

export const down = async (db) => {
  await db.execute(sql`
    ALTER TABLE users
    DROP COLUMN scjId,
  `);
};