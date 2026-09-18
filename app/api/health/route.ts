import { NextResponse } from "next/server";
import { query } from "../../../db";
export const runtime="nodejs";
export async function GET(){try{await query("SELECT 1");return NextResponse.json({ok:true,service:"oceanbrown-website"})}catch(error){console.error("Health check failed",error);return NextResponse.json({ok:false},{status:503})}}
