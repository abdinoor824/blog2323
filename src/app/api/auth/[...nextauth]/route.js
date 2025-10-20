// Ensure this route runs in the Node.js runtime so Prisma Client can be used here.
export const runtime = "nodejs";

import { authOptions } from "@/utils/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
