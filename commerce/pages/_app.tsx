import React, { useEffect } from "react";
import { destroyCookie, parseCookies } from "nookies";
import App from "next/app";
import Router from "next/router";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import axios from "axios";
import { redirectUser } from "../utils/authUser";

import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import Navbar from "../components/navbar";
const clientSideEmotionCache = createEmotionCache();

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    let pageProps = {};
    const protectedRoutes =
      ctx.pathname === "/" ||
      ctx.pathname === "/cart" ||
      ctx.pathname === "/address";
    if (!token) {
      protectedRoutes && redirectUser(ctx, "/login");
    } else {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      try {
        const res = await axios.get("http://localhost:3000/api/auth", {
          headers: {
            Authorization: token,
          },
        });
        const { user } = res.data;
        pageProps = {
          ...pageProps,
          user,
        };
      } catch (err) {
        destroyCookie(ctx, "token");
        ctx.res?.writeHead(302, { Location: "/login" });
      }
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </>
    );
  }
}
export default MyApp;
