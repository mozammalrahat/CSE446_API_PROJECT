import  React,{useState, useEffect,useRef} from 'react';
import Router from 'next/router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Alert } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import cookie from 'js-cookie';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  interface IUser {
    house: string;
    street: string;
    city: string;
    zip: string;
    phone: string;
    account: string;
    bank_secret: string;
  }
  const [shipping, setShipping]  = useState<IUser>({
    house: '',
    street: '',
    city: '',
    zip:'',
    phone:'',
    account:'',
    bank_secret:''
  });

  const [error,setError] = useState<string|null>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setShipping((prevState: IUser) => ({
      ...prevState,
      [name]: value
    })
    )
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await axios.post('http://localhost:3000/api/shipping', {
      shipping
    },{
      headers: {
        Authorization: cookie.get('token')
      }
    })
    .then(res => {
      Router.push('/');
    })
    .catch(err=>{
      setError(prev=>err.response.data.msg);
  } 
    )};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ width: 100, height: 100, bgcolor: "secondary.main" }}>
           <LocalShippingIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Bank Information And Shipping Address 
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="house"
                  required
                  fullWidth
                  id="house"
                  label="House No."
                  autoFocus
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="Street Address"
                  name="street"
                  autoComplete="street"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  autoComplete="city"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="zip"
                  label="Zip Code"
                  id="zip"
                  autoComplete="zip"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  id="phone"
                  autoComplete="phone"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="account"
                  label="Bank Account"
                  id="bank"
                  onChange={onChangeHandler}
                />
              </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="bank_secret"
                  label="Bank Secret"
                  id="bank_secret"
                  type={'password'}
                  onChange={onChangeHandler}
                />
              </Grid>
              
            </Grid>
            {error!==null && <Alert severity="error">{error}</Alert>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SUBMIT
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}