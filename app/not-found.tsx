import { headers } from "next/headers";
import Link from "next/link";

export default async function NotFound() {
  const host=(await headers()).get("host")||"";
  const admin=host.startsWith("publicadmin.");
  return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:"2rem",background:admin?"#07131d":"#041827",color:"#edf8fc",fontFamily:"Arial,sans-serif"}}>
    <section style={{width:"min(680px,100%)",textAlign:"center",padding:"clamp(2rem,6vw,4rem)",border:"1px solid #ffffff24",borderRadius:"1.25rem",background:"#ffffff0a",boxShadow:"0 30px 80px #0007"}}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/oceanbrown-logo.png" alt="OceanBrown" width="629" height="129" style={{width:"min(390px,90%)",height:"auto",marginBottom:"2rem"}}/>
      <p style={{color:"#67d7f6",fontWeight:800,letterSpacing:".16em",textTransform:"uppercase"}}>404 · Page not found</p>
      <h1 style={{fontSize:"clamp(2.4rem,7vw,5rem)",lineHeight:1,letterSpacing:"-.055em",margin:".8rem 0"}}>{admin?"This admin page does not exist.":"We could not find that page."}</h1>
      <p style={{color:"#a9becb",fontSize:"1.05rem",margin:"1.4rem auto 2rem",maxWidth:"520px"}}>The address may have changed or the page may have been removed.</p>
      <Link href={admin?"/admin":"/"} style={{display:"inline-flex",padding:".9rem 1.35rem",borderRadius:"999px",background:"#ff9d43",color:"#101820",fontWeight:800}}>{admin?"Return to dashboard":"Return to OceanBrown"}</Link>
    </section>
  </main>;
}
