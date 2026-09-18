/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Code2, Globe2, Network, ShieldCheck, Smartphone } from "lucide-react";
import "./software.css";

export const metadata: Metadata = {
  title: "Software Development Company in The Gambia",
  description: "OceanBrown builds secure custom software, websites, mobile apps, telecom integrations and business automation for organisations in The Gambia.",
  alternates: { canonical: "/software-development-gambia" },
  openGraph: { title: "Software Development in The Gambia | OceanBrown", description: "Custom software, websites, mobile applications, telecom systems and automation built in The Gambia.", url: "/software-development-gambia", type: "website" },
};

const capabilities = [
  [Code2,"Custom business software","Management systems, dashboards, internal portals and connected workflows designed around your organisation."],
  [Globe2,"Websites and e-commerce","Responsive, search-ready websites that explain your value clearly and perform across everyday devices."],
  [Smartphone,"Mobile applications","Android and iOS applications designed for real users, local connectivity conditions and long-term support."],
  [Network,"Telecom and API integration","USSD, SMS, IVR, payment, WhatsApp and third-party API integrations backed by telecom experience."],
] as const;

export default function SoftwareDevelopmentGambia(){return <main className="seo-service"><header><Link href="/"><img src="/oceanbrown-logo.png" alt="OceanBrown" width="629" height="129"/></Link><Link href="/form">Start a project <ArrowRight/></Link></header><section className="seo-hero"><div><p>Software development in The Gambia</p><h1>Technology built around how your business really works.</h1><span>OceanBrown is a Gambian software development and IT services company delivering secure websites, mobile applications, business systems, telecom integrations and automation.</span><div><Link href="/form">Discuss your project <ArrowRight/></Link><a href="https://wa.me/2203631776">WhatsApp us</a></div></div><ShieldCheck/></section><section className="seo-proof"><span><CheckCircle2/> Gambian technology partner</span><span><CheckCircle2/> Responsive on every device</span><span><CheckCircle2/> Secure production deployment</span><span><CheckCircle2/> Ongoing technical support</span></section><section className="seo-capabilities"><p>What we build</p><h2>Practical digital systems for growing organisations.</h2><div>{capabilities.map(([Icon,title,copy])=><article key={title}><Icon/><h3>{title}</h3><p>{copy}</p></article>)}</div></section><section className="seo-process"><div><p>How we work</p><h2>Clear from the first conversation to launch.</h2></div><ol><li><b>01</b><strong>Understand</strong><span>We learn the problem, users, workflow and intended result.</span></li><li><b>02</b><strong>Plan</strong><span>We recommend the right scope, architecture, timeline and delivery path.</span></li><li><b>03</b><strong>Build</strong><span>We design, develop, test and communicate progress clearly.</span></li><li><b>04</b><strong>Support</strong><span>We deploy securely and remain available after launch.</span></li></ol></section><section className="seo-cta"><p>Have a software project in mind?</p><h2>Tell us what your organisation needs.</h2><Link href="/form">Start your project request <ArrowRight/></Link></section><footer><Link href="/">← Return to OceanBrown</Link><span>Banjul, The Gambia · +220 363 1776</span></footer></main>}
