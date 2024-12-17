import { Box, Drawer, Grid, Typography, Rating, Button, Tooltip } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { addtocart, removeFromCart } from "../Addtocart/cart"; // Assuming these are the actions for adding/removing items to the cart

const DrawerItems = (props) => {
  const { openItems, toggleOpenItems } = props;
  const dispatch = useDispatch();

  // Accessing the cart items from Redux store
  const { cartitems } = useSelector((state) => state.cart);

  return (
    <Drawer anchor="right" open={openItems} onClose={toggleOpenItems(false)}>
      <Box sx={{ width: "400px", padding: "16px" }}>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Cart Items
        </Typography>
        {cartitems.length === 0 ? (
          <Typography>No items in the cart.</Typography>
        ) : (
          <Grid container spacing={2}>
            {cartitems.map((item, index) => (
              <Grid lg={6} key={item.id}>
                <Box
                  className="text-center px-3 m-3"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "170px",
                      objectFit: "cover",
                      marginBottom: "8px",
                    }}
                  />
                  <Box sx={{ width: "100%", textAlign: "start" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginBottom: "8px",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Rating name="read-only" value={Math.round(item.rating?.rate) || 0} readOnly />
                    <Typography variant="h6" sx={{ fontSize: "1rem", marginTop: "5px" }}>
                      ${item.price}
                    </Typography>
                    <Box
                      sx={{
                        marginTop: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip title="View details">
                        <Link to={`/productdetails/${item.id}`}>
                          <Button>
                            <VisibilityIcon />
                          </Button>
                        </Link>
                      </Tooltip>

                      <Button
                        className="my-3"
                        variant="contained"
                        sx={{ marginLeft: "4px", backgroundColor: "red" }}
                        onClick={() => dispatch(removeFromCart(item))} 
                      >
                         Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Drawer>
  );
};

export default DrawerItems;
