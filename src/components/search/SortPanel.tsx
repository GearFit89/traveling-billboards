import { useState } from "react";
import { useSearchContext } from "@/context/search-context";
import { X, ArrowDownAZ, ArrowDown10, SortAsc, SortDesc } from "lucide-react";

// shadcn/ui imports
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SortPanelProps {
  isOpen: boolean;
  onClose: () => void;
  keyToSort: string;
}

export default function SortPanel({ isOpen, onClose, keyToSort }: SortPanelProps) {
  const { searcher } = useSearchContext();

  // Track strategy ('alpha' vs 'num') and order (true = Low-to-High/Asc, false = High-to-Low/Desc)
  const [sortStrategy, setSortStrategy] = useState<"alpha" | "num">("alpha");
  const [isHighToLowest, setIsHighToLowest] = useState<boolean>(true);

  if (!isOpen) return null;

  // Master function to execute the sort based on the current UI state
  const executeSort = (strategy: "alpha" | "num", highToLow: boolean) => {
    // highToLow = true means they checked "Highest to Lowest", so isASC must be false
    const isASC = !highToLow; 

    if (strategy === "alpha") {
      searcher?.alphaSort(keyToSort, isASC);
    } else {
      searcher?.numSort(keyToSort, isASC);
    }
  };

  const handleStrategyChange = (value: "alpha" | "num") => {
    setSortStrategy(value);
    executeSort(value, isHighToLowest);
  };

  const handleDirectionChange = (checked: boolean) => {
    setIsHighToLowest(checked);
    executeSort(sortStrategy, checked);
  };

  return (
    <div className="p-4 border rounded-lg bg-popover text-popover-foreground shadow-sm max-w-xs space-y-4 relative">
      {/* Close Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2 h-8 w-8" 
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="font-semibold text-sm tracking-tight mb-2">Sort Options</div>

      {/* Step 1: Choose strategy (Radio Group is best here so they don't conflict) */}
      <RadioGroup value={sortStrategy} onValueChange={handleStrategyChange} className="gap-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="alpha" id="alpha" />
          <Label htmlFor="alpha" className="flex items-center gap-2 cursor-pointer text-sm">
            <ArrowDownAZ className="h-4 w-4 text-muted-foreground" />
            Alphabetical Sort
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="num" id="num" />
          <Label htmlFor="num" className="flex items-center gap-2 cursor-pointer text-sm">
            <ArrowDown10 className="h-4 w-4 text-muted-foreground" />
            Numerical Sort
          </Label>
        </div>
      </RadioGroup>

      <hr className="border-border" />

      {/* Step 2: Choose direction (Highest to Lowest checkbox) */}
      <div className="flex items-center space-x-2 pt-1">
        <Checkbox 
          id="direction" 
          checked={isHighToLowest} 
          onCheckedChange={handleDirectionChange} 
        />
        <Label 
          htmlFor="direction" 
          className="flex items-center gap-2 cursor-pointer text-sm font-medium"
        >
          {isHighToLowest ? (
            <SortDesc className="h-4 w-4 text-primary" />
          ) : (
            <SortAsc className="h-4 w-4 text-muted-foreground" />
          )}
          Highest to Lowest
        </Label>
      </div>
    </div>
  );
}