-- Drop presentation junction tables first (they reference presentations)
DROP TABLE IF EXISTS `presentation_verifiers`;--> statement-breakpoint
DROP TABLE IF EXISTS `presentation_credentials`;--> statement-breakpoint
DROP TABLE IF EXISTS `presentation_messages`;--> statement-breakpoint

-- Drop presentations parent table
DROP TABLE IF EXISTS `presentations`;--> statement-breakpoint

-- Drop credential encryption and claims tables
DROP TABLE IF EXISTS `encrypted_credentials`;--> statement-breakpoint
DROP TABLE IF EXISTS `vc_claims`;
