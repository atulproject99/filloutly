CREATE TYPE "public"."form_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."form_visibility" AS ENUM('public', 'unlisted');--> statement-breakpoint
CREATE TYPE "public"."field_type" AS ENUM('short_text', 'long_text', 'email', 'number', 'single_select', 'multi_select', 'dropdown', 'checkbox', 'rating', 'date');--> statement-breakpoint
CREATE TABLE "forms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" text,
	"slug" varchar(120),
	"theme" varchar(50) DEFAULT 'apple-glass',
	"status" "form_status" DEFAULT 'draft' NOT NULL,
	"visibility" "form_visibility" DEFAULT 'unlisted' NOT NULL,
	"collect_email" boolean DEFAULT false,
	"allow_multiple_responses" boolean DEFAULT false,
	"creator_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "forms_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "form_fields" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"form_id" uuid NOT NULL,
	"type" "field_type" NOT NULL,
	"label" varchar(255) NOT NULL,
	"label_key" varchar(120) NOT NULL,
	"placeholder" varchar(255),
	"helper_text" text,
	"required" boolean DEFAULT false,
	"order" double precision NOT NULL,
	"options" jsonb,
	"validations" jsonb,
	"default_value" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
