"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const FetchClientTRPC = () => {
  const trpc = useTRPC();
  const { data: users } = useQuery(trpc.getUsers.queryOptions());

  return <div>{JSON.stringify(users)}</div>;
};

export default FetchClientTRPC;
