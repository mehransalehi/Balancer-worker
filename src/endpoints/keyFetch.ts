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

    access_id = '7847A08FB08947EFBC73203AC2DB2765';
    secret_key = 'A8884935839A26ACF602CDA4A265436E386E2187048A7538';


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
