import { fromHono } from "chanfana";
import { Hono } from "hono";
// import { TaskCreate } from "./endpoints/taskCreate";
// import { TaskDelete } from "./endpoints/taskDelete";
// import { TaskFetch } from "./endpoints/taskFetch";
// import { TaskList } from "./endpoints/taskList";

import { SymbolCreate } from "endpoints/symbolCreate";

// Start a Hono app
const app = new Hono();

//Token for auth
const AUTH_TOKEN =
  ')Kl,5sT"WDE*=qqIe;is#D[xkvvF87UooKjG;7V]PAz8dQzC3tSd{7.j7mK9)Clt';

// Middleware to check token
const authMiddleware = (c, next) => {
  const token = c.req.header("Authorization");
  /* console.log(token);
  // Check if the token matches
  if (!token || token !== `Bearer ${AUTH_TOKEN}`) {
    return c.json({ error: "Unauthorized" }, 401); // Respond with 401 if unauthorized
  } */

  // Proceed to the next handler
  return next();
};

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
});

// Apply middleware to all endpoints
openapi.use(authMiddleware);

// Register OpenAPI endpoints
// openapi.get("/api/tasks", TaskList);
// openapi.post("/api/tasks", TaskCreate);
// openapi.get("/api/tasks/:taskSlug", TaskFetch);
// openapi.delete("/api/tasks/:taskSlug", TaskDelete);

openapi.post("/api/symbols", SymbolCreate);

// Export the Hono app
export default app;
