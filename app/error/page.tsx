// This page will guide buyer to client webpage

import Link from "next/link";

const errorPage = () => {

    const link = process.env.NEXT_PUBLIC_CLIENT_URL + "";

    return (
            <div className="max-w-md mx-auto my-5 p-6 border border-black rounded-lg text-center">
                <h1 className="mb-4 text-base">You are Currently Logged in as a Buyer</h1>
                <h1 className="mb-4 text-base">To access Seller Dashboard you will have to set up a seller account using a different email.</h1>
                <h1 className="text-base mb-4">Thank you</h1>
                <br />
                <p className="text-xs mb-2">To go to Buyer Store please Click Below</p>
                <p className="text-xs mb-2">If you already have a seller account, use that to login.</p>

                <Link href={link} className="block w-full bg-blue-600 border-3 border-slate-900 mt-6 text-white rounded-lg py-3 text-center">Contiue to Store</Link>

            </div>
    );
}

export default errorPage;