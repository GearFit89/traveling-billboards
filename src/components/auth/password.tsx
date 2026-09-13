"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

interface PasswordProps {
    password: string;
    onChange: (password: string) => void
}


export default function Password( { password, onChange}: PasswordProps){
    
    const [isPasswdHidden, setIsPasswdHidden] = useState<boolean>(true);
    return (
         <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative flex items-center w-full max-w-sm">
                    <Input
                      id="password"
                      type={isPasswdHidden ? "password" : "text"}
                      value={password}
                      onChange={(e) => onChange(e.target.value)}
                      required
                    />
        
                    <Button onClick={() => setIsPasswdHidden(!isPasswdHidden)}>
                      {isPasswdHidden ? <Eye /> : <EyeClosed />}
                    </Button>
                  </div>
                </div>
        
    )

}