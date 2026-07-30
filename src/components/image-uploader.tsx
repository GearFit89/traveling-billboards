import { FILE_SIZE_LIMIT } from "@/const";
import { uploadImageToR2 } from "@/lib/admin-actions";
import { Button } from "@base-ui/react";
import { env } from "process";
import React, { Children, useState, useRef } from "react";

type ImageUploaderProps = {
  uploadUrl: string;
  authToken: string;
  children: React.ReactNode;
  onSuccess?: (response: any) => void;
  onError?: (error: string) => void;

};


export default function ImageUploader({
  uploadUrl,
  authToken,
  onSuccess,
  onError,
  children,

}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
const inputRef = useRef<HTMLInputElement>(null);
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    

    if (!file) return;

     if (!file.type.startsWith("image/")) {
    onError?.("Please select an image.");
    return;
}

  if (file.size > FILE_SIZE_LIMIT) {
    onError?.("Image is too large.");
    return;
}
    setUploading(true);

    try {
      const { data, success } = await uploadImageToR2(authToken, uploadUrl, file )
      
      if(!success || !data){
        throw new Error("Image Upload failed")
      }
     

      onSuccess?.(data);
    } catch (err) {
      onError?.((err as Error).message);
    } finally {
      setUploading(false);

      // Allow uploading the same file again
      e.target.value = "";
    }
  }

  return (
    <div>
     <label>
   <Button
    onClick={() => inputRef.current?.click()}
    disabled={uploading}
    className="
        inline-flex items-center justify-center
        rounded-lg
        bg-blue-600
        px-4 py-2
        font-medium
        text-white
        transition
        hover:bg-blue-700
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-50
    "
>
    {uploading ? "Uploading..." : "Upload"}
</Button>

    <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleChange}
    />
    {children}
</label>
</div>
  )
}