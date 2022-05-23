import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import NextLink from "next/link";
import dynamic, { LoaderComponent } from "next/dynamic";
import Image from "next/image";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";


const Cart: React.ReactNode = () => {
  const router = useRouter()
  const [cartItems, setCartItems] = useState(null);
  const [update, setUpdate] = useState(false);
  const updateCartHandler = async (item, quantity) => {
    // var { data } = await axios.get(`http://localhost:3000/api/products/${item._id}`,
    // {
    //   headers: { Authorization: cookie.get("token") },
    // }
    // );
    // console.log(data)
    // if (data.amount < quantity) {
    //   window.alert('Sorry. Product is out of stock');
    //   return;
    // }
    if(quantity==1){
      await axios.put(`http://localhost:3000/api/cart/add/${item.productId._id}/1`,{},
      {
        headers: { Authorization: cookie.get("token") },
      }
      );
      setUpdate(!update);
    }
    else if(quantity==-1){
      
    await axios.put(`http://localhost:3000/api/cart/remove/${item.productId._id}/1`,{},
    {
      headers: {Authorization: cookie.get("token")},

    })
    setUpdate(!update);
    }
}
  
  const removeItemHandler = (item: IProduct) => {
    dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: item });
  };



  useEffect(() => {
    const getCartItems = async () => {
      const { data } = await axios.get("http://localhost:3000/api/cart",
      { headers: { Authorization: cookie.get("token") } });
      setCartItems(prevCartItems =>data.userCart);
      }
    getCartItems();

  }, [update]);

  const checkoutHandler = () => {
    router.push('/shipping');
  };

  return (
    <Layout title="Shopping Cart">
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {(cartItems!==null && cartItems.products.length === 0) ? (
        <div>
          Cart is empty.{' '}
          <NextLink href="/" passHref>
            <Link>Go shopping</Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems!==null && cartItems.products.map((item) => (
                    console.log(item),
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink
                        href="/"
                        //  href={`/product/${item.slug}`} 
                         passHref>
                          <Link>
                            <Image
                              src={item.productId.image}
                              alt={item.productId.name}
                              width={50}
                              height={50}
                            ></Image>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink
                        // href="/"
                        href={`/product/${item.productId._id}`}
                        passHref>
                          <Link>
                            <Typography>{item.productId.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">
                        <Typography>
                        <Button size="large" variant="text"
                        onClick={()=>updateCartHandler(item, -1)}
                        >
                          -
                        </Button>
                          {item.quantity}
                        <Button
                        onClick={()=>updateCartHandler(item, 1)}
                        >
                          +
                        </Button>
                        </Typography>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color="secondary"
                        //  onClick={() => removeItemHandler(item)}
                         >
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  {/* <Typography variant="h2">
                    Subtotal (
                    {(cartItems as Array<IProduct>).reduce(
                      (a, c) => a + c.quantity,
                      0
                    )}{" "}
                    items) : $
                    {(cartItems as Array<IProduct>).reduce(
                      (a, c) => a + c.quantity * c.price,
                      0
                    )}
                  </Typography> */}
                </ListItem>
                <ListItem>
                  <Button variant="contained" color="primary" fullWidth onClick={checkoutHandler}>
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
       ) 
       } 
    </Layout>
  );
};

export default Cart;