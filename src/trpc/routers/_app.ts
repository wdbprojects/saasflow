import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { prisma } from "@/lib/prisma";
import { inngest } from "@/inngest/client";

export const appRouter = createTRPCRouter({
  /* getUsers: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.auth.user.id;
    return prisma.user.findMany({
      where: { id: userId },
    });
  }), */

  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "nata@qwer.com",
      },
    });

    return { success: true, message: "Job queued" };
  }),
});

export type AppRouter = typeof appRouter;
