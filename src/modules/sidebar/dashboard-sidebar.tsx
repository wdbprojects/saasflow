import { Sidebar } from "@/components/ui/sidebar";
import React from "react";

const DashboardSidebar = () => {
  return (
    <Sidebar
      className="z-40 rounded border-none pt-18"
      variant="floating"
      collapsible="offcanvas"
    >
      <div className="p-4">DashboardSidebar</div>
    </Sidebar>
  );
};

export default DashboardSidebar;
