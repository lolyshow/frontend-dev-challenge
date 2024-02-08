import { UnitType } from "@prisma/client";
import React from "react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";

interface DetailsModalProps {
  triggerElement: React.ReactNode;
  unitTypes: UnitType[];
}

export const Detailsmodal = ({
  triggerElement,
  unitTypes,
}: DetailsModalProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{triggerElement}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          
          <div className="grid gap-2 px-2">
            <div className="flex justify-between mb-3"> 
            <p>Name</p>
            <p>Length</p>
            </div>
            {unitTypes.map((unitType, index) => (
              <div className="flex justify-between gap-4" key={index}>
                <Label>{unitType?.name}</Label>
                <Label className="my-1 ">{unitType?.defaultLength}</Label>
                
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
