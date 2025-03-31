
import React from 'react';
import { cn } from '@/lib/utils';

interface PasswordStrengthMeterProps {
  strength: number;
}

const PasswordStrengthMeter = ({ strength }: PasswordStrengthMeterProps) => {
  const getColorClass = (value: number) => {
    if (value === 0) return 'bg-gray-200 dark:bg-gray-700';
    if (value <= 2) return 'bg-strength-weak';
    if (value <= 4) return 'bg-strength-medium';
    return 'bg-strength-strong';
  };

  const getLabel = () => {
    if (strength === 0) return 'Enter password';
    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="space-y-1 animate-slide-up">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((segment) => (
          <div
            key={segment}
            className={cn(
              "h-2 flex-1 rounded-sm transition-all duration-300",
              segment <= strength ? getColorClass(strength) : "bg-gray-200 dark:bg-gray-700"
            )}
          />
        ))}
      </div>
      <p className={cn(
        "text-xs font-medium",
        strength <= 2 && strength > 0 ? "text-strength-weak" : "",
        strength <= 4 && strength > 2 ? "text-strength-medium" : "",
        strength === 5 ? "text-strength-strong" : ""
      )}>
        {getLabel()}
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
