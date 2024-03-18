import { db } from "./db";
import * as schema from "./schema";

await db.insert(schema.users).values([
  { name: "Neo" },
  { name: "Trinity" },
  { name: "Morpheus" }
]);

console.log(`Seeding complete.`);