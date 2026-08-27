import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import SignPicker from "../sign-picker";
import { Input } from "@/components/ui/input";

import { X } from "lucide-react"
import { useTransition, useState, useEffect } from "react";
import { getAllSigns } from "@/lib/admin-actions";
import { SignData } from "@/types";


interface SignDialogProps {
  value: string;
  onChange: (value: string) => void;
}


export default function SignDialog ({value, onChange}: SignDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [signs, setSigns] = useState<SignData[]>([]);
useEffect(()=>{
  startTransition(() => {

    const runGetAllSigns = async () => {
      const { data } = await getAllSigns();
      setSigns(data);
    };

    runGetAllSigns();

  });
})
  return (
    <Dialog>

          <Input 
          value={value ?? "No Sign Selected"}
          disabled={true}
           readOnly 
          tabIndex={-1}
          className="pointer-events-none cursor-pointer border-none bg-transparent outline-none"
           />
         <DialogTrigger asChild>
          <button type="button" className="flex items-center gap-2 border p-2 rounded w-full text-left">
            <input 
              value={value ? value : "No Sign Selected"} 
              readOnly 
              tabIndex={-1}
              className="pointer-events-none cursor-pointer border-none bg-transparent outline-none"
            />
            <span className="ml-auto font-medium text-sm text-blue-600">Pick a Sign</span>
          </button>
        </DialogTrigger>
          <DialogContent >

          <DialogClose />

            <DialogTitle>Choose a Sign</DialogTitle>
            
            <SignPicker 
              selectedSignId={value} 
              onChange={(sign)=> onChange(sign.id)}
              isPending={isPending}
              signs={signs}
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