import Featured from '@/components/Featured';
import Header from '@/components/Header';
import { FC } from 'react';

interface HomeProps {

}

const Home: FC<HomeProps> = ({ }) => {
  return <div>
    <Header />
    <Featured />
  </div>;
};

export default Home;