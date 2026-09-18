import { NextResponse } from "next/server";
import { query } from "../../../db";
export const runtime="nodejs";
export async function GET(){const [result,modules]=await Promise.all([query(`SELECT id,module,title,slug,summary,body,status,sort_order AS "sortOrder",publish_at AS "publishAt",seo_title AS "seoTitle",seo_description AS "seoDescription",updated_at AS "updatedAt" FROM content_items WHERE status='published' ORDER BY sort_order`),query(`SELECT DISTINCT module FROM content_items`)]);return NextResponse.json({items:result.rows,managedModules:modules.rows.map(row=>String(row.module))},{headers:{"Cache-Control":"no-store"}})}
