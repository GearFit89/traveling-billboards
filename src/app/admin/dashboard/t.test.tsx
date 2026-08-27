"use client"

import { RichTextEditor } from "./rich-text-editor";


import { useState } from "react";



export function Editor () {
      const [value, setValue] = useState<string>("");
    return (
    <div>
    
    <RichTextEditor id="i"  value={value} onChange={setValue} ></RichTextEditor>
   {value}

</div>
    )
    
}