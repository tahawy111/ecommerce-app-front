import { mongooseConnect } from "@/lib/mongoose";
import Order from "@/models/Order";
import Product, { IProduct } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    mongooseConnect();
    switch (req.method) {
        case "POST":
            await createOrder(req, res);
            break;
        case "GET":
            // await getCartProducts(req, res);
            break;
        case "PUT":
            // await updateProduct(req, res);
            break;
        case "DELETE":
            // await deleteProduct(req, res);
            break;
    }
};

async function createOrder(req: NextApiRequest, res: NextApiResponse) {

    try {


        for (const item of req.body.items) {
            console.log(item.product_data._id);

            const product = await Product.findById(item.product_data._id);
            if (!product) return res.status(400).json({ msg: "This product isn't exist." });
            product.inStock -= item.quantity;
            console.log(product);

            await Product.findByIdAndUpdate(item.product_data._id, product);

        }



    //    req.body.items.forEach((item:any) => {
    //     Product.findB
    //    });

        const newOrder = await Order.create(req.body);

        res.status(201).json({ success: true, order: newOrder });


    } catch (error) {

    }

}