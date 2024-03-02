import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


import { Roles } from "@/types/globalEnums"

import { auth } from "@clerk/nextjs"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});


 
export const getRole = () => {

  const { sessionClaims } = auth()
  
  if (sessionClaims?.metadata?.role) {
    return sessionClaims.metadata.role
  }

  return Roles.notDefined;

}