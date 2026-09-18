module.exports = {
  apps: [{
    name: "oceanbrown-next",
    cwd: "/var/www/oceanbrown-next",
    script: ".next/standalone/server.js",
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    max_memory_restart: "500M",
    env: { NODE_ENV: "production", PORT: "5030", HOSTNAME: "127.0.0.1" }
  }]
};
