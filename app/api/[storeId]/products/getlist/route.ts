import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
    try{

        const storeId = params.storeId;
        const body = await req.json();
        const {products} = body;
       

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!products || !products.length) {
            return new NextResponse("Products are required", { status: 400 });
        }

        //check if store exists
        const store = await prismadb.store.findFirst({
            where: {
                id: storeId
            }
        });

        if (!store) {
            return new NextResponse("Store not found", { status: 404 });
        }

        const existingProducts = await prismadb.product.findMany({
            where: {
                name: {
                    in: products.map((p: any) => p.Product)
                }
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
              },
              orderBy: {
                createdAt: 'desc',
            }     
        });

    
        return NextResponse.json(existingProducts);
    
    } catch (error) {
      console.log('[PRODUCTS_POST]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
};