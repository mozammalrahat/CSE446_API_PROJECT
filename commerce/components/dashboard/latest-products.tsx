import { formatDistanceToNow, subHours } from "date-fns";
import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import MuiLink from "@mui/material/Link";

export const LatestProducts = ({ recentProducts }) => (
  <Card>
    <CardHeader
      subtitle={`${recentProducts.length} in total`}
      title="Recent Products"
    />
    <Divider />
    <List>
      {recentProducts.map((product, i) => (
        <MuiLink underline="hover">
          <Link href={`/product/${product.productId._id}`} passHref>
            <a>
              <ListItem
                divider={i < recentProducts.length - 1}
                key={product._id}
              >
                <ListItemAvatar>
                  <img
                    alt={product.productId.name}
                    src={product.productId.image}
                    style={{
                      height: 48,
                      width: 48,
                    }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={product.productId.name}
                  // secondary={`Updated ${formatDistanceToNow(product.updatedAt)}`}
                />
              </ListItem>
            </a>
          </Link>
        </MuiLink>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      {/* <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button> */}
    </Box>
  </Card>
);
