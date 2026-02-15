import { pgTable, text, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);
export const eventTypeEnum = pgEnum("event_type", ["work", "personal", "health"]);

export const tasks = pgTable("tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false).notNull(),
  priority: priorityEnum("priority").default("medium").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  start: timestamp("start").notNull(),
  end: timestamp("end").notNull(),
  type: eventTypeEnum("type").default("personal").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
