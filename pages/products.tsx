import Header from '@/components/Header';
import ProductBox from '@/components/ProductBox';
import { loadProducts } from '@/lib/loadApis';
import { mongooseConnect } from '@/lib/mongoose';
import Product, { IProduct } from '@/models/Product';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';

interface productsProps {
    products: IProduct[];
}

const Products: FC<productsProps> = () => {
    const [products, setProducts] = useState<IProduct[]>();
    useEffect(() => {
        axios.get(`/api/products/getAll`).then((res) => setProducts(res.data));
    }, []);
    return <>
        <Header />

        <div className="center">
            <h2 className='font-medium my-7'>All Products</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16 pt-5'>
                {products && products.map((product: IProduct) => (<ProductBox {...product} key={product._id} />))}
            </div>
        </div>;

    </>;
};

export default Products;

// export async function getServerSideProps ()
// {
//     const products = await loadProducts();
//     return {
//         props: {
//             products: JSON.parse( JSON.stringify( products ) ),
//         }
//     };
// }
