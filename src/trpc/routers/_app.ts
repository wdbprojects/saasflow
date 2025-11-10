import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { prisma } from "@/lib/prisma";
import { inngest } from "@/inngest/client";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export const appRouter = createTRPCRouter({
  /* getUsers: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.auth.user.id;
    return prisma.user.findMany({
      where: { id: userId },
    });
  }), */

  testAI: protectedProcedure.mutation(async () => {
    // const { text } = await generateText({
    //   model: google("gemini-2.5-flash"),
    //   prompt: "Write an egplant lasagna recipe for 4 people",
    // });

    await inngest.send({ name: "execute/ai" });

    return { success: true, message: "Job queued" };
  }),

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
