
import React from 'react';
import { Check, X } from 'lucide-react';

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
  const requirements = [
    { label: '8-15 characters', met: validator.minLength },
    { label: 'At least one uppercase letter', met: validator.hasUppercase },
    { label: 'At least one special character', met: validator.hasSpecialChar },
    { label: 'At least one number', met: validator.hasNumber },
    { label: 'Uncommon password', met: validator.isUncommon }
  ];

  return (
    <div className="space-y-2 text-sm animate-slide-up">
      <p className="font-medium text-gray-600">Password requirements:</p>
      <ul className="space-y-1">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className={`flex-shrink-0 ${req.met ? 'text-green-500' : 'text-red-500'}`}>
              {req.met ? <Check size={16} /> : <X size={16} />}
            </span>
            <span className={req.met ? 'text-gray-600' : 'text-gray-500'}>
              {req.label}
            </span>
          </li>
        ))}
      </ul>
      
      {!validator.isUncommon && (
        <div className="text-red-500 text-xs mt-1 flex items-start space-x-1 bg-red-50 p-2 rounded">
          <CircleAlert size={14} className="mt-0.5 flex-shrink-0" />
          <p>This is a top-100 common password.</p>
        </div>
      )}
    </div>
  );
};

export default PasswordRequirements;
