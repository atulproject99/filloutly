import { db } from "./packages/database/index";
import { usersTable } from "./packages/database/models/user";
async function run() {
  const users = await db.select().from(usersTable);
  console.log("ALL USERS:", users.map(u => ({ email: u.email, role: u.role })));
  process.exit(0);
}
run();
