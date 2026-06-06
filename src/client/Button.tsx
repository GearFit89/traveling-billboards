"use client"

interface ButtonProps {
  children: React.ReactNode;
  [key: string]: any;
}

export default function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>
}