
import LoginForm from "@/components/LoginForm";
import CreditsSection from "@/components/CreditsSection";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 relative transition-colors duration-300">
      <ThemeToggle />
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
      <CreditsSection />
    </div>
  );
};

export default Index;
