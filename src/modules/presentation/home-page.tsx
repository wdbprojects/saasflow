import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const HomePage = async () => {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h2 className="mb-4 flex items-center justify-between p-3 text-2xl">
        Welcome to love and abundance
      </h2>
      <Button size="lg">Money & Abundance</Button>
      <Separator />
      <h3 className="text-primary text-2xl font-semibold">Users</h3>
      {JSON.stringify(users)}
    </div>
  );
};

export default HomePage;
