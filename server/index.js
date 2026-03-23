import express from "express";
import cors from "cors";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { foods } from "./data.js";

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, "logs.json");

app.use(cors());
app.use(express.json());

async function ensureDbFile() {
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, "[]", "utf-8");
  }
}

async function readLogs() {
  await ensureDbFile();
  const raw = await fs.readFile(DB_FILE, "utf-8");
  return JSON.parse(raw);
}

async function writeLogs(logs) {
  await fs.writeFile(DB_FILE, JSON.stringify(logs, null, 2), "utf-8");
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/foods", (req, res) => {
  const q = (req.query.q || "").toString().toLowerCase().trim();
  const result = foods.filter((item) => item.name.toLowerCase().includes(q));
  res.json(result);
});

app.get("/api/logs", async (_req, res) => {
  const logs = await readLogs();
  res.json(logs.sort((a, b) => (a.date < b.date ? 1 : -1)));
});

app.post("/api/logs", async (req, res) => {
  const { date, stress, bloating, foodsEaten } = req.body;

  if (!date || !foodsEaten || !Number.isFinite(stress) || !Number.isFinite(bloating)) {
    return res.status(400).json({ error: "Eksik veya gecersiz veri." });
  }

  if (stress < 1 || stress > 10 || bloating < 1 || bloating > 10) {
    return res.status(400).json({ error: "Stres ve sis degeri 1-10 araliginda olmali." });
  }

  const logs = await readLogs();
  const entry = {
    id: Date.now().toString(),
    date,
    stress,
    bloating,
    foodsEaten: foodsEaten.toString().trim(),
  };

  logs.push(entry);
  await writeLogs(logs);
  res.status(201).json(entry);
});

ensureDbFile().then(() => {
  app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
  });
});
