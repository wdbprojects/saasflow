"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { requireAuth } from "@/lib/auth-utils";
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

  return (
    <div>
      <h2 className="mb-4 flex items-center justify-between p-3 text-2xl">
        Welcome to love and abundance
      </h2>
      <h3 className="text-primary text-2xl font-semibold"></h3>
      <Card className="mx-auto mt-8 max-w-lg px-8">
        <CardHeader>User Data</CardHeader>
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
  );
};

export default HomePage;
