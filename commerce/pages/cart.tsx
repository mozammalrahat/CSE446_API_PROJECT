import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import NextLink from "next/link";
import dynamic, { LoaderComponent } from "next/dynamic";
import Image from "next/image";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import Review from "../components/Review";
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
  const [isCheckout, setIsCheckout] = useState(false);
  const [order, setOrder] = useState(null);


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
  


  useEffect(() => {
    const getCartItems = async () => {
      const { data } = await axios.get("http://localhost:3000/api/cart",
      { headers: { Authorization: cookie.get("token") } });
      setCartItems(prevCartItems =>data.userCart);
      }
    getCartItems();

  }, [update,isCheckout]);

  const checkoutHandler = async() => {

    console.log("This is from checkoutHandler")
    await axios.post("http://localhost:3000/api/order",{}, {
      headers: { Authorization: cookie.get("token") },
    }
    )
    .then(res => {
      console.log("The order is :", res.data.order)
      setOrder(res.data.order);
      // setIsCheckout(true);

    })
    .catch(err => {
      console.log(err)
    })
    // router.push('/');
  };

  return (
    <Layout title="Shopping Cart">
      
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {(cartItems!==null && cartItems.products.length === 0) ? (
        console.log("cart items : ", cartItems),
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
                </ListItem>
                <ListItem>
                  <Button disabled = {isCheckout} variant="contained" color="primary" fullWidth onClick={()=>setIsCheckout(true)}>
                    Check Out
                  </Button>
                </ListItem>
                { isCheckout && <ListItem>
                  <Button disabled={order!==null} variant="contained" color="primary" fullWidth onClick={()=>checkoutHandler()}>
                    Confirm Order
                  </Button>
                </ListItem>
                  } 
              </List>
            </Card>
          </Grid>
        </Grid>
       ) 
       } 

      

       {order && <Review order = {order}/>}
    </Layout>
  );
};

export default Cart;