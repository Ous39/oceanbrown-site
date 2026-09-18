import "server-only";
import { cookies } from "next/headers";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
const COOKIE = "ob_admin"; const MAX_AGE = 60 * 60 * 12;
type Session = { email: string; name: string; exp: number };
function secret() { const value = process.env.SESSION_SECRET; if (!value || value.length < 32) throw new Error("SESSION_SECRET must contain at least 32 characters"); return value; }
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }
export function createSessionToken(): string { const session: Session = { email: process.env.ADMIN_EMAIL || "admin@oceanbrown.gm", name: process.env.ADMIN_NAME || "OceanBrown Administrator", exp: Math.floor(Date.now() / 1000) + MAX_AGE }; const payload = Buffer.from(JSON.stringify(session)).toString("base64url"); return `${payload}.${sign(payload)}`; }
function decodeSession(token?: string): Session | null { if (!token) return null; const [payload, signature] = token.split("."); if (!payload || !signature) return null; const a = Buffer.from(signature); const b = Buffer.from(sign(payload)); if (a.length !== b.length || !timingSafeEqual(a, b)) return null; try { const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session; return session.exp > Math.floor(Date.now() / 1000) ? session : null; } catch { return null; } }
export async function getAdminSession() { return decodeSession((await cookies()).get(COOKIE)?.value); }
export async function setAdminSession() { (await cookies()).set(COOKIE, createSessionToken(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: MAX_AGE }); }
export async function clearAdminSession() { (await cookies()).set(COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 }); }
export function verifyAdminPassword(password: string) { const [algorithm, saltHex, hashHex] = (process.env.ADMIN_PASSWORD_HASH || "").split("$"); if (algorithm !== "scrypt" || !saltHex || !hashHex) return false; const actual = scryptSync(password, Buffer.from(saltHex, "hex"), 64); const expected = Buffer.from(hashHex, "hex"); return actual.length === expected.length && timingSafeEqual(actual, expected); }
export function isSameOrigin(request: Request) { const origin = request.headers.get("origin"); if (!origin) return true; try { return new URL(origin).host === (request.headers.get("x-forwarded-host") || request.headers.get("host")); } catch { return false; } }
