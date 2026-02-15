import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { tasks, events } from "../lib/schema";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not defined in .env.local");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function main() {
  console.log("Seeding data...");

  try {
    // Insert mock tasks
    await db.insert(tasks).values([
      { id: '1', title: 'Finish project proposal', completed: false, priority: 'high' },
      { id: '2', title: 'Buy groceries', completed: false, priority: 'medium' },
      { id: '3', title: 'Call mom', completed: true, priority: 'low' },
    ]).onConflictDoNothing();

    // Insert mock events
    await db.insert(events).values([
      {
        id: '1',
        title: 'Morning Yoga',
        start: new Date(new Date().setHours(7, 0, 0, 0)),
        end: new Date(new Date().setHours(8, 0, 0, 0)),
        type: 'health',
      },
      {
        id: '2',
        title: 'Team Sync',
        start: new Date(new Date().setHours(10, 0, 0, 0)),
        end: new Date(new Date().setHours(11, 0, 0, 0)),
        type: 'work',
      },
    ]).onConflictDoNothing();

    console.log("Database synced and seeded!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
