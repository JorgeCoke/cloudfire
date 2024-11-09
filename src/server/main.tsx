import { Hono } from "hono";
import { renderToString } from "react-dom/server";

const server = new Hono();

server.get("/api/foo", (c) => {
  return c.json({ message: "foo" });
});

// TODO: Remove from PROD. Code duplicated here and index.html
server.get("/", (c) => {
  return c.html(
    renderToString(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <link rel="icon" type="image/svg+xml" href="/static/vite.svg" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>Vite + React + TS</title>
          {import.meta.env.PROD ? (
            <script type="module" src="/static/client.js"></script>
          ) : (
            <script type="module" src="/src/client/main.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  );
});

export type AppType = typeof server;
export default server;
