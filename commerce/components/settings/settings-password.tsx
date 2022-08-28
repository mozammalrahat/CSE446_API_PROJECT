import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import axios from "axios";
import cookie from "js-cookie";

const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });
  const [passordMatched, setpassordMatched] = useState(true);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (values.password === values.confirm) {
      setpassordMatched(true);
    } else {
      setpassordMatched(false);
    }
  }, [values]);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewPassword = async () => {
    await axios
      .patch(
        "http://localhost:3000/api/updatepassword",
        {
          password: values.password,
        },
        {
          headers: { Authorization: cookie.get("token") },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUpdate(true);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <>
      {" "}
      <form {...props}>
        <Card>
          <CardHeader subheader="Update password" title="Password" />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Confirm password"
              margin="normal"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
              variant="outlined"
            />
          </CardContent>
          {!passordMatched && (
            <Alert severity="error">Password didn't matched!</Alert>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          {update && (
            <Alert severity="success">Password Updated Successfully</Alert>
          )}
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleNewPassword()}
            >
              Update
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default SettingsPassword;
