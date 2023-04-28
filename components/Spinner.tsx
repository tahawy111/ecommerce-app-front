import { FC, useContext } from 'react';
import { BounceLoader } from 'react-spinners';
import { GlobalContext } from './contexts/GlobalContext';

interface SpinnerProps {
    loading?: boolean;
}

const Spinner: FC<SpinnerProps> = ({ loading }) => {
    const { isLoading } = useContext(GlobalContext);
    const myLoad = loading ? loading : isLoading;
    return <div
        className={`${myLoad ? "flex" : "hidden"
            } fixed w-full h-screen text-center justify-center items-center text-white top-0 left-0 z-[1]`}
        style={{ background: "#0007" }}
    >
        <BounceLoader color='#1e3a8a' speedMultiplier={2} />
    </div>;
};

export default Spinner;