// `npm run db:check` — diagnose the database configured through DATABASE_URL.
// Uses `pg` directly so it works without compiling the Next.js application.
import { config as loadEnv } from "dotenv";
import pg from "pg";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const EXPECTED_TABLES = [
  "categories",
  "services",
  "products",
  "posts",
  "contact_messages",
  "orders",
  "order_items",
];

const url =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_PRISMA_URL;

if (!url) {
  console.error("✗ DATABASE_URL is not set.");
  console.error("  Copy .env.example to .env.local and paste your Neon connection string.");
  process.exit(1);
}

let host = "(unparsable url)";
try {
  const parsed = new URL(url);
  host = `${parsed.hostname}${parsed.pathname}`;
} catch {
  /* keep the placeholder */
}

console.log(`→ checking ${host}`);

const client = new pg.Client({
  connectionString: url,
  connectionTimeoutMillis: 10_000,
  application_name: "atc-maroc-cli",
});
client.on("error", (error) => console.error(`! idle client error: ${error.message}`));

try {
  await client.connect();
  const { rows: versionRows } = await client.query("select version()");
  console.log(`✓ connected: ${versionRows[0].version.split(" on ")[0]}`);

  const { rows } = await client.query(
    "select table_name from information_schema.tables where table_schema = 'public'",
  );
  const present = new Set(rows.map((row) => row.table_name));
  const missing = EXPECTED_TABLES.filter((table) => !present.has(table));

  if (missing.length) {
    console.error(`✗ missing tables: ${missing.join(", ")}`);
    console.error("  Create them with:  npm run db:push");
    console.error("  (or let the app do it: keep DATABASE_AUTO_MIGRATE enabled)");
    process.exitCode = 2;
  } else {
    console.log(`✓ schema ready (${EXPECTED_TABLES.length} tables)`);
    const counts = await client.query(
      `select
         (select count(*)::int from products) as products,
         (select count(*)::int from services) as services,
         (select count(*)::int from contact_messages) as messages,
         (select count(*)::int from orders) as orders`,
    );
    const { products, services, messages, orders } = counts.rows[0];
    console.log(
      `✓ rows: ${products} products, ${services} services, ${messages} messages, ${orders} orders`,
    );
    if (!products) {
      console.log("· the catalog is seeded automatically on the first page load");
    }
  }
} catch (error) {
  console.error(`✗ connection failed: ${error.message}`);
  console.error("  Check the password, the host and that the Neon project is not suspended.");
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
