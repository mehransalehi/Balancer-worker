import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { Symbol } from "../types";
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://zktvjhoiyxghtyuyxoyv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprdHZqaG9peXhnaHR5dXl4b3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NTM5NDcsImV4cCI6MjA1MDUyOTk0N30.L5n-c4r4EZISAnrNned9iOrE-KzOctDAeLJ6RTR6ZXo')


export class SymbolDelete extends OpenAPIRoute {
	schema = {
		tags: ["Symbols"],
		summary: "Delete a Symbol",
		request: {
			params: z.object({
				symbolId: Str({ description: "Sumbol id" }),
			}),
		},
		responses: {
			"200": {
				description: "Returns if the symbol was deleted successfully",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								result: z.object({
									symbols: z.array(Symbol),
								}),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c) {

		// Get validated data
		const userData = await this.getValidatedData<typeof this.schema>();

		// Retrieve the validated slug
		const { symbolId } = userData.params;
		console.log(symbolId);
		const returnData = await supabase
			.from('assets')
			.select();


		return {
			assets: returnData.data,
			success: true,
		};
	}
}
