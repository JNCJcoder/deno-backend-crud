import type { Context } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { Status, isHttpError } from "https://deno.land/x/oak@v10.4.0/mod.ts";

async function errorHandler(context: Context, next: () => any): Promise<void> {
    try {
        await next();
    } catch (error) {
        if (!isHttpError(error)) {
            context.response.status = error.status;
            context.response.body = error.message;
        }
        else {
            console.log(`Error: ${Status.InternalServerError} | Unexpected Error`);
            context.response.status = error.status;
            context.response.body = error.message;
        }
    }
}

export default errorHandler;