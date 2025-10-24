import FetchClientTRPC from "@/modules/components/misc/fetch-client-trpc";

const AboutPage = () => {
  return (
    <div className="block w-full pt-[4rem] pb-[0rem]">
      <h2 className="my-4 text-center text-2xl">About Us</h2>
      <div className="grid grid-cols-2 gap-4">
        <p className="rounded-sm border p-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur
          laboriosam quia qui dignissimos! Impedit iste dolor molestias fuga
          illo beatae!
        </p>
        <div className="rounded-sm border p-3">
          <FetchClientTRPC />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
