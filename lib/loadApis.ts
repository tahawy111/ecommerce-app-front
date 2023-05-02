import Product from "@/models/Product";
import { mongooseConnect } from "./mongoose";

export async function loadProducts ()
{
    await mongooseConnect();
    // Products
    const products = await Product.find( {}, null, { sort: { '_id': -1 } } );

    return products;
}
export async function loadProductById ( id: string )
{
    await mongooseConnect();
    // Products
    const product = await Product.findById( id );

    return product;
}
export async function loadFeatued ()
{
    await mongooseConnect();
    const featuredProductId = `64452f40086182b2c4b4b2a2`;
    const featuredProduct = await Product.findById( featuredProductId );

    // New Products
    // const newProducts = await Product.find({}, null, { sort: { '_id': -1 } });
    const newProducts = await Product.find().sort( { "_id": -1 } ).limit( 10 );

    return { featuredProduct, newProducts };
}