import { LayoutPropsMain } from "@/config/types";
import HeaderMain from "@/modules/components/layout/header-main";

const HomeLayout = ({ children }: LayoutPropsMain) => {
  return (
    <div>
      <HeaderMain />
      <main className="container mx-auto px-2 md:px-4">{children}</main>
    </div>
  );
};

export default HomeLayout;
