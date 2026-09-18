import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "../../lib/auth";
import AdminApp from "./admin-app";
import "./admin.css";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Administration",robots:{index:false,follow:false}};
export default async function AdminPage(){const user=await getAdminSession();if(!user)redirect("/admin/login");return <AdminApp user={{name:user.name,email:user.email}}/>}
