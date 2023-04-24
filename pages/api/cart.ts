import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  mongooseConnect();
  switch (req.method) {
    case "POST":
      await getCartProducts(req, res);
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

async function getCartProducts(req: NextApiRequest, res: NextApiResponse) {
  const ids = req.body.ids;
  res.json(await Product.find({ _id: ids }));
}