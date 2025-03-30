
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserRound } from "lucide-react";

type ContributorProps = {
  name: string;
  initial: string;
};

const Contributor = ({ name, initial }: ContributorProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5">
            <Avatar className="h-6 w-6 bg-blue-100">
              <AvatarFallback className="text-xs text-blue-600 font-medium">
                {initial}
              </AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const CreditsSection = () => {
  const contributors = [
    { name: "Nikhil Jain", initial: "NJ" },
    { name: "Devansh Gundecha", initial: "DG" },
    { name: "Taarini Dulipala", initial: "TD" },
    { name: "Parth Powar", initial: "PP" },
    { name: "Joyjit Banerjee", initial: "JB" },
  ];

  return (
    <div className="fixed bottom-4 right-4 p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm animate-fade-in">
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 mb-2">
          <UserRound size={16} className="text-blue-600" />
          <span className="text-xs font-medium text-gray-700">Project Contributors:</span>
        </div>
        <ul className="flex flex-col gap-1.5">
          {contributors.map((contributor, index) => (
            <li key={index} className="text-xs text-gray-600">
              <Contributor name={contributor.name} initial={contributor.initial} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreditsSection;
