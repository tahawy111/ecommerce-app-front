import { IProduct } from '@/models/Product';
import Link from 'next/link';
import { FC, useContext } from 'react';
import { Icons } from './Icons';
import { CartContext, CartContextInteface } from './contexts/CartContext';
import { toast } from 'react-hot-toast';

interface FeaturedProps {
    product: IProduct;
}

const Featured: FC<FeaturedProps> = ({ product }) => {
    const { addProduct } = useContext(CartContext);


    return <div className='bg-main text-white py-10'>
        <div className="big-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex justify-center flex-col gap-y-3">
                    <h1 className='text-5xl mb-3 capitalize'>{product.title}</h1>
                    <p className='text-gray-100/70 font-normal text-sm'>{product.description}</p>
                    <div className="flex gap-1 mt-7">
                        <Link href={`/product/${product._id}`} className="btn-outline">Read More</Link>
                        <button disabled={product.inStock < 1} onClick={() => {
                            addProduct(product._id)
                            toast.success('Product added to cart')
                        }} className="btn-primary flex items-center gap-x-1">
                            <Icons.CartIcon />
                            <span className="">Add To Cart</span></button>
                    </div>
                </div>
                <div className="max-w-full">
                    <img src="https://dawid-next-ecommerce.s3.amazonaws.com/1679151719649.png" alt="" />
                </div>

            </div>
        </div>
    </div>;
};

export default Featured;