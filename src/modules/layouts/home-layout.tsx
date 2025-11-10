import { LayoutPropsMain } from "@/config/types";
import HeaderMain from "@/modules/components/layout/header-main";

const HomeLayout = ({ children }: LayoutPropsMain) => {
  return (
    <>
      <HeaderMain />
      <main className="container mx-auto px-2 md:px-4">{children}</main>
    </>
  );
};

export default HomeLayout;
