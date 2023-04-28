import Link from 'next/link';
import { FC, useContext } from 'react';
import { CartContext } from './contexts/CartContext';
import { signOut, useSession } from 'next-auth/react';

interface NavLinksProps {
    popOver?: boolean;
}

const NavLinks: FC<NavLinksProps> = ({ popOver }):any => {
    const { data: session, status } = useSession();
    const navLink = `text-gray-100/70 px-2`;
    const popOverLink = `text-black px-2 my-3`;
    const { cartProducts } = useContext(CartContext);
    return <nav className={`${popOver ? 'flex flex-col' : "flex"}`}>
        <Link className={popOver ? popOverLink : navLink} href={'/'}>Home</Link>
        <Link className={popOver ? popOverLink : navLink} href={'/products'}>All products</Link>
        <Link className={popOver ? popOverLink : navLink} href={'/categories'}>Categories</Link>
        {session ? (
            <Link className={popOver ? popOverLink : navLink} href={'/account'}>Account</Link>
        ) : (<Link className={popOver ? popOverLink : navLink} href={'/login'}>Login</Link>)}
        
        <Link className={popOver ? popOverLink : navLink} href={'/cart'}>Cart ({cartProducts?.length})</Link>
       {session && (
         <button className={`btn-danger mx-2`} onClick={() => signOut()} >Logout</button>
       )}
    </nav>;
};

export default NavLinks;