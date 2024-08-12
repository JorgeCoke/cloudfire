ALTER TABLE `user` ADD `enabled` integer DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `last_log_in_tries` integer DEFAULT 0 NOT NULL;