import { Card, CardHeader } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex w-full flex-col justify-between pt-[4rem] pb-[0rem]">
      <div className="flex-1 p-2">
        <h2 className="text-xl font-semibold">Dashboard Content</h2>
        <div className="mt-8 block">
          <Card className="mx-auto w-full max-w-md overflow-clip">
            <CardHeader>
              <div className="block w-full">
                <pre className="text-sm">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
