import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { Symbol } from "../types";
import { createClient } from "@supabase/supabase-js";


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
    const SUPABASE_SECRET = c.env.SUPABASE_SECRET;

    // Create a single supabase client for interacting with your database
    const supabase = createClient(
      "https://zktvjhoiyxghtyuyxoyv.supabase.co",
      SUPABASE_SECRET
    );
    // Get validated data
    const userData = await this.getValidatedData<typeof this.schema>();

    // Retrieve the validated slug
    const { symbolId } = userData.params;
    console.log(symbolId);
    const response = await supabase.from("assets").delete().eq("id", symbolId);
    const returnData = await supabase.from("assets").select();

    return {
      assets: returnData.data,
      success: true,
    };
  }
}
