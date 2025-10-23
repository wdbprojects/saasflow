import { Card, CardHeader } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(routes.login);
  }

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
