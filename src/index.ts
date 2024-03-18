import { db, schema } from "db";

const result = await db.select().from(schema.users);
console.log(result);