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

// review

export async function POST(
    req: Request,
    { params }: { params: { storeId: string , productId : string} }
) {

      console.log("To be implemented");

      const { userId , rating } = await req.json();

      console.log(userId);
      console.log(rating);
      console.log(params.storeId);
      console.log(params.productId);


      if (!params.storeId) {
        return NextResponse.json( {message : "Store id is required" , status : 500} , {
          headers: corsHeaders
        });
      }

      if (!params.productId) {
        return NextResponse.json( {message : "Product id is required" , status : 500} , {
          headers: corsHeaders
        });
      }

      if (!userId) {
        return NextResponse.json( {message : "User id is required" , status : 500} , {
          headers: corsHeaders
        });
      }

      if (!rating) {
        return NextResponse.json( {message : "Rating is required" , status : 500} , {
          headers: corsHeaders
        });
      }
      
      // check if user exists or not
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

      // check if product exists or not
      try {
        const product = await prismadb.product.findUnique({
          where: {
            id: params.productId
          }
        });
        if (!product) {
          return NextResponse.json( {message : "Product not Found" , status : 500} , {
            headers: corsHeaders
          });
        }
      }
      catch (error) {
          console.error(error);
          return new NextResponse("Internal server error", { status: 500 });
      }

      // add review
      try {


       
        

        return NextResponse.json( {message : "success" , status : 200} , {
          headers: corsHeaders
        });
  
      }
      catch (error) {
          console.error(error);
          return NextResponse.json( {message : "Error Adding Review" , status : 500} , {
            headers: corsHeaders
          });
      }

};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string , productId : string} }
) {

    console.log("To be implemented");
    console.log(params.storeId);
    console.log(params.productId);


    if (!params.storeId) {
      return NextResponse.json( {message : "Store id is required" , status : 500} , {
        headers: corsHeaders
      });
    }

    if (!params.productId) {
      return NextResponse.json( {message : "Product id is required" , status : 500} , {
        headers: corsHeaders
      });
    }


    // check if product exists or not
    try {
      const product = await prismadb.product.findUnique({
        where: {
          id: params.productId
        }
      });
      if (!product) {
        return NextResponse.json( {message : "Product not Found" , status : 500} , {
          headers: corsHeaders
        });
      }
    }
    catch (error) {
        console.error(error);
        return new NextResponse("Internal server error", { status: 500 });
    }

    // get all reviews of same product id along with an average
    try {

      return NextResponse.json( {message : "success" , status : 200} , {
        headers: corsHeaders
      });

    }
    catch (error) {
        console.error(error);
        return NextResponse.json( {message : "Error Adding Review" , status : 500} , {
          headers: corsHeaders
        });
    }

};
