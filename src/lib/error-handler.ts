import { AppError } from "@/utils/error";
import { redirect } from "next/navigation";
import { getIsBuildPharse } from "./utils";
import Console from "@/utils/console";


const lConsole = new Console('ERROR_HANDLER') // lConsole to avoid mixing up with console

export default  function errorHandler(error: Error|string, code:number=600, shouldRedirect: boolean = false){
   const message = typeof error  === "string" ? error: error.message;

    if (getIsBuildPharse()){
        //if we are building we can't handle error cacthing.
        //nor can we handle redirection without breaking the ISR
     
        lConsole.error("build pharse got error", error)  //custom console to log the error, for debugging
          
        return;
    }
    
    if(shouldRedirect){
        
         redirect(`/error/${message}`);
    }


    throw new AppError(message, code);
           
}