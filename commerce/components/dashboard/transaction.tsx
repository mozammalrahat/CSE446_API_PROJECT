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

export const Transaction = ({ titleText, transactionID }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography
            color="textSecondary"
            variant="h4"
            gutterBottom
            variant="overline"
          >
            {titleText}
          </Typography>
          <Typography color="textPrimary" variant="h6" variant="overline">
            {transactionID}
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
