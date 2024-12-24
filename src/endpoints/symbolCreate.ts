import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Symbol } from "../types";
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://zktvjhoiyxghtyuyxoyv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprdHZqaG9peXhnaHR5dXl4b3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NTM5NDcsImV4cCI6MjA1MDUyOTk0N30.L5n-c4r4EZISAnrNned9iOrE-KzOctDAeLJ6RTR6ZXo')


export class SymbolCreate extends OpenAPIRoute {
	schema = {
		tags: ["Symbols"],
		summary: "Create a new Symbol",
		request: {
			body: {
				content: {
					"application/json": {
						schema: Symbol,
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Returns the created symbol",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								result: z.object({
									assets: Symbol,
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

		// Retrieve the validated request body
		const symbolToCreate = userData.body;

		// Implement your own object insertion here
		
		try {
			const { data, error } = await supabase
				.from('assets')
				.select()
			const targetAsset = data ? data.find(asset => { return asset.symbol == symbolToCreate.symbol && asset.group == symbolToCreate.group }) : false;
			if (targetAsset) {
				const { error } = await supabase
					.from('assets')
					.update({ amount: symbolToCreate.amount })
					.eq('id', targetAsset.id);
			} else {
				const {  error } = await supabase
					.from('assets')
					.insert(symbolToCreate);
			}
			// return the new task

			const returnData = await supabase
				.from('assets')
				.select();

			return {
				success: true,
				assets: returnData.data,
			};
		} catch (error) {
			console.log(error);
		}


	}
}
