import type { Context } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { isHttpError } from "https://deno.land/x/oak@v10.4.0/mod.ts";

async function errorHandler(context: Context, next: () => Promise<unknown>): Promise<void> {
    try {
        await next();
    } catch (error) {
        if (isHttpError(error)) {
            context.response.status = error.status;
            context.response.body = { message: error.message };
        }
        else {
            console.log(`Error: ${error.status} | ${error.message}`);
            context.response.status = error.status;
            context.response.body = error.message;
        }
    }
}

export default errorHandler;