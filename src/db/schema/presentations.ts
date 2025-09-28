import {index, sqliteTable, text} from "drizzle-orm/sqlite-core";
import {identifiers} from "./identifiers";

export const presentations = sqliteTable(
  "presentations",
  {
    hash: text("hash").primaryKey(),
    tenantId: text("tenant_id").notNull(),
    raw: text("raw", {mode: "json"}).notNull(),
    holderId: text("holder_id")
      .notNull()
      .references(() => identifiers.did, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    id: text("id"),
    context: text("context", {mode: "json"}).$type<unknown[]>(),
    type: text("type", {mode: "json"}).$type<unknown[]>(),
    issuanceDate: text("issuance_date", {mode: "text"}).notNull(),
    expirationDate: text("expiration_date", {mode: "text"}),
  },
  (table) => [index("presentations_tenant_idx").on(table.tenantId)]
);
