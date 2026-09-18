import { randomBytes, scryptSync } from "node:crypto";
import { stdin, stdout } from "node:process";

function readHidden(prompt) {
  if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
    throw new Error("Run this command directly in an interactive terminal.");
  }
  return new Promise((resolve, reject) => {
    let value = "";
    stdout.write(prompt);
    stdin.setRawMode(true);
    stdin.resume();
    const finish = () => { stdin.setRawMode(false); stdin.pause(); stdin.off("data", onData); stdout.write("\n"); };
    const onData = (chunk) => {
      const text = chunk.toString("utf8");
      for (const character of text) {
        if (character === "\u0003") { finish(); reject(new Error("Cancelled.")); return; }
        if (character === "\r" || character === "\n") { finish(); resolve(value); return; }
        if (character === "\u007f" || character === "\b") { value = value.slice(0, -1); continue; }
        if (character >= " ") value += character;
      }
    };
    stdin.on("data", onData);
  });
}

try {
  const password = await readHidden("New admin password (12+ characters): ");
  const confirmation = await readHidden("Confirm admin password: ");
  if (password.length < 12) throw new Error("Password must contain at least 12 characters.");
  if (password !== confirmation) throw new Error("Passwords do not match.");
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  console.log(`ADMIN_PASSWORD_HASH=scrypt$${salt.toString("hex")}$${hash.toString("hex")}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : "Could not generate password hash.");
  process.exit(1);
}
