import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { FC, Fragment } from 'react';

// make links component to repeat it in any place

interface HeaderProps {

}

const Header: FC<HeaderProps> = ({ }) => {
    const navLink = `text-gray-100/70 px-2`;
    const popOverLink = `text-black px-2 my-3`;
    return <div className='bg-main'>

        <Popover className="center flex justify-between py-5">
            <Link className='text-white' href={'/'}>Ecommerce</Link>
            <nav className='hidden sm:flex'>
                <Link className={navLink} href={'/'}>Home</Link>
                <Link className={navLink} href={'/products'}>All products</Link>
                <Link className={navLink} href={'/categories'}>Categories</Link>
                <Link className={navLink} href={'/account'}>Account</Link>
                <Link className={navLink} href={'/cart'}>Cart (0)</Link>
            </nav>

            <Popover.Button className={`text-white sm:hidden`}>
                <span className='sr-only'>Open Menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
            </Popover.Button>

            <Popover.Overlay className={`fixed inset-0 bg-black opacity-30`} />

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-75 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-100 scale-95"
            >
                <Popover.Panel focus className={`absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden`}>
                    <div className="rounded-lg bg-white shadow-lg ring-1 ring-block ring-opacity-5 divide-y-2 divide-gray-50">
                        <div className="px-5 pt-5 pb-6">
                            <div className="flex items-center justify-between">
                                <Link className='' href={'/'}>Ecommerce</Link>
                                <Popover.Button className={`sm:hidden`}>
                                    <span className='sr-only'>Close Menu</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>

                                </Popover.Button>

                            </div>

                            <div className="mt-6">
                                <nav className='flex flex-col'>
                                    <Link className={popOverLink} href={'/'}>Home</Link>
                                    <Link className={popOverLink} href={'/products'}>All products</Link>
                                    <Link className={popOverLink} href={'/categories'}>Categories</Link>
                                    <Link className={popOverLink} href={'/account'}>Account</Link>
                                    <Link className={popOverLink} href={'/cart'}>Cart (0)</Link>
                                </nav>
                            </div>

                        </div>


                    </div>
                </Popover.Panel>
            </Transition>

        </Popover>



    </div>;
};

export default Header;