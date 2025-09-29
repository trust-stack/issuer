CREATE TABLE `credentials` (
	`hash` text PRIMARY KEY NOT NULL,
	`id` text NOT NULL,
	`organization_id` text NOT NULL,
	`revocation_list` integer,
	`revocation_index` integer,
	`context` text,
	`issuance_date` text NOT NULL,
	`expiration_date` text,
	`raw` text NOT NULL,
	`issuer_id` text,
	`subject_id` text,
	`type` text,
	FOREIGN KEY (`issuer_id`) REFERENCES `identifiers`(`did`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`subject_id`) REFERENCES `identifiers`(`did`) ON UPDATE cascade ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `credentials_id_unique` ON `credentials` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `credentials_revocation_unique` ON `credentials` (`revocation_list`,`revocation_index`);--> statement-breakpoint
CREATE INDEX `credentials_org_idx` ON `credentials` (`organization_id`);--> statement-breakpoint
CREATE TABLE `encrypted_credentials` (
	`id` text PRIMARY KEY NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`credential_id` text NOT NULL,
	`cipher_text` text NOT NULL,
	`iv` text NOT NULL,
	`tag` text NOT NULL,
	`key` text NOT NULL,
	`algorithm` text NOT NULL,
	FOREIGN KEY (`credential_id`) REFERENCES `credentials`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `encrypted_credentials_credential_unique` ON `encrypted_credentials` (`credential_id`);--> statement-breakpoint
CREATE TABLE `vc_claims` (
	`hash` text PRIMARY KEY NOT NULL,
	`issuer_id` text NOT NULL,
	`subject_id` text,
	`credential_id` text NOT NULL,
	`context` text,
	`credential_type` text,
	`type` text NOT NULL,
	`value` text,
	`is_obj` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`issuer_id`) REFERENCES `identifiers`(`did`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`subject_id`) REFERENCES `identifiers`(`did`) ON UPDATE cascade ON DELETE set null,
	FOREIGN KEY (`credential_id`) REFERENCES `credentials`(`hash`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `crypto_keys` (
	`kid` text PRIMARY KEY NOT NULL,
	`kms` text NOT NULL,
	`type` text NOT NULL,
	`public_key_hex` text NOT NULL,
	`private_key_hex` text,
	`meta` text,
	`identifier_did` text,
	FOREIGN KEY (`identifier_did`) REFERENCES `identifiers`(`did`) ON UPDATE cascade ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `crypto_keys_identifier_did_idx` ON `crypto_keys` (`identifier_did`);--> statement-breakpoint
CREATE TABLE `identifiers` (
	`id` text NOT NULL,
	`did` text NOT NULL,
	`organization_id` text NOT NULL,
	`provider` text NOT NULL,
	`alias` text NOT NULL,
	`controller_key_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `identifiers_id_unique` ON `identifiers` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `identifiers_did_unique` ON `identifiers` (`did`);--> statement-breakpoint
CREATE TABLE `private_keys` (
	`alias` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`private_key_hex` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`service_endpoint` text NOT NULL,
	`description` text,
	`identifier_did` text,
	`tenant_id` text NOT NULL,
	FOREIGN KEY (`identifier_did`) REFERENCES `identifiers`(`did`) ON UPDATE cascade ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `services_tenant_idx` ON `services` (`tenant_id`);--> statement-breakpoint
CREATE TABLE `credential_messages` (
	`credential_hash` text NOT NULL,
	`message_id` text NOT NULL,
	PRIMARY KEY(`credential_hash`, `message_id`),
	FOREIGN KEY (`credential_hash`) REFERENCES `credentials`(`hash`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`message_id`) REFERENCES `messages`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `presentation_credentials` (
	`presentation_hash` text NOT NULL,
	`credential_hash` text NOT NULL,
	PRIMARY KEY(`presentation_hash`, `credential_hash`),
	FOREIGN KEY (`presentation_hash`) REFERENCES `presentations`(`hash`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`credential_hash`) REFERENCES `credentials`(`hash`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `presentation_messages` (
	`presentation_hash` text NOT NULL,
	`message_id` text NOT NULL,
	PRIMARY KEY(`presentation_hash`, `message_id`),
	FOREIGN KEY (`presentation_hash`) REFERENCES `presentations`(`hash`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`message_id`) REFERENCES `messages`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `presentation_verifiers` (
	`presentation_hash` text NOT NULL,
	`verifier_did` text NOT NULL,
	PRIMARY KEY(`presentation_hash`, `verifier_did`),
	FOREIGN KEY (`presentation_hash`) REFERENCES `presentations`(`hash`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`verifier_did`) REFERENCES `identifiers`(`did`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`expires_at` text,
	`thread_id` text,
	`raw` text,
	`data` text,
	`reply_to` text,
	`reply_url` text,
	`from_id` text,
	`to_id` text,
	`meta_data` text,
	`return_route` text,
	FOREIGN KEY (`from_id`) REFERENCES `identifiers`(`did`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`to_id`) REFERENCES `identifiers`(`did`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `presentations` (
	`hash` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`raw` text NOT NULL,
	`holder_id` text NOT NULL,
	`id` text,
	`context` text,
	`type` text,
	`issuance_date` text NOT NULL,
	`expiration_date` text,
	FOREIGN KEY (`holder_id`) REFERENCES `identifiers`(`did`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `presentations_tenant_idx` ON `presentations` (`tenant_id`);