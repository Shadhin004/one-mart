'use client'

import React from 'react'
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
    //   router.push("/api/auth/signin");
        console.log("Signup successful");
    } else {
      console.log("Signup failed");
    }
  };

  return (
    <div>
        <div className="rts-register-area rts-section-gap bg_light-1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="registration-wrapper-1">
                            <div className="logo-area mb--0">
                                <img className="mb--10" src="/assets/images/logo/fav.png" alt="logo"/>
                            </div>
                            <h3 className="title">Register Into Your Account</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
                                <div className="input-wrapper">
                                    <label htmlFor="first_name">First Name</label>
                                    <input type="text" name='first_name' id="first_name" {...register("first_name", { required: true })}/>
                                    {errors.first_name && <span>This field is required</span>}
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input type="text" name='last_name' id="last_name" {...register("last_name", { required: true })}/>
                                    {errors.last_name && <span>This field is required</span>}
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="email">Email*</label>
                                    <input type="email" name='email' id="email" {...register("email", { required: true })}/>
                                    {errors.email && <span>This field is required</span>}
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="phone">Phone*</label>
                                    <input type="tel" name='phone' id="phone" {...register("phone", { required: true })}/>
                                    {errors.phone && <span>This field is required</span>}
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="password">Password*</label>
                                    <input type="password" name='password' id="password" {...register("password", { required: true })}/>
                                    {errors.password && <span>This field is required</span>}
                                </div>
                                <button type='submit' className="rts-btn btn-primary">Register Account</button>
                                <div className="another-way-to-registration">
                                    <div className="registradion-top-text">
                                        <span>Or Register With</span>
                                    </div>
                                    <div className="login-with-brand">
                                        <a href="#" className="single">
                                            <img src="/assets/images/form/google.svg" alt="login"/>
                                        </a>
                                        <a href="#" className="single">
                                            <img src="/assets/images/form/facebook.svg" alt="login"/>
                                        </a>
                                    </div>
                                    <p>Already Have Account? <a href="#">Login</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register