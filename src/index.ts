import { db, schema } from "db";
import { eq } from "drizzle-orm";

const [neo] = await db
  .select()
  .from(schema.users)
  .where(eq(schema.users.id, 1));

console.log("result: ", neo);
