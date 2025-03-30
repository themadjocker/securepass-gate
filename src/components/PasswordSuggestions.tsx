
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface PasswordSuggestionsProps {
  basedOn: string;
  onSelect: (suggestion: string) => void;
}

const PasswordSuggestions = ({ basedOn, onSelect }: PasswordSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Generate stronger password suggestions based on the user input
    const generateSuggestions = () => {
      if (!basedOn) return [];
      
      const base = basedOn.substring(0, Math.min(basedOn.length, 5));
      const specialChars = ['!', '@', '#', '$', '%', '&'];
      
      return [
        // Add uppercase
        `${base}${base.length > 0 ? base[0].toUpperCase() : 'A'}${Math.floor(Math.random() * 100)}${specialChars[Math.floor(Math.random() * specialChars.length)]}`,
        
        // Add numbers and special chars
        `${base}${Math.floor(Math.random() * 1000)}${specialChars[Math.floor(Math.random() * specialChars.length)]}!`,
        
        // Complete replacement with secure pattern
        `${base.charAt(0).toUpperCase() || 'S'}ecure${Math.floor(Math.random() * 100)}${specialChars[Math.floor(Math.random() * specialChars.length)]}`
      ];
    };
    
    setSuggestions(generateSuggestions());
  }, [basedOn]);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 animate-slide-up">
      <p className="text-sm font-medium text-gray-600">Suggested stronger passwords:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            type="button"
            variant="outline"
            className="text-xs"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
      <p className="text-xs text-gray-500">Add another word or two. Uncommon words are better.</p>
    </div>
  );
};

export default PasswordSuggestions;
