import getThis from '@/lib/getThis';
import { ImgType } from '@/models/Order';
import Image from 'next/image';
import { FC, useId, useState } from 'react';

interface ProductImagesProps {
    images: ImgType[];
}

const ProductImages: FC<ProductImagesProps> = ({ images }) => {
    const [imgIndex, setImgIndex] = useState(0);
    const DevImgsId = useId()

    return <>

        <div className={``}>
            <img className='border border-[#ddd] rounded-lg p-1 w-full object-contain h-[520px]' src={images[imgIndex].url} alt={images[imgIndex].url} />
            <div className={`flex m-3 justify-center items-center`}>

                <svg onClick={() => (getThis(document) as Document).getElementById(DevImgsId)!.scrollLeft -= 100} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-12 h-12 cursor-pointer select-none ${images.length < 3 && "pointer-events-none opacity-50"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>

                <div id={DevImgsId} className={`flex overflow-auto transition-transform duration-150 gap-x-3 scroll-smooth scrollbar-hide`}>
                    {images.map(({ url }, index) => (
                        <img key={index} className={`z-0 transition-transform duration-150 h-[80px] w-[80px] cursor-pointer object-cover border border-[#ddd] rounded-lg p-1 hover:border-[#79612d] ${index === imgIndex ? "border-black" : ""}`} onClick={() => setImgIndex(index)} src={url} alt={url} />
                    ))}
                </div>

                <svg onClick={() => (getThis(document) as Document).getElementById(DevImgsId)!.scrollLeft += 100} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-12 h-12 cursor-pointer select-none ${images.length < 3 && "pointer-events-none opacity-50"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>

            </div>
        </div>

    </>;
};

export default ProductImages;