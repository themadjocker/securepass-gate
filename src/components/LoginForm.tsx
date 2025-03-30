
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Shield } from "lucide-react";
import Logo from "@/components/Logo";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import PasswordSuggestions from "@/components/PasswordSuggestions";
import PasswordRequirements from "@/components/PasswordRequirements";

const LoginForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoginAttempted, setIsLoginAttempted] = useState(false);
  
  // Enhanced password validation
  const passwordValidator = {
    minLength: password.length >= 8 && password.length <= 15,
    hasUppercase: /[A-Z]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    hasNumber: /\d/.test(password),
    isUncommon: !/(password|123456|qwerty|admin|welcome|letmein|monkey|sunshine|princess)/i.test(password),
  };
  
  // Count how many requirements are met
  const passwordStrength = Object.values(passwordValidator).filter(Boolean).length;
  
  // Track login attempts to prevent brute force
  const handleLoginAttempt = () => {
    setIsLoginAttempted(true);
    
    // For demonstration purposes, we're just setting a state
    // In a real app, you would implement rate limiting logic here
    setTimeout(() => {
      setIsLoginAttempted(false);
    }, 3000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Password policy enforcement
    if (passwordStrength < 5) {
      toast({
        title: "Password requirements not met",
        description: "Please ensure your password meets all the security requirements.",
        variant: "destructive"
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the Terms of Service and Privacy Policy.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate login attempt tracking for brute force prevention
    handleLoginAttempt();
    
    // Proceed with login only if all validations pass
    toast({
      title: "Login successful",
      description: "You have successfully logged in!",
    });
    
    console.log("Form submitted:", { email, password });
  };
  
  // Password input handler with sanitization
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic input sanitization (prevent copy-pasting of very long strings)
    const sanitizedValue = e.target.value.slice(0, 50);
    setPassword(sanitizedValue);
  };
  
  return (
    <Card className="w-full bg-white shadow-lg transition-all duration-300 animate-fade-in">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <Logo />
        <CardTitle className="text-2xl font-semibold text-center">Create an account</CardTitle>
        <p className="text-sm text-gray-500 text-center">to continue to Coil</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-medium uppercase text-gray-500">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
              autoComplete="new-email" // Prevent browser autofill
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-xs font-medium uppercase text-gray-500">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                required
                className="h-12 pr-12"
                onFocus={() => setShowSuggestions(true)}
                autoComplete="new-password" // Prevent browser autofill
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {/* Password strength meter */}
          <PasswordStrengthMeter strength={passwordStrength} />
          
          {/* Password requirements */}
          {password.length > 0 && <PasswordRequirements password={password} validator={passwordValidator} />}
          
          {/* Password suggestions */}
          {showSuggestions && password.length > 0 && passwordStrength < 5 && (
            <PasswordSuggestions 
              basedOn={password} 
              onSelect={(suggestion) => {
                setPassword(suggestion);
                setShowSuggestions(false);
              }} 
            />
          )}
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="terms" 
              checked={acceptTerms} 
              onCheckedChange={(checked) => setAcceptTerms(checked === true)}
            />
            <label htmlFor="terms" className="text-sm text-gray-500 leading-none">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
            disabled={!email || passwordStrength < 5 || !acceptTerms || isLoginAttempted}
          >
            {isLoginAttempted ? (
              <>Processing...</>
            ) : (
              <>
                <Shield className="mr-2" size={18} />
                Create Secure Account
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">Sign in</a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
