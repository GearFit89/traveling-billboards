"use client"; // Required for client-side hooks and navigation

import Button from '@/client/Button';
import { useRouter } from 'next/navigation';

import { Icon } from '../icons';
interface BackProps {
     children?: React.ReactNode;
     [key: string]: any
}
export default function NavigateBackButton({ children, ...props }:BackProps){
    const router = useRouter();

    return (
        <>
            <Button onClick={()=>{router.back()}}{ ...props}>
                <Icon name="arrowLeft" className="mr-2" />
                {children}
            </Button>
        </>
    )
}