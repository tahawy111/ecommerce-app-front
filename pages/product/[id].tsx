import { mongooseConnect } from '@/lib/mongoose';
import Product, { IProduct } from '@/models/Product';
import { Context, FC, useContext } from 'react';
import type { GetServerSideProps } from "next";
import Header from '@/components/Header';
import ProductImages from '@/components/ProductImages';
import { CartContext } from '@/components/contexts/CartContext';
import { Icons } from '@/components/Icons';

interface ProductPageProps {
    product: IProduct;
}

const ProductPage: FC<ProductPageProps> = ({ product }) => {
    const { addProduct } = useContext(CartContext);
    return <>
        <Header />
        <div className="center mt-7">
            <div className="grid grid-cols-1 md:grid-cols-[.8fr_1.2fr] gap-x-9 my-9">
                <div className="bg-white rounded-lg p-7"><ProductImages images={product.images} /></div>
                <div className="">

                    <h2 className='font-medium my-7'>{product.title}</h2>
                    <p className='font-normal my-7'>{product.description}</p>

                    <div className="flex items-center gap-1 justify-between">
                        <div className='text-2xl font-bold'>${product.price}</div>
                        <button disabled={product.inStock < 1} onClick={() => addProduct(product._id)} className='btn-primary-outline py-1'><span className='flex items-center gap-3'><div className="">Add To Cart</div> <Icons.CartIcon /></span></button>
                    </div>

                </div>
            </div>

        </div>
    </>;
};

export default ProductPage;

export async function getServerSideProps(context: any) {
    await mongooseConnect();
    // Product
    const product = await Product.findById(context.query.id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    };
}