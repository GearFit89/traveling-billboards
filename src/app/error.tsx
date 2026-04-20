
"use client"
import ErrorPage from "@/ui/ErrorPage";

import { AppError } from "@/utils/error";

export default function Error({error, reset}:{error:AppError, reset:Function}){
    return <ErrorPage error={error} reset={reset} code={100}></ErrorPage>
}