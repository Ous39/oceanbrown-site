import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./brand.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://oceanbrown.gm"),
  title: { default: "OceanBrown | Software & Digital Solutions in The Gambia", template: "%s | OceanBrown" },
  description: "OceanBrown builds custom software, mobile apps, websites, telecom integrations, automation, and digital products in The Gambia.",
  keywords: ["software development Gambia", "web development Gambia", "mobile app developer Gambia", "OceanBrown", "digital solutions Gambia"],
  alternates: { canonical: "/" },
  openGraph: { title: "OceanBrown — Digital products built for real needs", description: "Custom software, websites, mobile apps, automation, and telecom solutions from The Gambia.", type: "website", locale: "en_GB", siteName: "OceanBrown", url: "/", images: [{url:"/oceanbrown-logo.png",width:629,height:129,alt:"OceanBrown — Software Development and IT Services"}] },
  twitter: { card: "summary_large_image", title: "OceanBrown — Digital products built for real needs", description: "Custom software, websites, mobile apps, automation, and telecom solutions from The Gambia.", images: ["/oceanbrown-logo.png"] },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{media:"(prefers-color-scheme: light)",color:"#f7f9fb"},{media:"(prefers-color-scheme: dark)",color:"#06131d"}] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organisation={"@context":"https://schema.org","@type":"Organization",name:"OceanBrown",url:"https://oceanbrown.gm",email:"info.oceanbrown@gmail.com",telephone:"+2203631776",address:{"@type":"PostalAddress",addressLocality:"Banjul",addressCountry:"GM"},areaServed:"The Gambia",description:"A Gambian technology company building software, websites, mobile applications, telecom integrations, automation, and digital products."};
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`(function(){try{var t=localStorage.getItem('oceanbrown-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organisation)}}/></head><body>{children}</body></html>;
}
