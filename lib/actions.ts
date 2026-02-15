"use server";

import { db } from "./db";
import { tasks, events } from "./schema";
import { eq } from "drizzle-orm";

export async function getTasksAction() {
  try {
    const results = await db.query.tasks.findMany();
    console.log("DB: getTasks count:", results.length);
    return results.map(task => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
      priority: task.priority
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

export async function getEventsAction() {
  try {
    const results = await db.query.events.findMany();
    console.log("DB: getEvents count:", results.length);
    return results.map(event => ({
      id: event.id,
      title: event.title,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      type: event.type
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function toggleTaskAction(taskId: string, completed: boolean) {
  try {
    await db.update(tasks)
      .set({ completed })
      .where(eq(tasks.id, taskId));
    return { success: true };
  } catch (error) {
    console.error("Error toggling task:", error);
    return { success: false };
  }
}
