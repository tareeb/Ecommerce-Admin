import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

// import { Roles } from '@/types/globals';
import { getRole } from '@/lib/utils';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }


  if(getRole() === "notDefined"){
    console.log("Redirecting to onboarding page because role is not defined.");
    redirect('/onboarding');
  }else if(getRole() === "buyer"){
    redirect('/error');
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    }
  });

  if (store) {
    redirect(`/${store.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};
