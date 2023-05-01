"use client";
import { IProduct } from '@/models/Product';
import Image from 'next/image';
import { FC, useContext } from 'react';
import { Icons } from './Icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CartContext } from './contexts/CartContext';
import { toast } from 'react-hot-toast';

interface ProductBoxProps extends IProduct {

}

const ProductBox: FC<ProductBoxProps> = ({ _id, title, description, images, price, inStock }) => {
    const { addProduct } = useContext(CartContext);
    const url = `/product/${_id}`;
    const router = useRouter();
    return <div>
        <div className='bg-white p-5 text-center flex items-center justify-center rounded-lg min-h-[150px]'>
            <img src={images[0].url} className='max-w-full max-h-[80px]' alt="" />
        </div>
        <div className='font-normal text-sm m-0'>

            <div onClick={() => router.push(url)} className='mt-1 hover:underline cursor-pointer'>
                {title.substring(0, 27)}...
            </div>

            <div className="flex items-center gap-1 justify-between">
                <div className='text-2xl font-bold'>${price}</div>
                <button disabled={inStock < 1} onClick={() => {
                    addProduct(_id)
                    toast.success('Product added to cart')
                    }} className='btn-primary-outline py-1'><Icons.CartIcon /></button>
            </div>
        </div>

    </div>;
};

export default ProductBox;