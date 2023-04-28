import Header from '@/components/Header';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import { CartContext } from '@/components/contexts/CartContext';
import { IProduct } from '@/models/Product';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface CartPageProps {

}

const CartPage: FC<CartPageProps> = ({ }): any => {
    const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
    const [products, setProducts] = useState<IProduct[]>();
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

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    function createOrder(data:any, actions:any) {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: { value: total },
              },
            ],
          })
          .then((orderID: any) => {
            return orderID;
          });
    }

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
          try {
            dispatch(payWithPaypalRequest());
            const { data } = await axiosIntance.put(
              `/orders/${order._id}/pay`,
              details
            );
    
            dispatch(payWithPaypalSuccess(data));
            dispatch(getOrderById(order._id)).then(() => {
              toast.success("Order is paid");
            });
          } catch (error) {
            dispatch(payWithPaypalFailure(error));
            toast.error(error.response.data.error);
          }
        });
      }
      function onError(err:any) {
        toast.error(err);
      }
    

    return <div>
        <Header />
        <div className="center grid gap-10 grid-cols-[1.3fr_.7fr] mt-7">
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
                                                <button onClick={() => addProduct(product._id)} className='btn-primary-outline p-1 select-none'>+</button>
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
                    <Input placeholder='Name' />
                    <Input placeholder='Email' />
                    <div className="flex gap-1">
                        <Input placeholder='City' />
                        <Input placeholder='Postal Code' />
                    </div>
                    <Input placeholder='Street Address' />
                    <Input placeholder='Country' />
                    <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}>

                    </PayPalButtons>
                </div>)}
        </div>
    </div>;
};

export default CartPage;