import { getQueryClient, trpc } from "@/trpc/server";
import SuspenseClientTRPC from "@/modules/components/misc/suspense-client-trpc";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const ContactPage = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="block w-full pt-[4rem] pb-[0rem]">
      <h2 className="my-4 text-center text-2xl">Contact Us</h2>
      <div className="grid grid-cols-2 gap-4">
        <p className="rounded-sm border p-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur
          laboriosam quia qui dignissimos! Impedit iste dolor molestias fuga
          illo beatae!
        </p>
        <div className="rounded-sm border p-3">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<p>Loading...</p>}>
              <SuspenseClientTRPC />
            </Suspense>
          </HydrationBoundary>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
