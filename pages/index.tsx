import Featured from '@/components/Featured';
import Header from '@/components/Header';
import NewProducts from '@/components/NewProducts';
import { mongooseConnect } from '@/lib/mongoose';
import Product, { IProduct } from '@/models/Product';
import { FC } from 'react';

interface HomeProps {
  featuredProduct: IProduct;
  newProducts: IProduct[];
}

const Home: FC<HomeProps> = ({ featuredProduct, newProducts }) => {
  return <div>
    <Header />
    <Featured product={featuredProduct} />
    <NewProducts products={newProducts} />
  </div>;
};

export default Home;

export async function getServerSideProps() {
  const featuredProductId = `64452f40086182b2c4b4b2a2`;
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);

  // New Products
  // const newProducts = await Product.find({}, null, { sort: { '_id': -1 } });
  const newProducts = await Product.find().sort({ "_id": -1 }).limit(10);
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))
    }
  };
}