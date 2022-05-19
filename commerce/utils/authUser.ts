import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";



export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

const setToken = (token) => {
  cookie.set("token", token);
  Router.push("/");
};

export const logoutUser = (email) => {
  cookie.set("userEmail", email);
  cookie.remove("token");
  Router.push("/");
};
