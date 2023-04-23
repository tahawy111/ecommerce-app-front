import { FC } from 'react';

interface FeaturedProps {

}

const Featured: FC<FeaturedProps> = ({ }) => {
    return <div className='bg-main text-white py-10'>
        <div className="center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex justify-center flex-col">
                    <h1 className='text-4xl mb-3'>Pro anywhere</h1>
                    <p className='text-gray-100/70 font-normal text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum culpa fuga quo vel illo odit labore tempore vitae iusto dicta ratione beatae unde dolorum facilis sunt corrupti, provident quidem. Aperiam.</p>
                </div>
                <div className="max-w-full">
                    <img src="https://dawid-next-ecommerce.s3.amazonaws.com/1679151719649.png" alt="" />
                </div>

            </div>
        </div>
    </div>;
};

export default Featured;