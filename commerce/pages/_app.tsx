import React, { useEffect } from 'react';
import { destroyCookie, parseCookies } from "nookies";
import App from "next/app";
import Router from 'next/router';
import "../styles/globals.css";
import type { AppProps } from "next/app";
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import axios from 'axios';
import {redirectUser} from '../utils/authUser';
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App{
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    let pageProps = {};
    console.log(token);
    const protectedRoutes = ctx.pathname === "/" || ctx.pathname === "/cart" || ctx.pathname === "/address";
    if(!token){
     protectedRoutes && redirectUser(ctx, '/login');
    }
    else{
      if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx);
      }

      try{
        console.log("Before calling exios");
        console.log(token);
        const res = await axios.get('http://localhost:3000/api/auth', {
          headers: {
            Authorization: token
          }
        });
        console.log("After calling exios");

        console.log(res.data);

       const {user} = res.data;
        // if(ctx.pathname !== "/address" && !user.isShipping ){
        //   console.log("Redirecting to shipping");
        //   ctx.res?.writeHead(302, { Location: '/address' });
        //   console.log("Redirected");
        // }
       pageProps = {
         ...pageProps,
         user
       }
      }
      catch(err){
        destroyCookie(ctx, 'token');
        ctx.res?.writeHead(302, { Location: '/login' });
      }
    }
  
  return {pageProps};
  }


 render(){
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
      </>
    );
 }
}
export default MyApp;