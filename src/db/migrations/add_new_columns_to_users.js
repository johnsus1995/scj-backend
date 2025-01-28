import { sql } from "drizzle-orm";

export const up = async (db) => {
  await db.execute(sql`
    ALTER TABLE users
    ADD COLUMN password VARCHAR(255) NOT NULL,
    ADD COLUMN isActive BOOLEAN DEFAULT true,
    ADD COLUMN createdAt TIMESTAMP DEFAULT NOW(),
    ADD COLUMN updatedAt TIMESTAMP DEFAULT NOW();
  `);
};

export const down = async (db) => {
  await db.execute(sql`
    ALTER TABLE users
    DROP COLUMN password,
    DROP COLUMN isActive,
    DROP COLUMN createdAt,
    DROP COLUMN updatedAt;
  `);
};