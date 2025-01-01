import { DateTime, Str } from "chanfana";
import { number, z } from "zod";

export const Task = z.object({
	name: Str({ example: "lorem" }),
	slug: Str(),
	description: Str({ required: false }),
	completed: z.boolean().default(false),
	due_date: DateTime(),
});


export const Symbol = z.object({
	id:z.number(),
	symbol: z.string(), // Required string
	amount: z.number().default(0), // Number with a default value of 0
	group: z.string(), // Required string
  });