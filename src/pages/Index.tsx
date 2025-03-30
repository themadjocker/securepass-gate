
import LoginForm from "@/components/LoginForm";
import CreditsSection from "@/components/CreditsSection";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
      <CreditsSection />
    </div>
  );
};

export default Index;
