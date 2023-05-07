import Featured from '@/components/Featured';
import Header from '@/components/Header';
import NewProducts from '@/components/NewProducts';
import { loadFeatued } from '@/lib/loadApis';
import { IProduct } from '@/models/Product';
import axios from 'axios';
import Head from 'next/head';
import { FC, useEffect, useState } from 'react';

interface HomeProps {
  featuredProduct: IProduct;
  newProducts: IProduct[];
}

const Home: FC<HomeProps> = () => {
  const [data, setData] = useState<HomeProps>();
  useEffect(() => {
    axios.get(`/api/products/getFeatured`).then((res) => setData(res.data));
  }, []);
  return <>
  <Head>
  <link rel="manifest" href="/manifest.json" />
  <title>Ecommerce</title>
  </Head>
  <div>
    <Header />
    {data && (
      <>
        <Featured product={data.featuredProduct} />
        <NewProducts products={data.newProducts} />
      </>
    )}
  </div>
  </>;
};

export default Home;
