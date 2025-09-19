import "dotenv/config";
import express from "express";
import cors from "cors";
import contactsRouter from "./routes/contacts.routes";
import { errorHandler } from "./middleware/error";

const app = express();

const corsOriginEnv = process.env.CORS_ORIGIN;
const corsOrigins = corsOriginEnv ? corsOriginEnv.split(",").map(s => s.trim()) : ["http://localhost:4200"];

app.use(cors({ origin: corsOrigins }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/contacts", contactsRouter);

// Error handler last
app.use(errorHandler);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API running on http://localhost:${port}`);
});