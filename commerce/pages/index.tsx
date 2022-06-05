import React, { useContext, useEffect } from "react";
import { InferGetServerSidePropsType } from "next";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import NextLink from "next/link";
import Layout from "../components/Layout";
import axios from 'axios';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';


const Home = ({products}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  
  // const addToCartHandler = async (product: IProduct) => {
  //   const existItem = state.cart.cartItems.find((x) => x._id === product._id);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  //   const { data } = await axios.get(`/api/products/${product._id}`);
  //   if (data.countInStock < quantity) {
  //     window.alert('Sorry. Product is out of stock');
  //     return;
  //   }
  //   dispatch({ type: actionTypes.CART_ADD_ITEM, payload: { ...product, quantity } });
  //   router.push('/cart');
  // };

  useEffect(() => {
    let user;
    const getUserDetails = async () => {

    const res = await axios.get('http://localhost:3000/api/auth', {
          headers: {
            Authorization: cookie.get('token')
          }
        });

      user = res.data.user;
      console.log(user);
      if(!user.isShipping){
        router.push('/address');
      }
    }
    getUserDetails();

  }, []);

  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <NextLink
               href={`/product/${product._id}`} passHref>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Typography>${product.price}</Typography>
                    <Button size="small"
                    color="primary"
                    // onClick={() => addToCartHandler(product as IProduct)}
                    >
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </NextLink>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
};


export default Home

export async function getServerSideProps() {
  const response = await axios.get('http://localhost:3000/api/products');
  // const { data: products } = await commerce.products.list();

  return {
    props: {
      products:response.data,
    },
  };
}


