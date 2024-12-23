import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Symbol } from "../types";

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
									task: Symbol,
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
		const data = await this.getValidatedData<typeof this.schema>();

		// Retrieve the validated request body
		const symbolToCreate = data.body;

		// Implement your own object insertion here

        console.log(symbolToCreate);

		// return the new task
		return {
			success: true,
			symbol: {
				symbol: symbolToCreate.symbol,
				amount: symbolToCreate.amount,
				group: symbolToCreate.group,
			},
		};
	}
}
