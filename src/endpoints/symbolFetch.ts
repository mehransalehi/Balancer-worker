import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { Symbol } from "../types";
import { createClient } from "@supabase/supabase-js";


export class SymbolFetch extends OpenAPIRoute {
  schema = {
    tags: ["Tasks"],
    summary: "Get All Symbols",
    request: {},
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
    const SUPABASE_SECRET = c.env.SUPABASE_SECRET;

    // Create a single supabase client for interacting with your database
    const supabase = createClient(
      "https://zktvjhoiyxghtyuyxoyv.supabase.co",
      SUPABASE_SECRET
    );
    const returnData = await supabase.from("assets").select();
    /* const returnData = {
			data: [
				{
					id: 6,
					symbol: 'xrp',
					amount: 1000,
					group: '1',
					created_at: '2024-12-24T09:40:46.424937+00:00'
				},
				{
					id: 1,
					symbol: 'btc',
					amount: 0.1,
					group: '1',
					created_at: '2024-12-24T09:06:24.325222+00:00'
				},
				{
					id: 7,
					symbol: 'bnb',
					amount: 2,
					group: '1',
					created_at: '2024-12-24T10:10:00.6449+00:00'
				},
				{
					id: 8,
					symbol: 'ada',
					amount: 800,
					group: '1',
					created_at: '2024-12-24T10:10:15.600369+00:00'
				}
			]
		} */
    return {
      success: true,
      assets: returnData.data,
    };
  }
}
