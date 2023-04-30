import Header from '@/components/Header';
import ProductBox from '@/components/ProductBox';
import { mongooseConnect } from '@/lib/mongoose';
import Product, { IProduct } from '@/models/Product';
import { FC } from 'react';

interface productsProps {
    products: IProduct[];
}

const products: FC<productsProps> = ({ products }) => {
    return <>
        <Header />

        <div className="center">
        <h2 className='font-medium my-7'>All Products</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16 pt-5'>
            {products.map((product: IProduct) => (<ProductBox {...product} key={product._id} />))}
        </div>
    </div>;

    </>;
};

export default products;

export async function getServerSideProps() {
    await mongooseConnect();
    // Products
    const products = await Product.find({}, null, { sort: { '_id': -1 } });
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        }
    };
}