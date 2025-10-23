import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutPropsMain } from "@/config/types";
import HeaderDashboard from "@/modules/components/layout/header-dashboard";
import DashboardSidebar from "@/modules/sidebar/dashboard-sidebar";

const DashboardLayout = ({ children }: LayoutPropsMain) => {
  return (
    <SidebarProvider>
      <HeaderDashboard />
      <div className="flex w-full overflow-y-auto">
        <DashboardSidebar />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
