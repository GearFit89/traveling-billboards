"use client"


import { SignData } from "@/types";
import { useState } from "react";
import { Sign } from "../signs/Sign";

interface SignPickerProps {
  signs?: SignData[]
  onChange: (sign: SignData)=> void
  selectedSignId: string
  isPending: boolean
}

export default function SignPicker ({ signs, onChange, selectedSignId, isPending}: SignPickerProps){

    if (isPending && (!signs || signs.length === 0)) {
    return <div className="p-4 text-center text-gray-500">Loading signs...</div>
  }
    if((!signs || signs?.length === 0) ){
        return <div>There are signs to select</div>
    }
    


    return (
        <div>
           {signs.map((sign) => {
        const isSelected = sign.id === selectedSignId;
        
        return (
          <div
            key={sign.id}
            className={`relative rounded-lg border p-2 transition-all ${
              isSelected ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            
           

            <button
              type="button"
              onClick={() => onChange(sign)}
              className="w-full text-left"
            >
               <span className="absolute top-2 right-2 rounded bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
              {sign.id}
            </span>
              <Sign sign={sign} />
            </button>
          </div>
        );
      })}

      </div>
    )
}
   

