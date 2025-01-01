import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Symbol } from "../types";
import { createClient } from "@supabase/supabase-js";

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
    const SUPABASE_SECRET = c.env.SUPABASE_SECRET;

    // Create a single supabase client for interacting with your database
    const supabase = createClient(
      "https://zktvjhoiyxghtyuyxoyv.supabase.co",
      SUPABASE_SECRET
    );
    // Get validated data
    const userData = await this.getValidatedData<typeof this.schema>();

    // Retrieve the validated request body
    const symbolToCreate = userData.body;

    // Implement your own object insertion here

    try {
      const { data, error } = await supabase.from("assets").select();
      const targetAsset = data
        ? data.find((asset) => {
            return asset.id == symbolToCreate.id;
          })
        : false;
      if (targetAsset && symbolToCreate.id > 0) {
        const { error } = await supabase
          .from("assets")
          .update({
            amount: symbolToCreate.amount,
            symbol: symbolToCreate.symbol,
          })
          .eq("id", targetAsset.id);
      } else {
        delete symbolToCreate.id;
        const { error } = await supabase.from("assets").insert(symbolToCreate);
      }
      // return the new task

      const returnData = await supabase.from("assets").select();

      return {
        success: true,
        assets: returnData.data,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
