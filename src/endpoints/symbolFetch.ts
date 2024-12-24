import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { Symbol } from "../types";
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://zktvjhoiyxghtyuyxoyv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprdHZqaG9peXhnaHR5dXl4b3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NTM5NDcsImV4cCI6MjA1MDUyOTk0N30.L5n-c4r4EZISAnrNned9iOrE-KzOctDAeLJ6RTR6ZXo')



export class SymbolFetch extends OpenAPIRoute {
	schema = {
		tags: ["Tasks"],
		summary: "Get All Symbols",
		request: {
		},
		responses: {
			"200": {
				description: "Returns all symbols",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								result: z.object({
									assets: z.array(Symbol),
								}),
							}),
						}),
					},
				},
			},
			"404": {
				description: "Task not found",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								error: Str(),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c) {
		/* const returnData = await supabase
			.from('assets')
			.select(); */
		const returnData = {
			data: [
				{
					id: 6,
					symbol: 'xrp/usdt',
					amount: 1000,
					group: '1',
					created_at: '2024-12-24T09:40:46.424937+00:00'
				},
				{
					id: 1,
					symbol: 'btc/usdt',
					amount: 0.1,
					group: '1',
					created_at: '2024-12-24T09:06:24.325222+00:00'
				},
				{
					id: 7,
					symbol: 'bnb/usdt',
					amount: 2,
					group: '1',
					created_at: '2024-12-24T10:10:00.6449+00:00'
				},
				{
					id: 8,
					symbol: 'ada/usdt',
					amount: 800,
					group: '1',
					created_at: '2024-12-24T10:10:15.600369+00:00'
				}
			]
		}
		console.log(returnData.data);
		return {
			success: true,
			assets: returnData.data,
		};
	}
}
