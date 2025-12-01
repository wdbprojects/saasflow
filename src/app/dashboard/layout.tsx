import { LayoutPropsMain } from "@/config/types";
import { requireAuth } from "@/lib/auth-utils";
import DashboardLayout from "@/modules/layouts/dashboard-layout";

const DashboardLayoutMain = async ({ children }: LayoutPropsMain) => {
  await requireAuth();
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardLayoutMain;
