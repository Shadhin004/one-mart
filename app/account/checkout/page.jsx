'use client'

import React, {useState} from 'react'
import { useGetCartQuery } from '@/store/api'
import { useForm } from "react-hook-form";
import { useSession } from 'next-auth/react';
import { useUpdateUserAddressMutation, useGetUserAddressQuery, useUpdateExistingUserAddressMutation, useGetPaymentMethodsQuery, usePlaceOrderMutation } from '@/store/api';
import toast from 'react-hot-toast';

const page = () => {

    const [activeAddress, setActiveAddress] = useState(null);
    const [newAddress, setNewAddress] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)

    const { register, handleSubmit, formState: { errors } } = useForm({mode : 'onBlur'});

    const {data: session} = useSession();

    const {data : cartData, cartDataLoading : isLoading} = useGetCartQuery();
    const {data: userAddressData} = useGetUserAddressQuery();
    const {data: paymentMethods} = useGetPaymentMethodsQuery();
    
    const [useUpdateExistingUserAddressMutationFn] = useUpdateExistingUserAddressMutation();
    const [useUpdateUserAddressMutationFn] = useUpdateUserAddressMutation();
    const [placeOrderFn] = usePlaceOrderMutation()


    const onSubmit = async (addressData) => {
        if(!newAddress){
            try {
                const res = await useUpdateExistingUserAddressMutationFn(activeAddress);
                if (res.data) {
                    toast.success("Address updated successfully");
                } else {
                    toast.error("Failed to update address");
                }
            } catch (error) {
                console.error("Error updating address:", error);
                toast.error("Failed to update address");
            }
        } else {
             try {
                const res = await useUpdateUserAddressMutationFn(addressData);
                if (res.data) {
                    toast.success("Address updated successfully");
                } else {
                    toast.error("Failed to update address");
                }
            } catch (error) {
                console.error("Error updating address:", error);
                toast.error("Failed to update address");
            }
        }
    }

    const placeOrder = async ()=>{
        const orderParam = {
            address : activeAddress,
            paymentMethodId : selectedPaymentMethod
        }

        try{
            const res = await placeOrderFn(orderParam)
            if (res.data) {
                toast.success("Order placed successfully");
            } else {
                toast.error("Failed to place order");
            }
        }catch (error){
            toast.error("Something went wrong" + error)
        }
    }

    // console.log(activeAddress)
    
  return (
    <div>
        <div className="checkout-area rts-section-gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 pr--40 pr_md--5 pr_sm--5 order-2 order-xl-1 order-lg-2 order-md-2 order-sm-2 mt_md--30 mt_sm--30">
                        {/* <div className="coupon-input-area-1 login-form">
                            <div className="coupon-area">
                                <div className="coupon-ask">
                                    <span>Returning customers?</span>
                                    <button className="coupon-click"> Click here to login</button>
                                </div>
                                <div className="coupon-input-area">
                                    <div className="inner">
                                        <p>If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.</p>
                                        <form action="#">
                                            <input type="email" placeholder="User Name..." />
                                            <input type="password" placeholder="Enter password..." />

                                            <button type="submit" className="btn-primary rts-btn">Log In</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div>
                            <h3 className='title'>Saved addresses</h3>
                            {
                                userAddressData && userAddressData.address && userAddressData.address.length > 0 ? userAddressData.address.map((address, index) => (
                                    <div key={index} onClick={() => setActiveAddress(address)} style={{border: activeAddress?.address_id === address.address_id ? '2px solid #629D23' : '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px', cursor: 'pointer'}}>
                                        <p>{address.street}, {address.city}, {address.state}, {address.postal_code}, {address.country}</p>
                                    </div>
                                )) : (
                                    <p>No saved addresses found.</p>
                                )
                            }
                        </div>
                        <div className="coupon-input-area-1">
                            <div className="coupon-area">
                                <div className="coupon-ask  cupon-wrapper-1">
                                    <button className="coupon-click" onClick={() => [setNewAddress(!newAddress), setActiveAddress(null)]}>{newAddress ? 'Cancel' : 'Click here to add a new address'}</button>
                                </div>
                                {/* <div className="coupon-input-area cupon1">
                                    <div className="inner">
                                        <p className="mt--0 mb--20"> If you have a coupon code, please apply it below.</p>
                                        <div className="form-area">
                                            <input type="text" placeholder="Enter Coupon Code..." />
                                            <button type="submit" className="btn-primary rts-btn">Apply Coupon</button>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="rts-billing-details-area" style={{display: newAddress ? 'block' : 'none'}}>
                            <h3 className="title">Billing Details</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="billing-form">
                                <div className="single-input">
                                    <label htmlFor="email">Email Address*</label>
                                    <input id="email" type="text" defaultValue={session?.user?.email} disabled />
                                    {errors.email && <span>This field is required</span>}
                                </div>
                                {/* <div className="half-input-wrapper"> */}
                                    <div className="single-input">
                                        <label htmlFor="f-name">Name*</label>
                                        <input id="f-name" type="text" defaultValue={session?.user?.name} disabled />
                                        {errors.name && <span>This field is required</span>}
                                    </div>
                                {/* </div> */}
                                <div className="single-input">
                                    <label htmlFor="country">Country / Region*</label>
                                    <input id="country" type="text" required {...register("country", { required: true })} />
                                    {errors.country && <span>This field is required</span>}
                                </div>
                                <div className="single-input">
                                    <label htmlFor="street">Street Address*</label>
                                    <input id="street" type="text" required {...register("street", { required: true })} />
                                    {errors.street && <span>This field is required</span>}
                                </div>
                                <div className="single-input">
                                    <label htmlFor="city">Town / City*</label>
                                    <input id="city" type="text" required {...register("city", { required: true })} />
                                    {errors.city && <span>This field is required</span>}
                                </div>
                                <div className="single-input">
                                    <label htmlFor="state">State*</label>
                                    <input id="state" type="text" required {...register("state", { required: true })} />
                                    {errors.state && <span>This field is required</span>}
                                </div>
                                <div className="single-input">
                                    <label htmlFor="zip">Zip Code*</label>
                                    <input id="zip" type="text" required {...register("postal_code", { required: true })} />
                                    {errors.postal_code && <span>This field is required</span>}
                                </div>
                                <div className="single-input">
                                    <label htmlFor="phone">Phone*</label>
                                    <input id="phone" type="text" required {...register("phone", { required: true })} />
                                    {errors.phone && <span>This field is required</span>}
                                </div>
                                {/* <div className="single-input">
                                    <label htmlFor="ordernotes">Order Notes*</label>
                                    <textarea id="ordernotes" required {...register("orderNotes", { required: true })}></textarea>
                                    {errors.orderNotes && <span>This field is required</span>}
                                </div> */}
                                {/* <button className="rts-btn btn-primary">Save Address</button> */}
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4 order-1 order-xl-2 order-lg-1 order-md-1 order-sm-1">
                        <h3 className="title-checkout">Your Order</h3>
                        <div className="right-card-sidebar-checkout">
                            <div className="top-wrapper">
                                <div className="product">
                                    Products
                                </div>
                                <div className="price">
                                    Price
                                </div>
                            </div>
                            {
                                cartData && cartData.length > 0 ? cartData.map((item) => {
                                    return(
                                        <div className="single-shop-list" key={item.cart_item_id}>
                                            <div className="left-area">
                                                <a href="#" className="thumbnail">
                                                    <img src="/assets/images/shop/04.png" alt="" />
                                                </a>
                                                <a href="#" className="title">
                                                    {item.product_name}
                                                </a>
                                            </div>
                                            <span className="price">${item.price * item.quantity}</span>
                                        </div>
                                    )
                                }) : (
                                    <div>No items in cart</div>
                                )
                            }
                            <div className="single-shop-list">
                                <div className="left-area">
                                    <span>Shipping</span>
                                </div>
                                <span className="price">Flat rate: $10.00</span>
                            </div>
                            <div className="single-shop-list">
                                <div className="left-area">
                                    <span style={{fontWeight: 600, color: '#2C3C28'}}>Total Price:</span>
                                </div>
                                <span className="price" style={{color: '#629D23'}}>${cartData?.reduce((acc, item) => acc + item.price * item.quantity, 0) + 10}.00</span>
                            </div>
                            <div className="cottom-cart-right-area">
                                <ul>
                                    {
                                        paymentMethods?.map((method, index)=>{
                                            return(
                                                <li key={index}>
                                                    <input type="radio" onClick={()=> setSelectedPaymentMethod(method.method_id)} value={method.method_id} id="f-options" name="selector" />
                                                    <label htmlFor="f-options">{method.method_name}</label>

                                                    <div className="check"></div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <p className="disc mb--25">
                                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                </p>
                                
                                <p className="mb--20">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                                <div className="single-category mb--30">
                                    <input id="cat14" type="checkbox" required />
                                    <label htmlFor="cat14"> I have read and agree terms and conditions *
                                    </label>
                                </div>
                                <button onClick={placeOrder} className="rts-btn btn-primary">Place Order</button>
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