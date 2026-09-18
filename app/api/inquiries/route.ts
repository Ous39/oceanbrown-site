import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "../../../db";
import { getAdminSession, isSameOrigin } from "../../../lib/auth";
import { clientKey, rateLimit } from "../../../lib/rate-limit";
export const runtime = "nodejs";

const input = z.object({ kind: z.string().max(40).optional(), name: z.string().trim().min(1).max(120), contact: z.string().trim().min(3).max(180), service: z.string().trim().max(250).optional(), message: z.string().trim().min(5).max(5000) });
export async function GET() {
  if (!await getAdminSession()) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const result = await query(`SELECT id, kind, name, contact, service, message, status, submission_id AS "submissionId", created_at AS "createdAt" FROM inquiries ORDER BY created_at DESC LIMIT 500`);
  return NextResponse.json(result.rows);
}
export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  if (!rateLimit(clientKey(request, "inquiry"), 10, 15 * 60_000)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  const parsed = input.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  const d = parsed.data;
  const result = await query<{id:number}>(`INSERT INTO inquiries (kind,name,contact,service,message) VALUES ($1,$2,$3,$4,$5) RETURNING id`, [d.kind || "contact", d.name, d.contact, d.service || "", d.message]);
  return NextResponse.json({ ok: true, id: result.rows[0].id }, { status: 201 });
}
export async function PUT(request: NextRequest) {
  if (!await getAdminSession()) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const parsed = z.object({ id: z.coerce.number().int().positive(), status: z.enum(["new","in_progress","resolved","rejected"]) }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  await query(`WITH changed AS (UPDATE inquiries SET status=$1,updated_at=now() WHERE id=$2 RETURNING submission_id) UPDATE submissions SET status=$1,updated_at=now() WHERE id=(SELECT submission_id FROM changed)`, [parsed.data.status, parsed.data.id]);
  return NextResponse.json({ ok: true });
}
