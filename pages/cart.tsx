import Header from '@/components/Header';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import { CartContext } from '@/components/contexts/CartContext';
import { InputChange } from '@/lib/type';
import Product, { IProduct } from '@/models/Product';
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useReducer, useState } from 'react';
import { toast } from 'react-hot-toast';

interface CartPageProps {

}

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true };
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true };
        case 'PAY_FAIL':
            return { ...state, loadingPay: false };
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false };

        case 'DELIVER_REQUEST':
            return { ...state, loadingDeliver: true };
        case 'DELIVER_SUCCESS':
            return { ...state, loadingDeliver: false, successDeliver: true };
        case 'DELIVER_FAIL':
            return { ...state, loadingDeliver: false };
        case 'DELIVER_RESET':
            return {
                ...state,
                loadingDeliver: false,
                successDeliver: false,
            };
        default:
            return state;
    }
}

const CartPage: FC<CartPageProps> = ({ }): any => {
    const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
    const [isCreateOrder, setIsCreateOrder] = useState<boolean>(false);
    const [addressData, setAddressData] = useState({
        city: "", country: "", email: "", name: "", postalCode: "", streetAddress: ""
    });
    const handleAddress = ({ target }: InputChange) => {
        setAddressData({ ...addressData, [target.name]: target.value });
    };

    const [products, setProducts] = useState<IProduct[]>();
    useEffect(() => {
        if (isCreateOrder) {
            createOrder();
        }
    }, [isCreateOrder]);
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts }).then((res) => setProducts(res.data));
        }
    }, [cartProducts]);

    let total = 0;
    for (const productId of cartProducts) {
        const price = products?.find((p: IProduct) => p._id === productId)?.price || 0;
        total += price;
    }

    const { data: session, status } = useSession();
    const router = useRouter();

    if (session === undefined && status === "loading") {
        return <div className="flex w-full h-screen justify-center items-center">
            <Spinner loading />
        </div>;
    }
    if (!session) {
        router.push('/login');
        return;
    };


    // async function getOrderDetails() {
    //     const totalQuantity = cartProducts?.length;
    //     console.log({ totalQuantity });
    //     const uniqueIds = [...new Set(cartProducts)];
    //     const productInfos = (await axios.post('/api/cart', { ids: uniqueIds })).data;
    //     let orderItems = [];

    //     for (const productId of uniqueIds) {
    //         const productInfo = productInfos.find((p: IProduct) => p._id.toString() === productId);
    //         const quantity = cartProducts.filter((id: string) => id === productId)?.length || 0;
    //         if (quantity > 0 && productInfo) {
    //             orderItems.push({
    //                 quantity,
    //                 product_data: productInfo,
    //                 price_data: {
    //                     currency: process.env.CURRENCY,
    //                     totalAmount: quantity * productInfo.price
    //                 }

    //             });
    //         }
    //     }
    //     console.log({
    //         ...addressData,
    //         totalQuantity,
    //         totalPrice: total,
    //         items: orderItems, 
    //     });

    // }

    // getOrderDetails();

    if (router.query?.success && router.query?.success === "1") {
        return (<div>
            <Header />
            <div className="bg-white rounded-lg p-7 m-7">
                <h1 className='my-3'>Thanks for your order</h1>
                <h4>We will email you when your order will be sent.</h4>
            </div>
        </div>);
    }


    const isPaypalDisabled = addressData.name === '' ||
        addressData.email === '' ||
        addressData.city === '' ||
        addressData.country === '' ||
        addressData.postalCode === '' ||
        addressData.streetAddress === '';

    async function createOrder() {
        const totalQuantity = cartProducts?.length;
        const uniqueIds = [...new Set(cartProducts)];
        const { data: productInfos } = await axios.post('/api/cart', { ids: uniqueIds });
        let orderItems = [];

        for (const productId of uniqueIds) {
            const productInfo = productInfos.find((p: IProduct) => p._id.toString() === productId);
            const quantity = cartProducts.filter((id: string) => id === productId)?.length || 0;
            if (quantity > 0 && productInfo) {
                orderItems.push({
                    quantity,
                    product_data: productInfo,
                    price_data: {
                        currency: process.env.CURRENCY,
                        totalAmount: quantity * productInfo.price
                    }

                });
            }
        }

        const res = await axios.post('/api/checkout', {
            totalQuantity,
            totalPrice: total,
            items: orderItems,
            name: addressData.name,
            email: addressData.email,
            city: addressData.city,
            country: addressData.country,
            postalCode: addressData.postalCode,
            streetAddress: addressData.streetAddress,
        });

        if (res.data.success) {
            router.push(`/cart?success=1`);
            toast.success(`Transaction completed by ${session?.user?.name}`);

        }

        clearCart();
    }



    return <>
        <Header />
        <div className="center grid gap-10 grid-cols-1 md:grid-cols-[1.3fr_.7fr] mt-7">
            <div className="bg-white rounded-lg p-7">
                <h2 className='my-3'>Cart</h2>
                {cartProducts.length < 1 && (<div>Your Cart Is Empty</div>)}
                {cartProducts.length > 0 && (
                    <>
                        <table className='basic'>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((product: IProduct) => (
                                    <tr key={product._id}>
                                        <td className='py-3'>
                                            <div className="w-[100px] h-[100px] p-2 shadow-md border rounded-lg flex items-center justify-center">
                                                <img className='max-h-20 max-w-20' src={product.images[0].url} alt="" />
                                            </div>
                                            {product.title}
                                        </td>
                                        <td className=''>
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => removeProduct(product._id)} className='btn-primary-outline p-1 select-none'>-</button>
                                                <span>{cartProducts.filter((id) => id === product._id).length}</span>
                                                <button disabled={product.inStock <= cartProducts.filter((id) => id === product._id).length} onClick={() => addProduct(product._id)} className='btn-primary-outline p-1 select-none'>+</button>
                                            </div>
                                        </td>
                                        <td>${cartProducts.filter((id) => id === product._id).length * product.price}</td>
                                    </tr>
                                ))}

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>${total}</td>
                                </tr>

                            </tbody>
                        </table>
                    </>)}
            </div>


            {cartProducts.length > 0 &&
                (<div className="bg-white rounded-lg p-7">
                    <h2>Order Information</h2>
                    <Input name='name' onChange={handleAddress} placeholder='Name' />
                    <Input name='email' onChange={handleAddress} placeholder='Email' />
                    <div className="flex gap-1">
                        <Input name='city' onChange={handleAddress} placeholder='City' />
                        <Input name='postalCode' onChange={handleAddress} placeholder='Postal Code' />
                    </div>
                    <Input name='streetAddress' onChange={handleAddress} placeholder='Street Address' />
                    <Input name='country' onChange={handleAddress} placeholder='Country' />



                    <label className={`text-gray-500 font-light my-3 ${!isPaypalDisabled && "hidden"}`}>Please fill in address data to do payment with paypal.</label>


                    <PayPalScriptProvider options={{ "client-id": `${process.env.PAYPAL_CLIENT_ID}`, "currency": `${process.env.CURRENCY}` }}>
                        {total && (
                            <PayPalButtons
                                createOrder={async (data, actions): Promise<any> => {
                                    const orderId = await actions.order
                                        .create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: `${total}`,
                                                    },
                                                },
                                            ],
                                        });

                                    return orderId;
                                }}
                                onApprove={(data: any, actions: any) => {
                                    return actions.order.capture().then(async (details: any) => {
                                        const name = details.payer.name.given_name;

                                        setIsCreateOrder(true);

                                    });
                                }}
                                onError={(error: any) => toast.error(`Transaction failed. Please try again in 1 minute`)}
                                disabled={isPaypalDisabled}
                            />
                        )}
                    </PayPalScriptProvider>


                </div>)}
        </div>
        <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}&currency=${process.env.CURRENCY}`}></script>
    </>;
};

export default CartPage;