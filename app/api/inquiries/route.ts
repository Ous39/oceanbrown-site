import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { inquiries } from "../../../db/schema";
export async function GET() { if (!await getChatGPTUser()) return NextResponse.json({error:"Unauthorised"},{status:401}); return NextResponse.json(await getDb().select().from(inquiries).orderBy(desc(inquiries.createdAt))); }
export async function POST(request: NextRequest) { const data = await request.json() as Record<string,unknown>; if (!String(data.name||"").trim() || !String(data.contact||"").trim() || !String(data.message||"").trim()) return NextResponse.json({error:"Please complete all required fields."},{status:400}); const result=await getDb().insert(inquiries).values({kind:String(data.kind||"contact"),name:String(data.name),contact:String(data.contact),service:String(data.service||""),message:String(data.message),status:"new",createdAt:new Date().toISOString()}).returning(); return NextResponse.json({ok:true,id:result[0].id},{status:201}); }
export async function PUT(request: NextRequest) { if (!await getChatGPTUser()) return NextResponse.json({error:"Unauthorised"},{status:401}); const data=await request.json() as {id:number,status:string}; await getDb().update(inquiries).set({status:data.status}).where(eq(inquiries.id,Number(data.id))); return NextResponse.json({ok:true}); }
