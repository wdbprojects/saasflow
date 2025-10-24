import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { caller } from "@/trpc/server";
import Link from "next/link";

const HomePage = async () => {
  const users = await caller.getUsers();

  return (
    <div>
      <h2 className="mb-4 flex items-center justify-between p-3 text-2xl">
        Welcome to love and abundance
      </h2>
      <Button size="lg" asChild>
        <Link href={routes.about}>Money & Abundance</Link>
      </Button>
      <h3 className="text-primary text-2xl font-semibold"></h3>
      <p>{JSON.stringify(users)}</p>
    </div>
  );
};

export default HomePage;
