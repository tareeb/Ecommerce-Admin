import { NextResponse } from 'next/server';
import { clerkClient } from "@clerk/nextjs";
import prismadb from '@/lib/prismadb';
 
export async function POST(req: Request) {

    try {

    console.log("Inside the post request");
    const body = await req.json();
   
    const { userrole , userId } =   body;
    console.log(userrole , userId);

    if (!userrole) {
        return NextResponse.json({ success: false, message: "Role is required" });
    }

    if (!userId) {
        return NextResponse.json({ success: false, message: "User id is required" });
    }

    await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
        "role" : userrole
        }
    })

    const id = userId;
    const role = userrole;

    const users = await prismadb.user.create({
        data: {
            id,
            role,
          },
        });

    console.log(users);


  return NextResponse.json({ success: true });
  
    }
    catch (error) {
        console.log('[USER_ROLE_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
