// import {
//   AppBar,
//   Badge,
//   Container,
//   createTheme,
//   Link,
//   ThemeProvider,
//   Toolbar,
//   Typography,
//   Button,
//   Menu,
//   MenuItem,
// } from "@material-ui/core";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import NextLink from "next/link";
// import React, { useContext } from "react";
// import useStyles from "../utils/styles";
// import cookie from "js-cookie";
// interface Props {
//   title?: string;
//   description?: string;
// }

// /**Layout represents a page wrapper to wrap pages
//  * It wraps it's children with the relevant header and footer and it also allows setting relevant meta tags using next head
//  *
//  */
// const Layout: React.FC<Props> = ({ title, description, children }) => {
//   const router = useRouter();

//   const logout = () => {
//     cookie.remove("token");
//     router.push("/login");
//   };
//   const theme = createTheme({
//     typography: {
//       h1: {
//         fontSize: "1.6rem",
//         fontWeight: 400,
//         margin: "1rem 0",
//       },
//       h2: {
//         fontSize: "1.4rem",
//         fontWeight: 400,
//         margin: "1rem 0",
//       },
//     },
//     palette: {
//       // type: darkMode ? "dark" : "light",
//       primary: {
//         main: "#f0c000",
//       },
//       secondary: {
//         main: "#208080",
//       },
//     },
//   });

//   const classes = useStyles();

//   return (
//     <div>
//       <Head>
//         <title>{title ? `${title} - API Project` : "API Project"}</title>
//         {description && <meta name="description" content={description}></meta>}
//       </Head>
//       <ThemeProvider theme={theme}>
//         <div className={classes.parent}>
//           <AppBar position="static" className={classes.navbar}>
//             <Toolbar>
//         <MenuItem />
//               <NextLink href="/" passHref>
//                 <Link>
//                   <Typography className={classes.brand}>API PROJECT</Typography>
//                 </Link>
//               </NextLink>
//               <div className={classes.grow}></div>
//               <div>
//                 <NextLink href="/cart" passHref>
//                   <Link>
//                     {
//                       // cart.cartItems.length > 0 ? (
//                       <Badge
//                       // color="secondary"
//                       // badgeContent={cart.cartItems.length}
//                       >
//                         Cart
//                       </Badge>
//                       // ) : (
//                       //   "Cart"
//                       // )
//                     }
//                   </Link>
//                 </NextLink>
//                 {/* {userInfo ? (
//                   <>
//                     <Button
//                       aria-controls="simple-menu"
//                       aria-haspopup="true"
//                       onClick={loginClickHandler}
//                       className={classes.navbarButton}
//                     >
//                       {(userInfo as IAuthUser).name}
//                     </Button>
//                     <Menu
//                       id="simple-menu"
//                       anchorEl={anchorEl}
//                       keepMounted
//                       open={Boolean(anchorEl)}
//                       onClose={loginMenuCloseHandler}
//                     >
//                       <MenuItem
//                         onClick={(e) => loginMenuCloseHandler(e, "/profile")}
//                       >
//                         Profile
//                       </MenuItem>
//                       <MenuItem
//                         onClick={(e) =>
//                           loginMenuCloseHandler(e, "/order-history")
//                         }
//                       >
//                         Order History
//                       </MenuItem>
//                       <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
//                     </Menu>
//                   </> */}
//                 {/* ) : ( */}
//                 <Button onClick={() => logout()}>
//                   <Link>Logout</Link>
//                 </Button>
//                 {/* )} */}
//               </div>
//             </Toolbar>
//           </AppBar>
//           <Container className={classes.main}>{children!}</Container>
//           <footer className={classes.footer}>
//             <Typography>
//               This is a simple API project for course CSE446
//             </Typography>
//           </footer>
//         </div>
//       </ThemeProvider>
//     </div>
//   );
// };

// export default Layout;
