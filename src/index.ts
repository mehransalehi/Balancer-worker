import { fromHono } from "chanfana";
import { Hono } from "hono";

import { SymbolCreate } from "endpoints/symbolCreate";
import { SymbolFetch } from "endpoints/symbolFetch";
import { keyFetch } from "endpoints/keyFetch";

// Start a Hono app
const app = new Hono();

//Token for auth
const AUTH_TOKEN =
  ')Kl,5sT"WDE*=qqIe;is#D[xkvvF87UooKjG;7V]PAz8dQzC3tSd{7.j7mK9)Clt';

// Middleware to check token
const authMiddleware = (c, next) => {
  const token = c.req.header("Authorization");
  // Check if the token matches
  if (!token || token !== `${AUTH_TOKEN}`) {
    return c.json({ error: "Unauthorized" }, 401); // Respond with 401 if unauthorized
  }

  // Proceed to the next handler
  return next();
};

// CORS Middleware to handle preflight and actual requests
const corsMiddleware = (c, next) => {
  // Set CORS headers
  c.res.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers

  // Handle preflight requests (OPTIONS)
  if (c.req.method === 'OPTIONS') {
    // Return a 204 No Content response without a body
    return new Response(null, {
      status: 204,
      headers: c.res.headers, // Include CORS headers
    });
  }

  return next();
};

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
});
// Apply CORS middleware globally
app.use(corsMiddleware);
// Apply middleware to all endpoints
openapi.use(authMiddleware);

// Register OpenAPI endpoints
// openapi.get("/api/tasks", TaskList);
// openapi.post("/api/tasks", TaskCreate);
// openapi.get("/api/tasks/:taskSlug", TaskFetch);
// openapi.delete("/api/tasks/:taskSlug", TaskDelete);

openapi.post("/api/symbols", SymbolCreate);
openapi.get("/api/symbols", SymbolFetch);
openapi.get("/api/keys", keyFetch);

// Export the Hono app
export default app;
