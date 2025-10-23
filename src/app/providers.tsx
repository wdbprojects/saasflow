import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { LayoutPropsMain } from "@/config/types";
import NextTopLoader from "nextjs-toploader";

const Providers = ({ children }: LayoutPropsMain) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <NextTopLoader showSpinner={false} color="#7c3aed" />
      {children}
      <Toaster richColors closeButton position="bottom-right" expand={true} />
    </ThemeProvider>
  );
};
export default Providers;
