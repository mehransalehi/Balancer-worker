import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import CryptoJS from 'crypto-js';






export class keyFetch extends OpenAPIRoute {
    schema = {
        tags: ["Key"],
        summary: "Get Exchange Keys",
        request: {
        },
        responses: {
            "200": {
                description: "Returns Exchange Keys",
                content: {
                    "application/json": {
                        schema: z.object({
                            series: z.object({
                                success: Bool(),
                                result: z.object({
                                    key: z.string(),
                                    hash: z.string(),
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

    access_id = '';
    secret_key = '';


    async handle(c) {

        let current_time = new Date().getTime();
        let sign_str = "access_id=" + this.access_id + "&tonce=" + current_time + "&secret_key=" + this.secret_key;
        // var hash = crypto.createHash('md5').update(sign_str).digest('hex').toUpperCase();

        const hash = CryptoJS.MD5(sign_str).toString(CryptoJS.enc.Hex).toUpperCase();

        return {
            success: true,
            key: this.access_id,
            hash
        };
    }
}
