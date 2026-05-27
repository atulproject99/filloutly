import { db } from "./packages/db";
import { usersTable } from "./packages/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const users = await db.select().from(usersTable);
  console.log("Users:", users.map(u => ({ email: u.email, role: u.role })));
}

main();
