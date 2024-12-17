import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtocart } from "../Addtocart/cart";
import DrawerItems from "../Drawer/DrawerItems"; // Import the DrawerItems component

const ProdectsCard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch()



  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      const productData = response.data;

      const uniqueCategories = [
        ...new Map(
          productData.map((item) => [
            item.category,
            { label: item.category, value: item.category },
          ])
        ).values(),
      ];

      setCategories(uniqueCategories);
      setProducts(productData);
      setFilteredProducts(productData);
      setIsLoading(false);
    });
  }, []);

  const filterProductsByCategory = (category) => {
    if (!category) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category.value
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <Box className="mt-4 pt-5 ms-4">
        <Autocomplete
          disablePortal
          options={categories}
          sx={{ width: 300 }}
          onChange={(e, newValue) => filterProductsByCategory(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Filter by Category" />
          )}
        />
      </Box>
      <Grid container spacing={3} className="mt-5 pt-5 ms-4">
        {isLoading ? (
          <Box className="my-5 w-100 text-center">
            <CircularProgress size="3rem" />
          </Box>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                className="text-center px-3 m-3"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "170px",
                    objectFit: "cover",
                    marginBottom: "8px",
                  }}
                />
                <Box
                  className="text-start"
                  sx={{
                    width: "100%",
                    textAlign: "start",
                  }}
                >
                  <Typography
                    variant="h6"
                    className="mt-2 text-start"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={Math.round(product.rating?.rate) || 0}
                    readOnly
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1rem", marginTop: "5px" }}
                  >
                    ${product.price}
                  </Typography>
                  <Box
                    sx={{
                      marginTop: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Tooltip title="View details">
                      <Link to={`/productdetails/${product.id}`}>
                        <Button>
                          <VisibilityIcon />
                        </Button>
                      </Link>
                    </Tooltip>

                    <Button
                      className="my-3"
                      variant="contained"
                      sx={{ marginLeft: "8px" }}
                     onClick={()=>dispatch(addtocart(product)) }
                    >
                      <AddIcon /> Add
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      
     
    </>
  );
};

export default ProdectsCard;
