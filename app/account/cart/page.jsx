'use client'

import React, {useEffect, useState} from 'react'
import { useGetCartQuery, useRemoveFromCartMutation } from '@/store/api'
import toast from 'react-hot-toast';

const page = () => {
    const {data : cartData, isLoading, refetch} = useGetCartQuery();
    const [removeFromCart, {isLoading: isRemoving}] = useRemoveFromCartMutation();
    const [total, setTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);

    useEffect(()=>{
        if(cartData){
            setTotal(cartData.reduce((acc, item) => acc + item.price * item.quantity, 0));
        }
    }, [cartData])

    const handleRemoveFromCart = async (cart_item_id) => {
        try {
            const res = await removeFromCart(cart_item_id);
            if (res.data) {
                toast.success("Item removed from cart");
                refetch();
            } else {
                toast.error("Failed to remove from cart");
            }
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div className="rts-cart-area rts-section-gap bg_light-1">
        <div className="container">
            <div className="row g-5">
                <div className="col-xl-9 col-lg-12 col-md-12 col-12 order-2 order-xl-1 order-lg-2 order-md-2 order-sm-2">
                    <div className="cart-area-main-wrapper">
                        <div className="cart-top-area-note">
                            <p>Add <span>$59.69</span> to cart and get free shipping</p>
                            <div className="bottom-content-deals mt--10">
                                <div className="single-progress-area-incard">
                                    <div className="progress">
                                        <div className="progress-bar wow fadeInLeft" role="progressbar" style={{width: "80%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rts-cart-list-area">
                        <div className="single-cart-area-list head">
                            <div className="product-main">
                                <p>Products</p>
                            </div>
                            <div className="price">
                                <p>Price</p>
                            </div>
                            <div className="quantity">
                                <p>Quantity</p>
                            </div>
                            <div className="subtotal">
                                <p>SubTotal</p>
                            </div>
                        </div>
                        {
                            cartData && cartData.length !==0 ? cartData.map((item)=>{
                                return(
                                    <div className="single-cart-area-list main  item-parent" key={item.cart_item_id}>
                                        <div className="product-main-cart">
                                            <div onClick={() => handleRemoveFromCart(item.cart_item_id)} className="close section-activation">
                                                <i className={`fa-regular fa-${isRemoving ? 'spinner' : 'x'}`}></i>
                                            </div>
                                            <div className="thumbnail">
                                                <img src="/assets/images/shop/04.png" alt="shop"/>
                                            </div>
                                            <div className="information">
                                                <h6 className="title">{item.product_name}</h6>
                                                <span>SKU:BG-1001</span>
                                            </div>
                                        </div>
                                        <div className="price">
                                            <p>${item.price}</p>
                                        </div>
                                        <div className="quantity">
                                            <span>{item.quantity}</span>
                                        </div>
                                        <div className="subtotal">
                                            <p>${item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                )
                            }) : <center>Your cart is empty</center>
                        }
                        <div className="bottom-cupon-code-cart-area">
                            <form action="#">
                                <input type="text" placeholder="Cupon Code"/>
                                <button className="rts-btn btn-primary">Apply Coupon</button>
                            </form>
                            <a href="#" className="rts-btn btn-primary mr--50">Clear All</a>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-12 col-md-12 col-12 order-1 order-xl-2 order-lg-1 order-md-1 order-sm-1">
                    <div className="cart-total-area-start-right">
                        <h5 className="title">Cart Totals</h5>
                        <div className="subtotal">
                            <span>Subtotal</span>
                            <h6 className="price" id='subtotal'>${ cartData?.reduce((acc, item) => acc + item.price * item.quantity, 0) }</h6>
                        </div>
                        <div className="shipping">
                            <span>Shipping</span>
                            <ul>
                                {/* <li>
                                    <input type="radio" onClick={() => setShippingCost(0)} id="f-option" name="selector"/>
                                    <label htmlFor="f-option">Free Shipping</label>

                                    <div className="check"></div>
                                </li> */}

                                <li>
                                    <input type="radio" onClick={() => setShippingCost(10)} id="s-option" name="selector"/>
                                    <label htmlFor="s-option">Flat Rate</label>

                                    <div className="check">
                                        <div className="inside"></div>
                                    </div>
                                </li>

                                <li>
                                    <input type="radio" onClick={() => setShippingCost(5)} id="t-option" name="selector"/>
                                    <label htmlFor="t-option">Local Pickup</label>

                                    <div className="check">
                                        <div className="inside"></div>
                                    </div>
                                </li>

                                <li>
                                    <p>Shipping options will be updated
                                        during checkout</p>
                                    <p className="bold">Shipping Cost : ${shippingCost}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="bottom">
                            <div className="wrapper">
                                <span>Subtotal</span>
                                <h6 className="price">${total + shippingCost}</h6>
                            </div>
                            <div className="button-area">
                                <button className="rts-btn btn-primary">Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page