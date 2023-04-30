import mongoose, { model, Schema, models, Document, Model } from "mongoose";

export interface ImgType {
    public_id: string; url: string;
}

export interface IProduct {
    _id: string;
    title: string;
    description: string;
    price: number;
    images: ImgType[];
    category: mongoose.Schema.Types.ObjectId | string;
    properties: any;
    createdAt?: string;
    updatedAt?: string;
    inStock: number;
}

type ProductDocument = Document & IProduct;

const ProductSchema = new Schema<ProductDocument>({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    images: [{ public_id: { type: String, required: true }, url: { type: String, required: true } }],
    properties: [{ type: Object }],
    inStock: { type: Number, required: true }
}, {
    timestamps: true,
});

const PoductModel = models?.Product as Model<ProductDocument> || model<ProductDocument>('Product', ProductSchema);

export default PoductModel;