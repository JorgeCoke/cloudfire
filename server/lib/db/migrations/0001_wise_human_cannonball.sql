ALTER TABLE `user` ADD `role` text DEFAULT 'USER' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `last_reset_password_request_at` integer;--> statement-breakpoint
ALTER TABLE `user` ADD `last_log_in_at` integer;--> statement-breakpoint
ALTER TABLE `user` ADD `created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL;