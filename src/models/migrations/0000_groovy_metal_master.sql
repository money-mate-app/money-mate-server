CREATE TABLE IF NOT EXISTS "user_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"refresh_token" text NOT NULL,
	"auth_token" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"name" varchar NOT NULL,
	"profile_picture" text,
	"provider" json
);

DO $$ BEGIN
 ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
