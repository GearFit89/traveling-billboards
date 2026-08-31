import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import SectionPicker from "../section-picker";
import { Input } from "@/components/ui/input";
import { useTransition, useState, useEffect } from "react";
import { X } from "lucide-react"
import { getAllSections } from "@/lib/actions";
import { LinkSection } from "@/types";


interface SectionDialogProps {
  value: string;
  onChange: (value: string) => void;
}


export default function SectionDialog ({value, onChange}: SectionDialogProps) {
  const [isPending, startTransition] = useTransition();
    const [sections, setsections] = useState<LinkSection[]>([]);

  useEffect (()=>{
    startTransition(() => {
  
      const runGetAllsections = async () => {
        const { data } = await getAllSections();
        setsections(data);
      };
  
      runGetAllsections();
  
    });
}, []);

  return (
    <Dialog>

          <Input 
          value={value ?? "No Section Selected"}
          disabled={true}
           readOnly 
          tabIndex={-1}
          className="pointer-events-none cursor-pointer border-none bg-transparent outline-none"
           />
         <DialogTrigger asChild>
          <button type="button" className="flex items-center gap-2 border p-2 rounded w-full text-left">
            <input 
              value={value ? value : "No Section Selected"} 
              readOnly 
              tabIndex={-1}
              className="pointer-events-none cursor-pointer border-none bg-transparent outline-none"
            />
            <span className="ml-auto font-medium text-sm text-blue-600">Pick a Section</span>
          </button>
        </DialogTrigger>
          <DialogContent >

          <DialogClose />

            <DialogTitle>Choose a Section</DialogTitle>
            
            <SectionPicker 
              selectedSectionId={value} 
              onChange={(section)=> onChange(section.id)}
              isPending={isPending}
              sections={sections}
             />

            <DialogClose asChild>
              <button type="button" className="mt-4 w-full btn-primary">
                Done
              </button>
            </DialogClose>

          </DialogContent>
        </Dialog>
       
  )
}