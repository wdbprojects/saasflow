import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { prisma } from "@/lib/prisma";

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.auth.user.id;
    return prisma.user.findMany({
      where: { id: userId },
    });
  }),
});

export type AppRouter = typeof appRouter;
