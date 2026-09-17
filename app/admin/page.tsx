import type { Metadata } from "next";
import { requireChatGPTUser } from "../chatgpt-auth";
import AdminApp from "./admin-app";
import "./admin.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Administration", robots: { index: false, follow: false } };
export default async function AdminPage(){ const user=await requireChatGPTUser("/admin"); return <AdminApp user={{name:user.displayName,email:user.email}}/>; }
