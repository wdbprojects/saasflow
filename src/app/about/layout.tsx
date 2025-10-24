import { LayoutPropsMain } from "@/config/types";
import HomeLayout from "@/modules/layouts/home-layout";

const HomeLayoutMain = ({ children }: LayoutPropsMain) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default HomeLayoutMain;
