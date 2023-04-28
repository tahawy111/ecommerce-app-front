import Spinner from '@/components/Spinner';
import { getError } from '@/lib/getError';
import axios from 'axios';
import { signIn,signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { toast } from 'react-hot-toast';

interface LoginProps {

}

const Login: any = ({ }) => {
    const { data: session, status } = useSession();
    console.log(process.env.NEXTAUTH_URL);
    const loginForm = <div>
    <div className={`bg-bgGray w-screen h-screen flex items-center`}>
        <div className='text-center w-full'>
            <button onClick={() => signIn("google")} className='bg-gray-100 p-2 rounded-lg px-4 cursor-pointer hover:bg-gray-200 active:bg-gray-500 transition-colors duration-75'>Login with google</button>
        </div>
    </div>
</div>

    const router = useRouter();
    const handleLogin = async () => {
        try {
            const res = await axios.post('/api/auth/login', { ...session?.user, type: "login" });
            router.push('/');
            console.log(res);
            
        } catch (error) {
            console.log(error);
            
            signOut()
            router.push(`/login?msg=${getError(error)}`)
        }
    };

    if (session === undefined && status === "loading") {
        return <div className="flex w-full h-screen justify-center items-center">
            <Spinner loading />
        </div>;
    }

    if(router.query.msg){
        toast.error(`${router.query.msg}`)
    }

    if (session) {
        handleLogin();
        return;
    }


    return loginForm;
};

export default Login;