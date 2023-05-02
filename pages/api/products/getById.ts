import { generateAccessToken } from "@/lib/generateToken";
import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { loadProductById } from "@/lib/loadApis";



export default async function handler ( req: NextApiRequest, res: NextApiResponse )
{
    switch ( req.method )
    {
        case "POST":
            // await login(req, res);
            break;
        case "GET":
            await fetch( req, res );
            break;
        case "PUT":
            // await updateProduct(req, res);
            break;
        case "DELETE":
            // await deleteProduct(req, res);
            break;
    }
};


const fetch = async ( req: NextApiRequest, res: NextApiResponse ) =>
{
    try
    {
        res.json( await loadProductById( req.query?.id as string ) );
    } catch ( error )
    {

        console.log( error );

    }




};