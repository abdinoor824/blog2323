import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query","info", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") 
  globalForPrisma.prisma = prisma;



export default prisma
