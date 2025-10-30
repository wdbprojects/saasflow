import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { LayoutPropsMain } from "@/config/types";
import { TRPCReactProvider } from "@/trpc/client";
import NextTopLoader from "nextjs-toploader";

const Providers = ({ children }: LayoutPropsMain) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <NextTopLoader showSpinner={false} color="#f97316" />
        {children}
        <Toaster richColors closeButton position="bottom-right" expand={true} />
      </ThemeProvider>
    </TRPCReactProvider>
  );
};
export default Providers;
