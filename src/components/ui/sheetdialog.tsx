import React from 'react';
import { Button } from "./button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./sheet"
export const SheetDialog = ({isOpen, onOpenChange}:{isOpen:boolean,onOpenChange:(open: boolean)=>void}) => {
  return (
    <Sheet open ={isOpen} onOpenChange={onOpenChange} >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
       
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}


