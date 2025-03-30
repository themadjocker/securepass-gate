
import React from 'react';
import { Check, X, CircleAlert, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PasswordValidatorType {
  minLength: boolean;
  hasUppercase: boolean;
  hasSpecialChar: boolean;
  hasNumber: boolean;
  isUncommon: boolean;
}

interface PasswordRequirementsProps {
  password: string;
  validator: PasswordValidatorType;
}

const PasswordRequirements = ({ password, validator }: PasswordRequirementsProps) => {
  // Calculate password entropy (simplified version)
  const calculateEntropy = (pwd: string): number => {
    if (!pwd) return 0;
    
    const charsetSize = 
      ((/[a-z]/.test(pwd) ? 26 : 0) + 
      (/[A-Z]/.test(pwd) ? 26 : 0) + 
      (/[0-9]/.test(pwd) ? 10 : 0) + 
      (/[^a-zA-Z0-9]/.test(pwd) ? 33 : 0));
    
    return Math.floor(pwd.length * Math.log2(charsetSize));
  };
  
  // Check if password has sequential patterns
  const hasSequentialPatterns = (pwd: string): boolean => {
    if (pwd.length < 3) return false;
    
    for (let i = 0; i < pwd.length - 2; i++) {
      // Check for sequential characters (abc, 123, etc.)
      if (pwd.charCodeAt(i + 1) === pwd.charCodeAt(i) + 1 && 
          pwd.charCodeAt(i + 2) === pwd.charCodeAt(i) + 2) {
        return true;
      }
      
      // Check for repeated characters (aaa, 111, etc.)
      if (pwd[i] === pwd[i + 1] && pwd[i] === pwd[i + 2]) {
        return true;
      }
    }
    return false;
  };
  
  // Calculate entropy and check for patterns
  const entropy = calculateEntropy(password);
  const hasPatterns = hasSequentialPatterns(password);
  
  // Evaluate overall password strength considering additional factors
  const getStrengthEvaluation = () => {
    const validationsPassed = Object.values(validator).filter(Boolean).length;
    
    if (validationsPassed < 3 || entropy < 40 || hasPatterns) {
      return { 
        label: "Weak Password", 
        description: "This password is too easy to guess. " + 
          (entropy < 40 ? "It has low entropy (complexity). " : "") +
          (hasPatterns ? "It contains predictable patterns. " : ""),
        icon: <ShieldAlert className="text-red-500" size={18} />,
        color: "text-red-500" 
      };
    } else if (validationsPassed < 5 || entropy < 60) {
      return { 
        label: "Moderate Password", 
        description: "This password provides basic protection but could be stronger. " +
          (entropy < 60 ? "Consider increasing its complexity. " : ""),
        icon: <AlertTriangle className="text-amber-500" size={18} />,
        color: "text-amber-500" 
      };
    } else {
      return { 
        label: "Strong Password", 
        description: "This password provides good protection against hacking attempts.",
        icon: <ShieldCheck className="text-green-500" size={18} />,
        color: "text-green-500" 
      };
    }
  };
  
  const strengthEvaluation = getStrengthEvaluation();
  
  const requirements = [
    { 
      label: '8-15 characters', 
      met: validator.minLength,
      tooltip: 'Passwords should be long enough to be secure but short enough to remember'
    },
    { 
      label: 'At least one uppercase letter', 
      met: validator.hasUppercase,
      tooltip: 'Adding uppercase letters significantly increases password complexity'
    },
    { 
      label: 'At least one special character', 
      met: validator.hasSpecialChar,
      tooltip: 'Special characters like !@#$% make your password much harder to crack'
    },
    { 
      label: 'At least one number', 
      met: validator.hasNumber,
      tooltip: 'Numbers add another layer of complexity to your password'
    },
    { 
      label: 'Uncommon password', 
      met: validator.isUncommon,
      tooltip: 'Avoid commonly used passwords that are in breach databases'
    }
  ];

  return (
    <div className="space-y-3 text-sm animate-slide-up">
      <div className="flex items-center space-x-2">
        <p className="font-medium text-gray-600">Password requirements:</p>
        <div className={`${strengthEvaluation.color} flex items-center space-x-1`}>
          {strengthEvaluation.icon}
          <span className="text-xs font-semibold">{strengthEvaluation.label}</span>
        </div>
      </div>
      
      <ul className="space-y-1">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className={`flex-shrink-0 ${req.met ? 'text-green-500' : 'text-red-500'}`}>
              {req.met ? <Check size={16} /> : <X size={16} />}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className={req.met ? 'text-gray-600' : 'text-gray-500'}>
                    {req.label}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">{req.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        ))}
      </ul>
      
      {entropy > 0 && (
        <div className="pt-1 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Password Strength Score:</span>
            <span className={`font-medium ${
              entropy < 40 ? 'text-red-500' : entropy < 60 ? 'text-amber-500' : 'text-green-500'
            }`}>
              {entropy} bits
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
            <div 
              className={`h-1.5 rounded-full ${
                entropy < 40 ? 'bg-red-500' : entropy < 60 ? 'bg-amber-500' : 'bg-green-500'
              }`} 
              style={{ width: `${Math.min(entropy, 100)}%` }}>
            </div>
          </div>
        </div>
      )}
      
      {!validator.isUncommon && (
        <Alert variant="destructive" className="mt-1 py-2 bg-red-50">
          <AlertDescription className="text-xs flex items-start space-x-1">
            <CircleAlert size={14} className="mt-0.5 flex-shrink-0" />
            <span>This password appears in data breaches. It's in the top-100 common passwords and should not be used.</span>
          </AlertDescription>
        </Alert>
      )}
      
      {hasPatterns && (
        <Alert variant="destructive" className="mt-1 py-2 bg-red-50">
          <AlertDescription className="text-xs flex items-start space-x-1">
            <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
            <span>
              This password contains predictable patterns (like "123" or "abc") which make it easier to guess.
            </span>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="pt-1 rounded-md bg-blue-50 p-3 text-xs text-blue-700">
        <p className="font-medium mb-1">Password Security Best Practices:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Use different passwords for each of your accounts</li>
          <li>Consider using a password manager to store complex passwords</li>
          <li>Enable multi-factor authentication when available</li>
          <li>Avoid using personal information in your passwords</li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordRequirements;
