import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { transaction } from "../../../db";
import { isSameOrigin } from "../../../lib/auth";
import { clientKey, rateLimit } from "../../../lib/rate-limit";
export const runtime = "nodejs";

const schema = z.object({
  businessName:z.string().trim().min(1).max(120), ownerName:z.string().trim().min(1).max(120), phoneNumber:z.string().trim().min(5).max(30),
  emailAddress:z.string().trim().email().max(120), location:z.string().trim().min(1).max(150), businessType:z.string().trim().min(1).max(100),
  services:z.array(z.string().trim().min(1).max(120)).min(1).max(20), improvementAreas:z.string().trim().min(10).max(1000), currentSoftware:z.string().trim().max(500).optional(),
  employeeCount:z.string().trim().min(1).max(50), biggestChallenge:z.string().trim().min(1).max(1000), startTimeline:z.string().trim().min(1).max(100),
  budgetRange:z.string().trim().max(100).optional(), additionalDetails:z.string().trim().max(3000).optional(), communicationMethod:z.string().trim().min(1).max(50),
  additionalNotes:z.string().trim().max(2000).optional(), consent:z.literal(true), website:z.string().max(0).optional()
});

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({error:"Invalid origin"},{status:403});
  if (!rateLimit(clientKey(request,"submission"), 8, 15*60_000)) return NextResponse.json({error:"Too many requests. Please try again later."},{status:429});
  const parsed=schema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success)return NextResponse.json({error:"Please check the form and complete all required fields."},{status:400});
  const d=parsed.data;
  const id=await transaction(async client=>{
    const inserted=await client.query<{id:number}>(`INSERT INTO submissions (business_name,owner_name,phone_number,email_address,location,business_type,services,improvement_areas,current_software,employee_count,biggest_challenge,start_timeline,budget_range,additional_details,communication_method,additional_notes,consent,status,updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9,$10,$11,$12,$13,$14,$15,$16,true,'new',now()) RETURNING id`,[d.businessName,d.ownerName,d.phoneNumber,d.emailAddress,d.location,d.businessType,JSON.stringify(d.services),d.improvementAreas,d.currentSoftware||null,d.employeeCount,d.biggestChallenge,d.startTimeline,d.budgetRange||null,d.additionalDetails||null,d.communicationMethod,d.additionalNotes||null]);
    const summary=[`Business: ${d.businessName}`,`Location: ${d.location}`,`Type: ${d.businessType}`,`Employees: ${d.employeeCount}`,`Needs: ${d.improvementAreas}`,`Current software: ${d.currentSoftware||"None stated"}`,`Challenge: ${d.biggestChallenge}`,`Timeline: ${d.startTimeline}`,`Budget: ${d.budgetRange||"Not stated"}`,`Project details: ${d.additionalDetails||"None stated"}`,`Preferred contact: ${d.communicationMethod}`,`Notes: ${d.additionalNotes||"None"}`].join("\n\n");
    await client.query(`INSERT INTO inquiries (kind,name,contact,service,message,submission_id) VALUES ('project_onboarding',$1,$2,$3,$4,$5)`,[d.ownerName,`${d.emailAddress} · ${d.phoneNumber}`,d.services.join(", "),summary,inserted.rows[0].id]);
    return inserted.rows[0].id;
  });
  return NextResponse.json({ok:true,id},{status:201});
}
