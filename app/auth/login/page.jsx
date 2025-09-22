'use client'

import React from 'react'
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

     const onSubmit = async (data) => {
        const res = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (res.error) {
            console.log("Login failed");
        } else {
            console.log("Login successful");
        }
    }

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
                            <h3 className="title">Login Into Your Account</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
                                <div className="input-wrapper">
                                    <label htmlFor="email">Email*</label>
                                    <input type="email" {...register("email", { required: true })} id="email"/>
                                    {errors.email && <span>This field is required</span>}
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="password">Password*</label>
                                    <input type="password" {...register("password", { required: true })} id="password"/>
                                    {errors.password && <span>This field is required</span>}
                                </div>
                                <button type='submit' className="rts-btn btn-primary">Login Account</button>
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

export default Login