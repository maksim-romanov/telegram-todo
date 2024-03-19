import { db, schema } from "db";
import { eq } from "drizzle-orm";

const result = await db
  .select()
  .from(schema.todos)
  .where(eq(schema.todos.userId, 1))
  .all();

console.log(result);
