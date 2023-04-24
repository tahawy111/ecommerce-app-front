import Link from 'next/link';
import { FC, useContext } from 'react';
import { CartContext } from './contexts/CartContext';

interface NavLinksProps {
    popOver?: boolean;
}

const NavLinks: FC<NavLinksProps> = ({ popOver }) => {
    const navLink = `text-gray-100/70 px-2`;
    const popOverLink = `text-black px-2 my-3`;
    const { cartProducts } = useContext(CartContext);
    return <nav className={`${popOver ? 'flex flex-col' : "flex"}`}>
        <Link className={popOver ? popOverLink : navLink} href={'/'}>Home</Link>
        <Link className={popOver ? popOverLink : navLink} href={'/products'}>All products</Link>
        <Link className={popOver ? popOverLink : navLink} href={'/categories'}>Categories</Link>
        <Link className={popOver ? popOverLink : navLink} href={'/account'}>Account</Link>
        <Link className={popOver ? popOverLink : navLink} href={'/cart'}>Cart ({cartProducts?.length})</Link>
    </nav>;
};

export default NavLinks;