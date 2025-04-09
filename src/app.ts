import { Elysia } from "elysia";
import { router } from "./app.router";
import { swagger } from "@elysiajs/swagger";
import cors from "@elysiajs/cors";

const port = process.env.PORT ? process.env.PORT : 3000;
export const app = new Elysia();
app.get("/", () => {
  return { message: "welcome to api windows explorer", status: 200 };
});
app.use(swagger());
app.use(cors());
app.use(router);
app.onError(({ error, code }) => {
  if (code === "NOT_FOUND")
    return { message: "not found", status: error.status };
});
app.listen(port);

console.log(`Application is running at ${app.server?.url}`);
