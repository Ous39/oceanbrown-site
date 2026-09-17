import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contentItems = sqliteTable("content_items", {
  id: integer("id").primaryKey({ autoIncrement: true }), module: text("module").notNull(), title: text("title").notNull(), slug: text("slug").notNull().unique(), summary: text("summary").notNull().default(""), body: text("body").notNull().default(""), status: text("status", { enum: ["draft", "scheduled", "published", "coming_soon"] }).notNull().default("draft"), sortOrder: integer("sort_order").notNull().default(0), publishAt: text("publish_at"), seoTitle: text("seo_title").notNull().default(""), seoDescription: text("seo_description").notNull().default(""), createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
});
export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }), kind: text("kind").notNull().default("contact"), name: text("name").notNull(), contact: text("contact").notNull(), service: text("service").notNull().default(""), message: text("message").notNull(), status: text("status").notNull().default("new"), createdAt: text("created_at").notNull(),
});
export const siteSettings = sqliteTable("site_settings", { key: text("key").primaryKey(), value: text("value").notNull(), updatedAt: text("updated_at").notNull() });
export const activityLog = sqliteTable("activity_log", { id: integer("id").primaryKey({ autoIncrement: true }), actorEmail: text("actor_email").notNull(), action: text("action").notNull(), entityType: text("entity_type").notNull(), entityId: text("entity_id").notNull().default(""), createdAt: text("created_at").notNull() });
