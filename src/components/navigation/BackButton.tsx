"use client"; // Required for client-side hooks and navigation

import Button from '@/client/Button';
import { useRouter } from 'next/navigation';

interface BackProps {
     children?: React.ReactNode;
     [key: string]: any
}
export default function NavigateBackButton({ children, ...props }:BackProps){
    const router = useRouter();

    return (
        <>
            <Button onClick={()=>{router.back()}}{ ...props}>
                {children}
            </Button>
        </>
    )
}