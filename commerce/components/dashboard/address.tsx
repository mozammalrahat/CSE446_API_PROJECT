import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";

export const Address = ({ titleText, house, street, city, zip }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid
        alignItems="center"
        container
        spacing={3}
        // sx={{ justifyContent: "center" }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            variant="h6"
            variant="overline"
            gutterBottom
          >
            {titleText}
          </Typography>
          <br/>
          <Typography color="textPrimary" variant="h6" variant="overline">
            House: {house}
          </Typography>
          <br/>
          <Typography color="textPrimary" variant="h6" variant="overline">
            Street: {street}
          </Typography>
          <br/>
          <Typography  color="textPrimary" variant="h6" variant="overline">
            City: {city}
          </Typography>
          <br/>
          <Typography
            color="textPrimary"
            variant="h6"
            variant="overline"
          >
            ZIP: {zip}
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
      {/* <Box
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowDownwardIcon color="error" />
            <Typography
              color="error"
              sx={{
                mr: 1,
              }}
              variant="body2"
            >
              12%
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Since last month
            </Typography>
          </Box> */}
    </CardContent>
  </Card>
);
