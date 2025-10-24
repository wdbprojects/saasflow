"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const SuspenseClientTRPC = () => {
  const trpc = useTRPC();
  const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());

  return (
    <div>
      <span className="mb-2 block text-lg font-semibold">
        Client component:{" "}
      </span>
      <span>{JSON.stringify(users)}</span>
    </div>
  );
};

export default SuspenseClientTRPC;
