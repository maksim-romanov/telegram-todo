import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { db } from "./db";

await migrate(db, { migrationsFolder: "db/migrations" });
