import { db } from "./db";
import * as schema from "./schema";

const noUsers = (await db.select().from(schema.users)).length === 0;
if (noUsers) {
  await db
    .insert(schema.users)
    .values([
      { name: "Neo" },
      { name: "Trinity" },
      { name: "Morpheus" },
      { name: "Agent Smith" },
    ]);
}

const noTodos = (await db.select().from(schema.todos)).length === 0;
if (noTodos) {
  const [user] = await db.select().from(schema.users);

  await db.insert(schema.todos).values([
    { name: "Buy bread & eggs", userId: user.id },
    { name: "Wash puddle", userId: user.id },
  ]);
}

console.log("Seeding complete.");
