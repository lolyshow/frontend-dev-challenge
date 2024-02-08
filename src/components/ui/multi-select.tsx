import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "./badge";
import { Command, CommandGroup, CommandItem } from "./command";
import { Command as CommandPrimitive } from "cmdk";
import { SelectType } from "~/types/selectype";

interface FancyMultiSelectProps {
  options: SelectType[];
  setSelected: (selected: SelectType[]) => void;
  selected: SelectType[];
}

export const FancyMultiSelect: React.FC<FancyMultiSelectProps> = ({
  options,
  setSelected,
  selected,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (option: SelectType) => {
      const filteredData = selected.filter((s) => s.id !== option.id);
      
      setSelected(filteredData);
    },
    [setSelected],
  );

  const handleSelect = React.useCallback(
    (option: SelectType) => {
      setInputValue("");

      const newData = [...selected, option];
      setSelected(newData);
    },
    [setSelected],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected.length > 0) {
            const newSelected = selected;
            newSelected.pop();
            setSelected(newSelected);
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selected, setSelected],
  );

  const selectables = options.filter(
    (option) => !selected?.some((s) => s.id === option.id),
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="col-span-3 overflow-visible bg-transparent"
    >
      <div className="group col-span-3 rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected?.map((option) => (
            <Badge key={option.id} variant="secondary">
              {option.name}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(option);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(option)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select options..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        { open && selectables.length > 0 && (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className=" h-56 overflow-scroll">
              {selectables.map((option) => (
                <CommandItem
                  key={option.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    handleSelect(option);
                  }}
                  className={"cursor-pointer"}
                >
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
};
