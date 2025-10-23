import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div>
      <h2 className="mb-4 flex items-center justify-between p-3 text-2xl">
        Welcome to love and abundance
      </h2>
      <Button size="lg">Money & Abundance</Button>
    </div>
  );
};

export default HomePage;
