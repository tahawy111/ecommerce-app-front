import { IProduct } from '@/models/Product';
import { FC } from 'react';
import ProductBox from './ProductBox';

interface NewProductsProps {
    products: IProduct[];
}

const NewProducts: FC<NewProductsProps> = ({ products }) => {
    return <div className="big-center">
        <h2 className='font-medium my-7'>New Arrivals</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16 pt-5'>
            {products.map((product: IProduct) => (<ProductBox {...product} key={product._id} />))}
        </div>
    </div>;
};

export default NewProducts;