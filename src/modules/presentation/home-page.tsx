import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import Link from "next/link";

const HomePage = async () => {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div>
      <h2 className="mb-4 flex items-center justify-between p-3 text-2xl">
        Welcome to love and abundance
      </h2>
      <h3 className="text-primary text-2xl font-semibold"></h3>
      <Card className="mx-auto mt-8 max-w-lg">
        <CardHeader>User Data</CardHeader>
        <CardContent>{JSON.stringify(data, null, 2)}</CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
