"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const HomePage = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    }),
  );

  const testAI = useMutation(
    trpc.testAI.mutationOptions({
      onSuccess: () => {
        toast.success("AI job queued");
      },
    }),
  );

  return (
    <div className="px-4 pt-16">
      <h3 className="text-foreground mt-4 text-center text-2xl font-semibold">
        Home Page Info
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <Card className="mx-auto mt-8 w-full px-8">
          <CardHeader className="text-primary text-center text-xl font-semibold">
            Google Gemini AI
          </CardHeader>
          {/* <CardContent>{testAI.data}</CardContent> */}
          <Button
            variant="default"
            onClick={() => {
              testAI.mutate();
            }}
            disabled={testAI.isPending}
          >
            Create AI Recipe
          </Button>
        </Card>
        <Card className="mx-auto mt-8 w-full px-8">
          <CardHeader className="text-primary text-center text-xl font-semibold">
            User Data
          </CardHeader>
          <CardContent>{JSON.stringify(data, null, 2)}</CardContent>
          <Button
            variant="outline"
            onClick={() => {
              create.mutate();
            }}
            disabled={create.isPending}
          >
            Create Workflow
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
