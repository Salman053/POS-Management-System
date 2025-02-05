import { Expand, Minimize } from "lucide-react";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useFullscreen } from "@/hooks/use-fullscreen";

const FullscreenButton: React.FC = () => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <TooltipProvider >
      <Tooltip >
        <TooltipTrigger className="hidden md:block">
          <button onClick={toggleFullscreen} className="">
            {isFullscreen ? <Minimize /> : <Expand />}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Click to {isFullscreen ? "minimize" : "maximize"}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FullscreenButton;
