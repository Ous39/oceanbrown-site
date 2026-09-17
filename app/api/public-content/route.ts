import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { contentItems } from "../../../db/schema";
export async function GET() { const rows = await getDb().select().from(contentItems).where(eq(contentItems.status,"published")).orderBy(asc(contentItems.sortOrder)); return NextResponse.json(rows, { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }); }
