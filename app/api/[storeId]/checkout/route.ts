import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {

      const { productIds , userId } = await req.json();

      if (!productIds || productIds.length === 0) {
        return NextResponse.json( {message : "Product ids are required" , status : 500} , {
          headers: corsHeaders
        });
      }

      if (!params.storeId) {
        return NextResponse.json( {message : "Store id is required" , status : 500} , {
          headers: corsHeaders
        });
      }

      if (!userId) {
        return NextResponse.json( {message : "User id is required" , status : 500} , {
          headers: corsHeaders
        });
      }
      
      
      try {
          const user = await prismadb.user.findUnique({
            where: {
              id: userId
            }
          });
          if (!user) {
            return NextResponse.json( {message : "User not Found" , status : 500} , {
              headers: corsHeaders
            });
          }
      }
      catch (error) {
          console.error(error);
          return new NextResponse("Internal server error", { status: 500 });
      }

      try {

          const order = await prismadb.order.create({
            data: {
              storeId: params.storeId,
              isPaid: false,
            userId: userId,
            orderItems: {
              create: productIds.map((productId: string) => ({
                product: {
                  connect: {
                    id: productId
                  }
                }
              }))
            }
          }
        });

        console.log(order);

        return NextResponse.json( {message : "success" , status : 200} , {
          headers: corsHeaders
        });
  
  }
  catch (error) {
      console.error(error);
      return NextResponse.json( {message : "Error Placing Order" , status : 500} , {
        headers: corsHeaders
      });
  }

  
};
