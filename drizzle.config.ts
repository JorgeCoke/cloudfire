// NOTE: See https://orm.drizzle.team/learn/guides/d1-http-with-drizzle-kit
import { defineConfig } from "drizzle-kit";

const local = !!process.env.LOCAL_DB_PATH;
const schema = "./src/server/lib/db/schemas/*";
const out = "./src/server/lib/db/migrations";
const dialect = "sqlite";

export default local
  ? defineConfig({
      schema,
      out,
      dialect,
      dbCredentials: { url: process.env.LOCAL_DB_PATH! },
    })
  : defineConfig({
      schema,
      out,
      dialect,
      driver: "d1-http",
      dbCredentials: {
        accountId: process.env.CF_ACCOUNT_ID!,
        databaseId: process.env.database_id!,
        token: process.env.CF_TOKEN!,
      },
    });
