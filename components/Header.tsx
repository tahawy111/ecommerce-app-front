import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { FC, Fragment, useContext, useEffect, useState } from 'react';
import NavLinks from './NavLinks';
import { signOut, useSession } from 'next-auth/react';
import { CartContext } from './contexts/CartContext';
import { useRouter } from 'next/router';

// make links component to repeat it in any place

interface HeaderProps {

}

const Header: FC<HeaderProps> = ({ }) => {
    const { data: session } = useSession();
    const { cartProducts } = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState<boolean>(true);
    const router = useRouter()

    useEffect(() => {
        setMobileNavActive(false)
    },[])

    return <div className='bg-main'>

        <div className="big-center flex justify-between py-5">
            <Link className='text-white' href={'/'}>Ecommerce</Link>
            <nav className={`py-14 pl-7 z-10 ${mobileNavActive ? "block" : "hidden"} fixed top-0 bottom-0 left-0 right-0 p-5 bg-main md:flex md:static md:bg-transparent md:p-0`}>
                {mobileNavActive && <div className='flex items-center justify-between'>
                    <Link className='text-white my-3 block md:hidden' href={'/'}>Ecommerce</Link>
                    <svg onClick={() => setMobileNavActive((prev) => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </div>}
                <Link className={`text-gray-100/70 px-2 block py-1 md:py-0`} href={'/'}>Home</Link>
                <Link className={`text-gray-100/70 px-2 block py-1 md:py-0`} href={'/products'}>All products</Link>
                <Link className={`text-gray-100/70 px-2 block py-1 md:py-0`} href={'/categories'}>Categories</Link>
                {session ? (
                    <Link className={`text-gray-100/70 px-2 block py-1 md:py-0`} href={'/account'}>Account</Link>
                ) : (<Link className={`text-gray-100/70 px-2 block py-1 md:py-0`} href={'/login'}>Login</Link>)}

                <Link className={`text-gray-100/70 px-2 block py-1 md:py-0`} href={'/cart'}>Cart ({cartProducts?.length})</Link>
                {session && (
                    <button className={`btn-danger mx-2`} onClick={() => signOut()} >Logout</button>
                )}
            </nav>


            <svg onClick={() => setMobileNavActive((prev) => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white md:hidden">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>

            {/* <Popover.Overlay className={`fixed inset-0 bg-black opacity-30`} /> */}


        </div>



    </div>;
};

export default Header;