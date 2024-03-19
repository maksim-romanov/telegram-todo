import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import drizzleConfig from "./config";

export const sqlite = new Database(drizzleConfig.dbCredentials.url);

export const db = drizzle(sqlite);
