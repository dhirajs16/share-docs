import { type TamboComponent, defineTool } from "@tambo-ai/react";
import { z } from "zod";
import { WeatherCard } from "@/components/features/weather-card";
import { TodoList } from "@/components/features/todo-list";
import { EventList } from "@/components/features/event-list";
import { MOCK_WEATHER } from "@/lib/mock-data";
import { getTasksAction, getEventsAction } from "./actions";

export const components: TamboComponent[] = [
  {
    name: "WeatherCard",
    description: "Displays current weather. MANDATORY: Call 'getWeather' first, then render this component with the result in the 'data' prop. DO NOT print JSON.",
    component: WeatherCard,
    propsSchema: z.object({
      data: z.object({
        temp: z.number().catch(0),
        condition: z.enum(['sunny', 'cloudy', 'rainy']).catch('sunny'),
        location: z.string().default('Unknown'),
      }).optional()
    })
  },
  {
    name: "TodoList",
    description: "Displays a list of tasks/todos. MANDATORY: Call 'getTasks' first, then render this component with the result array in 'tasks' prop. DO NOT print raw JSON.",
    component: TodoList,
    propsSchema: z.object({
      tasks: z.array(z.object({
        id: z.string().default(""),
        title: z.string().default("Untitled Task"),
        completed: z.boolean().default(false),
        priority: z.enum(['high', 'medium', 'low']).catch('medium')
      })).optional()
    })
  },
  {
    name: "EventList",
    description: "Displays upcoming events. MANDATORY: Call 'getEvents' first, then render this component with the result array in 'events' prop. DO NOT print raw JSON.",
    component: EventList,
    propsSchema: z.object({
      events: z.array(z.object({
        id: z.string().default(""),
        title: z.string().default("Untitled Event"),
        start: z.string().default(new Date().toISOString()), 
        end: z.string().default(new Date().toISOString()),
        type: z.enum(['work', 'personal', 'health']).catch('personal')
      })).optional()
    })
  }
];

export const tools = [
  defineTool({
    name: "getWeather",
    description: "Get current weather",
    inputSchema: z.object({}),
    tool: async () => {
        console.log("TOOL CALLED: getWeather");
        return MOCK_WEATHER;
    },
  }),
  defineTool({
    name: "getTasks",
    description: "Get user tasks from database",
    inputSchema: z.object({}),
    tool: async () => {
        console.log("TOOL CALLED: getTasks (DB)");
        return await getTasksAction();
    },
  }),
  defineTool({
    name: "getEvents",
    description: "Get calendar events from database",
    inputSchema: z.object({}),
    tool: async () => {
        console.log("TOOL CALLED: getEvents (DB)");
        return await getEventsAction();
    },
  })
];
