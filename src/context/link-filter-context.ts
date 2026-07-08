"use client"


import {createContext, useContext, useState} from "react"


 export const LinkFilterContext = createContext<{sectionNames?: string []}>({});


export function useLinkFilterContext() {
    try{
        const context = useContext(LinkFilterContext);

        return context;
    }catch(e){

        throw new Error("LInkFIlterContext cannnot be found")
    }
}