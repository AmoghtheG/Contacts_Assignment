import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import {
  contactCreateSchema,
  contactUpdateSchema,
  ContactCreateInput,
  ContactUpdateInput,
} from "../validations/contacts.schemas";
import { ZodError } from "zod";

const prisma = new PrismaClient();

// Helpers to safely coerce query params
function str(q: unknown, def = ""): string {
  return typeof q === "string" ? q : def;
}
function num(q: unknown, def = 0): number {
  const n = Number(q);
  return Number.isFinite(n) ? n : def;
}

export async function listContacts(req: Request, res: Response, next: NextFunction) {
  try {
    const search = str(req.query.search);
    const sort = str(req.query.sort, "createdAt");
    const order = str(req.query.order, "desc") === "asc" ? "asc" : "desc";
    const page = Math.max(num(req.query.page, 1), 1);
    const limit = Math.min(Math.max(num(req.query.limit, 10), 1), 100);
    const skip = (page - 1) * limit;

    const where: Prisma.ContactWhereInput =
      search.length > 0
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { phone: { contains: search, mode: "insensitive" } },
            ],
          }
        : {};

    const orderBy: Prisma.ContactOrderByWithRelationInput = { [sort]: order } as any;

    const [total, data] = await Promise.all([
      prisma.contact.count({ where }),
      prisma.contact.findMany({ where, orderBy, skip, take: limit }),
    ]);

    res.json({ data, total, page, limit });
  } catch (err) {
    next(err);
  }
}

export async function getContact(req: Request, res: Response, next: NextFunction) {
  try {
    const id = num(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid id" });

    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.json(contact);
  } catch (err) {
    next(err);
  }
}

export async function createContact(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = contactCreateSchema.parse(req.body) as ContactCreateInput;
    const contact = await prisma.contact.create({ data: payload });
    res.status(201).json(contact);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ message: "Validation failed", errors: err.issues });
    }
    if ((err as any)?.code === "P2002") {
      // Unique constraint violation
      return res.status(400).json({ message: "Email already exists" });
    }
    next(err);
  }
}

export async function updateContact(req: Request, res: Response, next: NextFunction) {
  try {
    const id = num(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid id" });

    const payload = contactUpdateSchema.parse(req.body) as ContactUpdateInput;
    const contact = await prisma.contact.update({ where: { id }, data: payload });
    res.json(contact);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ message: "Validation failed", errors: err.issues });
    }
    const code = (err as any)?.code;
    if (code === "P2002") {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (code === "P2025") {
      return res.status(404).json({ message: "Not found" });
    }
    next(err);
  }
}

export async function deleteContact(req: Request, res: Response, next: NextFunction) {
  try {
    const id = num(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid id" });

    await prisma.contact.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    if ((err as any)?.code === "P2025") {
      return res.status(404).json({ message: "Not found" });
    }
    next(err);
  }
}