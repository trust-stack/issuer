import {primaryKey, sqliteTable, text} from "drizzle-orm/sqlite-core";
import {credentials} from "./credentials";
import {identifiers} from "./identifiers";
import {messages} from "./messages";
import {presentations} from "./presentations";

export const credentialMessages = sqliteTable(
  "credential_messages",
  {
    credentialHash: text("credential_hash")
      .notNull()
      .references(() => credentials.hash, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    messageId: text("message_id")
      .notNull()
      .references(() => messages.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.credentialHash, table.messageId],
    }),
  ]
);

export const presentationMessages = sqliteTable(
  "presentation_messages",
  {
    presentationHash: text("presentation_hash")
      .notNull()
      .references(() => presentations.hash, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    messageId: text("message_id")
      .notNull()
      .references(() => messages.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.presentationHash, table.messageId],
    }),
  ]
);

export const presentationVerifiers = sqliteTable(
  "presentation_verifiers",
  {
    presentationHash: text("presentation_hash")
      .notNull()
      .references(() => presentations.hash, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    verifierDid: text("verifier_did")
      .notNull()
      .references(() => identifiers.did, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.presentationHash, table.verifierDid],
    }),
  ]
);

export const presentationCredentials = sqliteTable(
  "presentation_credentials",
  {
    presentationHash: text("presentation_hash")
      .notNull()
      .references(() => presentations.hash, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    credentialHash: text("credential_hash")
      .notNull()
      .references(() => credentials.hash, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.presentationHash, table.credentialHash],
    }),
  ]
);
